import React, { useEffect, useState } from "react";

const themes = {
  dark: {
    header: {
      backgroundColor: "secondary",
    },
    mainContent: {
      backgroundColor: "#242424",
    },
    footer: {
      backgroundColor: "#f4e0c1",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.60)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
    action: {
      active: "rgba(255, 255, 255, 0.54)",
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabled: "rgba(255, 255, 255, 0.26)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    elevation: {
      1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
  },
  light: {
    header: {
      backgroundColor: "primary",
    },
    mainContent: {
      backgroundColor: "#f3e5f5",
    },
    footer: {
      backgroundColor: "white",
      color: "black",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.60)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    elevation: {
      1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
  },
};

const initialState = {
  light: false,
  theme: themes.light,
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const isLight = localStorage.getItem("light") === "true";
    setLight(isLight);
  }, [light]);

  const toggle = () => {
    const isLight = !light;
    localStorage.setItem("light", JSON.stringify(isLight));
    setLight(isLight);
  };

  const theme = light ? themes.light : themes.dark;

  return (
    <ThemeContext.Provider value={{ theme, light, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
