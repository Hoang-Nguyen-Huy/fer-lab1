import React, { useEffect, useState } from "react";

const themes = {
  dark: {
    header: {
      backgroundColor: "secondary",
    },
    mainContent: {
      backgroundColor: "black",
    },
    footer: {
      backgroundColor: "#242424",
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
      1: "0px 2px 1px -1px rgba(255,255,255,0.2),0px 1px 1px 0px rgba(255,255,255,0.14),0px 1px 3px 0px rgba(255,255,255,0.12)",
      2: "0px 3px 1px -2px rgba(255,255,255,0.2),0px 2px 2px 0px rgba(255,255,255,0.14),0px 1px 5px 0px rgba(255,255,255,0.12)",
      3: "0px 3px 3px -2px rgba(255,255,255,0.2),0px 3px 4px 0px rgba(255,255,255,0.14),0px 1px 8px 0px rgba(255,255,255,0.12)",
    },
    card: {
      backgroundColor: "#1e1e1e",
      color: "rgba(255, 255, 255, 0.87)",
    },
    icon: {
      color: "#bb86fc",
    },
    button: {
      primary: "#bb86fc",
      hover: "#c39dff",
    },
    chip: {
      backgroundColor: "#3f3f3f",
      color: "rgba(255, 255, 255, 0.87)",
      borderColor: "#bb86fc",
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
      3: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    },
    card: {
      backgroundColor: "#ffffff",
      color: "rgba(0, 0, 0, 0.87)",
    },
    icon: {
      color: "#6200ee",
    },
    button: {
      primary: "#6200ee",
      hover: "#7722ff",
    },
    chip: {
      backgroundColor: "#e0e0e0",
      color: "rgba(0, 0, 0, 0.87)",
      borderColor: "#6200ee",
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
