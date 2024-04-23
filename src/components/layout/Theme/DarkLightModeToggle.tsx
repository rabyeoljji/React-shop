import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { themeState } from "../../../store/theme";
import { THEME } from "../../../constants/storageKEY";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";

const DarkLightModeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME);
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const newTheme = "light";
      setTheme("light");
      localStorage.setItem(THEME, newTheme);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem(THEME, newTheme);
  };

  if (!isLoaded) {
    return <span className="loading loading-spinner text-neutral"></span>;
  }

  return (
    <label className="swap swap-rotate mr-2 sm:mr-4">
      <input
        type="checkbox"
        className="theme-controller"
        onClick={toggleTheme}
        defaultChecked={theme === "light" ? true : false}
      />
      <SunIcon />
      <MoonIcon />
    </label>
  );
};

export default DarkLightModeToggle;
