"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";

export const LanguageSwitcher = ({ isOpen = false }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
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
              className={`-mt-1 select-none ${isOpen ? "text-blue/50" : "text-white/50"}`}
            >
              |
            </span>
          )}
          <button
            onClick={() => handleChange(loc)}
            className={`font-montecatini font-light text-xl uppercase px-1 py-1 rounded transition-colors cursor-pointer transition-all duration-500 ${
              isOpen ? "text-blue" : "text-white"
            } ${
              locale === loc
                ? "!font-bold"
                : isOpen
                  ? "hover:bg-blue/10"
                  : "hover:bg-white/10"
            }`}
          >
            {loc}
          </button>
        </div>
      ))}
    </div>
  );
};
