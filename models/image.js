import mongoose from 'mongoose'

const Schema = mongoose.Schema

const imageSchema = new Schema({
  path: {
    type: String,
  },
}, {
  timestamps: true,
})

const Image = mongoose.model('Image', imageSchema)

export {
  Image
}
