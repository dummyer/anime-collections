import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { PropsWithChildren } from "react";

const GRAPHQL_ENDPOINTER = "https://graphql.anilist.co";

const ApolloProviders: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        alert(`GraphQL error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({
      uri: GRAPHQL_ENDPOINTER,

    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviders;
