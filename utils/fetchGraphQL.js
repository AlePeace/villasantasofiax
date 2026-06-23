// Client GraphQL centralizzato verso WordPress (WPGraphQL su SiteGround).
// Risolve due problemi ricorrenti del backend instabile (vedi FIXES.md):
//   Fix 1 — SiteGround a volte risponde con HTML (pagina di errore 500/redirect)
//           invece di JSON: intercettiamo il content-type PRIMA di res.json()
//           per evitare "SyntaxError: Unexpected token '<'".
//   Fix 2 — ETIMEDOUT / blip momentanei: retry automatico con backoff crescente
//           invece di crashare al primo tentativo.
//
// Restituisce il JSON GraphQL parsato (es. { data, errors }), così i call site
// possono mantenere la loro destrutturazione esistente.

const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY = 500;

export async function fetchGraphQL(body, options = {}) {
  const { retries = DEFAULT_RETRIES, delay = DEFAULT_DELAY, ...fetchOptions } = options;

  const url = process.env.WP_GRAPHQL_URL;
  if (!url) {
    throw new Error("[fetchGraphQL] WP_GRAPHQL_URL non è definito");
  }

  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        ...fetchOptions,
      });

      // Se la risposta non è OK o non è JSON, SiteGround ha quasi certamente
      // restituito una pagina HTML di errore: trattalo come errore riprovabile.
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || !contentType.includes("application/json")) {
        throw new Error(
          `Risposta non valida (status ${res.status}, content-type "${contentType}"). ` +
            `Probabilmente SiteGround ha restituito una pagina HTML di errore.`,
        );
      }

      return await res.json();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        const wait = delay * attempt; // backoff crescente: 500ms, 1000ms, ...
        console.warn(
          `[fetchGraphQL] Tentativo ${attempt}/${retries} fallito, riprovo tra ${wait}ms: ${err.message}`,
        );
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }

  console.error(`[fetchGraphQL] Tutti i ${retries} tentativi falliti: ${lastError?.message}`);
  throw lastError;
}
