import React from "react";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const ThemeContext = React.createContext({
  theme: LIGHT_THEME,
  toggleColorMode: () => {},
});

export default ThemeContext;
