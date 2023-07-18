const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name }).populate('bookOf')
      return author.bookOf.length
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
    },
    allRecommandations: async (root, args, context) => {
      if(!context.currentUser){
        return []
      }
      const favoriteGenre = context.currentUser.favoriteGenre
      let booksForReturn = await Book.find({}).populate('author')
      return booksForReturn.filter(b => b.genres.includes(favoriteGenre))
    },
    allGenres: async () => {
      const books = await Book.find({})
      let allGenresFromBooks = books.reduce((accumulateGenres, currentBook) => 
        accumulateGenres.concat(currentBook.genres),[])
      return [...new Set(allGenresFromBooks)]
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      //create a new author if author is not found
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

      //create a new book
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

      //update book of author
      const authorToUpdate = await Author.findOne({ name: foundAuthor.name })
      
      authorToUpdate.bookOf = authorToUpdate.bookOf.concat(book._id)

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

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
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if( !user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        console.log(userForToken)

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers