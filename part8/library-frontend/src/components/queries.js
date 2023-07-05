import { gql } from "@apollo/client";

export const CREATE_BOOK =gql`
mutation AddBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author {
      name,
      born
    },
    published
  }
}
`
export const UPDATE_BIRTHYEAR = gql`
mutation($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, born: $setBornTo) {
    name
    born
  }
}
`
export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`