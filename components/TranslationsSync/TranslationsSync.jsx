"use client";

import { useEffect } from "react";
import { usePageTranslations } from "components/TranslationsProvider";

// Riceve le URI tradotte dal Server Component e le inietta nel contesto client
export const TranslationsSync = ({ translations }) => {
  const { setTranslations } = usePageTranslations();
  useEffect(() => {
    setTranslations(translations || {});
    return () => setTranslations({});
  }, [translations, setTranslations]);
  return null;
};
