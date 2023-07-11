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
query findAllAuthor {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query findAllBooks {
  allBooks {
    title,
    author {
      name,
      born
    },
    published,
    genres
  }
}
`
export const FIND_BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreToSearch: String) {
  allBooks(genre: $genreToSearch) {
    title,
    author {
      name,
      born
    },
    published
  }
}
`
export const ALL_GENRES = gql`
query findAllGenre{
  allGenres
}
`
export const ME = gql`
query findUserInfo{
  me {
    username
    favoriteGenre
  }
}
`
export const ALL_RECOMMANDATIONS = gql`
query findAllRecommandations{
  allRecommandations {
    title
    author {
      name
      born
    }
    published
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