import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  name: {
    type: String,
  },
}, {
  timestamps: true,
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}
