import "../styles/globals.css";
import ApolloProviders from "../graphql/apollo";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <RecoilRoot>
      <ApolloProviders>
        <Component {...pageProps} />
      </ApolloProviders>
    </RecoilRoot>
  );
}

export default MyApp;
