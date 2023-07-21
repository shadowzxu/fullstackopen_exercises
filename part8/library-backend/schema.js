const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

input AuthorInput {
  name: String!
  born: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String]!
  id: ID!
}

type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: AuthorInput!
    published: Int!
    genres: [String]!
  ): Book
  
  editAuthor(
    name: String!
    born: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
}

type Subscription {
  bookAdded: Book!
}
`

module.exports = typeDefs