import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { ThemeProvider } from 'styled-components';
import { theme } from '../client/components/utils/styledComponents';
import { client } from "../client/graphql/client";
import Layout from "../client/components/Layout";
import "../styles/global.css";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default CustomApp;
