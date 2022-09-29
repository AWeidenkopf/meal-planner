import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ingredient: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
})


const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile',
    required: true
  },
  ingredients: [ingredientSchema],
  instructions: { 
    type: String,
    required: true
  },
  notes: String
}, {
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}
