import { createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import { ALL_BOOKS } from './components/queries'

export const getWsHttpSplitLink = () => {

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  })

  const httpLink = createHttpLink({ uri:'http://localhost:4000' })

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000'
  }))

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
  )

  return splitLink
}

/**
 * function that takes care of manipulating cache
 */ 
export const updateCacheWith = (cache, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const genres = addedBook.genres.filter(genre => {
    return cache.readQuery({ query: ALL_BOOKS, variables: { genre }})
  })

  genres.forEach(genre => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre} }, ({ allBooks }) => {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      }
    })
  })
}