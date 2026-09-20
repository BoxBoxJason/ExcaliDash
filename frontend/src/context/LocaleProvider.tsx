import React, { useEffect, useState } from "react";
import { LOCALE_KEY, type Locale, resolveLocale, translate } from "../i18n";
import { LocaleContext } from "./localeContext";

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  try {
    return resolveLocale(
      window.localStorage?.getItem?.(LOCALE_KEY) ?? navigator.language,
    );
  } catch {
    return resolveLocale(navigator.language);
  }
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (next: Locale) => {
    try {
      window.localStorage?.setItem?.(LOCALE_KEY, next);
    } catch {
      // The selected locale still applies for this session.
    }
    setLocaleState(next);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: (key) => translate(locale, key) }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
