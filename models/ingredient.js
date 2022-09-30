import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
  },
}, {
  timestamps: true,
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}
