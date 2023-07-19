const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

let bookCache = null

const authorResolver = {
  bookCount: async (root) => {
    if(bookCache) {
      return bookCache.filter(b => b.author.toString() === root.id).length
    }
    return Book.countDocuments({ author: root.id })
  }
}

const Query = {
  authorCount: () => Author.collection.countDocuments(),
  bookCount: () => Book.collection.countDocuments(),
  allAuthors: async (root, args, context, query) => {
    const fieldsNames = query.fieldNodes[0].selectionSet.selections.map(f => f.name.value)
    if(fieldsNames.includes('bookCount')) {
      bookCache = await Book.find({})
    }
    return Author.find({})
  },
  allBooks: async (root, { author, genre }) => {
    const query = {}
    
    if( author ) {
      const authorInDb = await Author.findOne({ name: author })
      query.author = authorInDb.id
    }
    if( genre ) {
      query.genres = genre
    }

    return Book.find(query).populate('author')
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
}

const Mutation = {
  addBook: async (root, args, context) => {
    const currentUser = context.currentUser

    if(!currentUser){
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'BAD_USER_INPUT' } 
      })
    }

    
    let book = new Book({ title: args.title, genres: args.genres, published: args.published })
    let foundAuthor = await Author.findOne({ name: args.author.name })

    //create a new author if author is not found
    if(!foundAuthor) {
      foundAuthor = new Author({ name: args.author.name, born: args.author.born })
      try {
        await foundAuthor.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'SAVING_AUTHOR_FAILED',
            invalidArgs: args.author,
            error
          }
        })
      } 
    }

    book.author = foundAuthor.id

    //create a new book
    try {
      await book.save()
    } catch(error) {
      throw new GraphQLError('Saving book failed', {
        extensions: {
          code: 'SAVING_BOOK_FAILED',
          invalidArgs: { title: args.title, published: args.published, genres: args.genres },
          error
        }
      })
    }

    book = await Book.findById(book.id).populate('author')

    pubsub.publish('BOOK_ADDED', { bookAdded: book })

    return book
  },
  editAuthor: async (root, args, context) => {
    const currentUser = context.currentUser

    if(!currentUser){
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'BAD_USER_INPUT' }
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
}

const Subscription = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
  },
}

module.exports = {
  Query,
  Mutation,
  Subscription,
  Author: authorResolver
}