import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const ThemeContext = React.createContext({
  theme: LIGHT_THEME,
  onChangeTheme: () => {},
});

function ThemeContextProvider({ children }) {
  const LS_THEME_MODE = React.useMemo(
    () => process.browser && localStorage.getItem("theme-mode"),
    []
  );
  const [mode, setMode] = React.useState(LIGHT_THEME);

  React.useEffect(() => {
    const themeMode = process.browser && localStorage.getItem("theme-mode");
    setMode(themeMode);
  }, []);

  const onChangeTheme = React.useCallback(() => {
    const themeMode = mode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setMode(themeMode);
    process.browser && localStorage.setItem("theme-mode", themeMode);
  }, [mode]);

  const themeMode = React.useMemo(
    () => ({
      theme: mode,
      onChangeTheme,
    }),
    [mode, onChangeTheme]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
