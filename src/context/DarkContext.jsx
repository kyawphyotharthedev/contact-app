import { createContext, useContext, useEffect, useState } from "react";

const DarkContext = createContext();
export const DarkContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(
    () => window.localStorage.getItem("dark") || "light"
  );
  useEffect(() => {
    if (darkTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("dark", darkTheme);
  }, [darkTheme]);
  const lightSwitch = () => {
    setDarkTheme(darkTheme === "dark" ? "light" : "dark");
  };
  const data = { setDarkTheme, darkTheme, lightSwitch };
  return <DarkContext.Provider value={data}>{children}</DarkContext.Provider>;
};
export const useContextCustom = () => useContext(DarkContext);
