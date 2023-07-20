import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { getWsHttpSplitLink } from './util'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: getWsHttpSplitLink()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)