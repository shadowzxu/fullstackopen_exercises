const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log(`connected to MongoDB`);
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message);
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'name has to be at least three characters long'],
    required: true
    },
  number: {
    type: String,
    minLength: 8, 
    validate: {
        validator: (v) => /^\d{2,3}-\d+$/.test(v),
        message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
    },
})

//configuration: transforms id into string
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)