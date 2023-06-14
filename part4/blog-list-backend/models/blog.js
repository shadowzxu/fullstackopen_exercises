const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: String,
  likes: Number,
  comments: [{ body: String, date: Date }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    returnedObject.comments.map(comment => {
      comment.id = comment._id.toString()
      delete comment._id
    })
  }
})

module.exports = mongoose.model('Blog', blogSchema)