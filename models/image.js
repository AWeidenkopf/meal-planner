import mongoose from 'mongoose'

const Schema = mongoose.Schema

const imageSchema = new Schema({
  name: {
    type: String,
  },
  content: {
    type: String
  },
  imageBase64: {
    String
  }
}, {
  timestamps: true,
})

const Image = mongoose.model('Image', imageSchema)

export {
  Image
}
