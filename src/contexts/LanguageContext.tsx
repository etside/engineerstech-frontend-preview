import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Lang = "en" | "bn";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translation helper: t("English text", "বাংলা টেক্সট") */
  t: (en: string, bn: string) => string;
  /** Toggle between en and bn */
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
  toggle: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

/** Determine lang from URL path. /bn/... = "bn", else "en" */
function langFromPath(pathname: string): Lang {
  return pathname.startsWith("/bn") ? "bn" : "en";
}

/** Strip /bn prefix from path */
function stripBn(pathname: string): string {
  return pathname.replace(/^\/bn/, "") || "/";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(location.pathname);

  const setLang = useCallback(
    (l: Lang) => {
      const current = stripBn(location.pathname);
      if (l === "bn") {
        navigate(`/bn${current}${location.search}`, { replace: true });
      } else {
        navigate(`${current}${location.search}`, { replace: true });
      }
    },
    [location.pathname, location.search, navigate]
  );

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "bn" : "en");
  }, [lang, setLang]);

  /** Simple translation: returns `bn` if lang=bn, else `en` */
  const t = useCallback(
    (en: string, bn: string) => (lang === "bn" ? bn : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};
