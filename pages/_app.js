import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import localFont from "next/font/local";
import { Nunito_Sans } from "next/font/google";

config.autoAddCss = false;

const montecatini = localFont({
  src: [
    { path: "../public/fonts/montecatini_normale.woff2", weight: "400" },
    { path: "../public/fonts/montecatini_normale.woff", weight: "400" },
    { path: "../public/fonts/montecatini_normale.otf", weight: "400" },
    { path: "../public/fonts/montecatini_light.otf", weight: "300" },
    { path: "../public/fonts/montecatini_light.woff", weight: "300" },
    { path: "../public/fonts/montecatini_light.woff2", weight: "300" },
  ],
  variable: "--font-montecatini",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
