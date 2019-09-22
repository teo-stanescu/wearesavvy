import React from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "https://api.github.com/graphql";
const token = "INSERT_TOKEN_HERE";

const httpLink = new HttpLink({
  uri,
  headers: {
    authorization: `Bearer ${token}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
)

export default App;