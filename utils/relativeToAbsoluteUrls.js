export const relativeToAbsoluteUrls = (htmlString = "") => {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  if (!wpUrl) return htmlString;

  // Rende relativi gli URL interni del backend WordPress (link a pagine),
  // così vengono gestiti dal routing next-intl.
  let result = htmlString.split(wpUrl).join("");

  // ...MA i file dei media (PDF, immagini, upload) vivono fisicamente sul
  // backend: i loro URL devono restare ASSOLUTI verso wp.villasantasofia.it,
  // altrimenti puntano al dominio frontend e danno 404.
  result = result.split("/wp-content/").join(`${wpUrl}/wp-content/`);

  return result;
};
