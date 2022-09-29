import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    required
  },
  quantity: {
    type: String,
    required
  }
})


const recipeSchema = new Schema({
  title: {
    String,
    required
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile',
    required
  },
  ingredients: [ingredientSchema],
  instructions: { 
    type: String,
    required
  },
  notes: String
}, {
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  recipeSchema
}
