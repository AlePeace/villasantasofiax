import localFont from "next/font/local";
import { Nunito_Sans } from "next/font/google";
import "../../styles/globals.css";
import { getMenu } from "utils/getMenu";
import { getMenuBgImage } from "utils/getMenuBgImage";
import { MainMenu } from "components/MainMenu";
import { SmoothScroll } from "components/SmoothScroll";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import CookieConsentBanner from "components/CookieConsent/CookieConsent";

const montecatini = localFont({
  src: [
    { path: "../../public/fonts/montecatini_normale.woff2", weight: "400" },
    { path: "../../public/fonts/montecatini_normale.woff", weight: "400" },
    { path: "../../public/fonts/montecatini_normale.otf", weight: "400" },
    { path: "../../public/fonts/montecatini_light.otf", weight: "300" },
    { path: "../../public/fonts/montecatini_light.woff", weight: "300" },
    { path: "../../public/fonts/montecatini_light.woff2", weight: "300" },
  ],
  variable: "--font-montecatini",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const [menus, bgImage] = await Promise.all([
    getMenu(locale),
    getMenuBgImage(),
  ]);

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId="GTM-W77DV3V7" />
      <body className={`${nunito.variable} ${montecatini.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <MainMenu menuData={menus} menus={menus} bgImage={bgImage} />
            {children}
            <CookieConsentBanner />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
