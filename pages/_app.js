import React from "react";

import Head from "next/head";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "../components/Header";

import ThemeContext from "../components/Theme";

import "../styles/index.css";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = React.useState(LIGHT_THEME);
  const colorMode = React.useMemo(
    () => ({
      theme: mode,
      onChangeTheme: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        );
      },
    }),
    [mode]
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
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Алгоритмические основы мультимедийных технологий</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="static/favicon.ico" />
        </Head>
        <Header />
        <Container maxWidth="1800px">
          <Component {...pageProps} />
        </Container>
        <Typography variant="caption" display="block" className="caption">
          © 2021 All rights reserved.
        </Typography>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
