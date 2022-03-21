import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "./src/global/theme";
import createEmotionCache from "./src/global/createEmotionCache";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "js-cookie";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

export default function MyApp(props) {
  // Client-side cache, shared for the whole session of the user in the browser.
  const clientSideEmotionCache = createEmotionCache();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  const getLogin = cookie.get("login");

  useEffect(() => {
    if (!getLogin) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [getLogin]);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            TransitionComponent={Slide}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
