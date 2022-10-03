import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const ingredientSchema = new Schema({
//   ingredient: {
//     type: String,
//   },
// }, {
//   timestamps: true,
// })


const recipeSchema = new Schema({
  title: {
    type: String,
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile',
  },
  ingredients: [{type: Schema.Types.ObjectId, ref: "Ingredient"}],
  instructions: { 
    type: String,
  },
  notes: String
}, {
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}
