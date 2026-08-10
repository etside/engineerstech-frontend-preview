import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
      aria-label={lang === "en" ? "Switch to Bengali" : "Switch to English"}
    >
      {lang === "en" ? "বাং" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
