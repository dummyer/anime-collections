import '../styles/globals.css'
import ApolloProviders from '../graphql/apollo';

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return <ApolloProviders><Component {...pageProps} /></ApolloProviders>
}

export default MyApp
