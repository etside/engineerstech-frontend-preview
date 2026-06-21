import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api";

interface SettingsMap {
  [key: string]: any;
}

interface SettingsContextType {
  settings: SettingsMap;
  loading: boolean;
  getSetting: <T = any>(key: string, fallback: T) => T;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  loading: true,
  getSetting: (key, fallback) => fallback,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost/engineerstech/public/api";
    fetch(`${baseUrl}/settings`)
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getSetting = <T = any>(key: string, fallback: T): T => {
    return settings[key] ?? fallback;
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, getSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
