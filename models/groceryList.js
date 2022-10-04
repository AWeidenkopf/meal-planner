import mongoose from 'mongoose'

const Schema = mongoose.Schema

const groceryListSchema = new Schema({
  ingredient: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Ingredient"
  }],
  item: [{
    type: String,
  }],
}, {
  timestamps: true,
})

const GroceryList = mongoose.model('GroceryList', groceryListSchema)

export {
  GroceryList
}
