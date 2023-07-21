import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  published
  genres
  author {
    name 
    born
  }
}
`
export const CREATE_BOOK =gql`
mutation AddBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
export const ALL_AUTHORS = gql`
query findAllAuthor {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre)   {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`
export const ME = gql`
query findUserInfo{
  me {
    username
    favoriteGenre
  }
}
`
export const UPDATE_BIRTHYEAR = gql`
mutation updateBirthYear($name: String!, $setBornTo: Int!){
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

export const BOOK_ADDED = gql`
subscription BookAdded {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`