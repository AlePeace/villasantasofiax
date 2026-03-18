"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center">
      {routing.locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          {index > 0 && (
            <span className="text-white/50 -mt-1 select-none">|</span>
          )}
          <button
            onClick={() => handleChange(loc)}
            className={`font-montecatini font-light text-xl text-white uppercase px-1 py-1 rounded transition-colors cursor-pointer ${
              locale === loc
                ? "!font-bold text-white"
                : "text-white hover:bg-white/10"
            }`}
          >
            {loc}
          </button>
        </div>
      ))}
    </div>
  );
};
