import { Ingredient} from '../models/ingredient.js'
import { GroceryList } from '../models/groceryList.js'

function index(req, res) {
  GroceryList.find({})
  .then(groceries => {
    res.render('groceries', {
    title: 'Grocery List',
    groceries
  })
})
.catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

function create(req, res) {
  GroceryList.create(req.body)
  .then(ingredient => {
    res.redirect('/groceries')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/groceries')
  })
}

export {
  index,
  create
}
