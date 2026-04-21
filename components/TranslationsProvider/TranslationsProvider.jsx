"use client";

import { createContext, useContext, useState } from "react";

const TranslationsContext = createContext({ translations: {}, setTranslations: () => {} });

export const usePageTranslations = () => useContext(TranslationsContext);

export const TranslationsProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  return (
    <TranslationsContext.Provider value={{ translations, setTranslations }}>
      {children}
    </TranslationsContext.Provider>
  );
};
