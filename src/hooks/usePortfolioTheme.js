import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

const usePortfolioTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) return savedTheme === "dark";
    return true;
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  const toggleTheme = () => setIsDark((current) => !current);

  return { isDark, toggleTheme };
};

export default usePortfolioTheme;
