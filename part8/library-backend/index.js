const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
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
  }
`

const resolvers = {
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return (await Book.find({ author: author })).length
    }
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      let booksForReturn = await Book.find({}).populate('author')
      
      if(args.author) {
        booksForReturn = booksForReturn.filter(b => b.author.name === args.author)
      }
      if(args.genre) {
        booksForReturn = booksForReturn.filter(b => b.genres.includes(args.genre))
      }

      return booksForReturn
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let foundAuthor = await Author.findOne({ name: args.author.name })

      if(!foundAuthor) {
        foundAuthor = new Author({ name: args.author.name, born: args.author.born })
        try {
          await foundAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'SAVING_AUTHOR_FAILED',
              error
            }
          })
        }       
      }

      const book = new Book({ ...args, author: foundAuthor })
      
      try {
        await book.save()
      } catch(error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'SAVING_BOOK_FAILED',
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name })
      
      if(!authorToUpdate){
        return null
      }
      
      authorToUpdate.born = args.born

      try {
        await authorToUpdate.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'SAVING_AUTHOR_FAILED',
            error
          }
        })
      }

      return authorToUpdate
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})