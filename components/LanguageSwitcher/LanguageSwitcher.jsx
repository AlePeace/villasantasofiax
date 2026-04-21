"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";
import { usePageTranslations } from "components/TranslationsProvider";

export const LanguageSwitcher = ({ isOpen = false }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { translations } = usePageTranslations();

  const handleChange = (newLocale) => {
    const translatedUri = translations?.[newLocale];
    if (translatedUri) {
      // Rimuove il prefisso locale dall'URI WordPress (/en/slug → /slug)
      // perché next-intl lo aggiunge da solo in base a { locale }
      const path = translatedUri.replace(new RegExp(`^/${newLocale}`), "") || "/";
      router.replace(path, { locale: newLocale });
    } else {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="flex items-center transition-all duration-500">
      {routing.locales.map((loc, index) => (
        <div
          key={loc}
          className="flex items-center transition-all duration-500"
        >
          {index > 0 && (
            <span
              className="-mt-1 select-none text-white/50"
            >
              |
            </span>
          )}
          <button
            onClick={() => handleChange(loc)}
            className={`font-montecatini font-light text-xl uppercase px-1 py-1 rounded transition-colors cursor-pointer transition-all duration-500 text-white hover:bg-white/10 ${
              locale === loc ? "!font-bold" : ""
            }`}
          >
            {loc}
          </button>
        </div>
      ))}
    </div>
  );
};
