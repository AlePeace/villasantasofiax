import Link from "next/link";
import "../styles/globals.css";

// 404 root: cattura le richieste che NON entrano nel segmento [locale]
// (es. URL con un punto come /qualcosa.txt, esclusi dal middleware proxy.js).
// Il RootLayout è minimale (return children), quindi qui forniamo <html>/<body>.
export default function RootNotFound() {
  return (
    <html lang="it">
      <body>
        <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-32 text-center">
          <p
            className="text-[120px] lg:text-[200px] font-bold leading-none text-blue"
            style={{ fontFamily: "var(--font-montecatini)" }}
          >
            404
          </p>
          <h1
            className="mt-4 text-2xl lg:text-4xl text-blue"
            style={{ fontFamily: "var(--font-montecatini)" }}
          >
            Pagina non trovata
          </h1>
          <p className="mt-4 text-base lg:text-lg text-gray-500 max-w-md">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <Link
            href="/"
            className="mt-10 inline-block bg-blue text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-opacity duration-300 hover:opacity-80"
          >
            Torna alla Home
          </Link>
        </main>
      </body>
    </html>
  );
}
