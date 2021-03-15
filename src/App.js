import React from 'react';
import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import GetPosts from './components/GetPosts';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path}) => {
      alert(`Graphql error ${message}`);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "https://fakerql.stephix.uk/graphql"})
])

const client =  new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <div className="App">
        
      <ApolloProvider client={client}> 
        {" "}
        <GetPosts />
      </ApolloProvider>

    </div>
  );
}

export default App;
