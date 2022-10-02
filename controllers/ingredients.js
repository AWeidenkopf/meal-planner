import { Ingredient} from '../models/ingredient.js'
import { Profile } from '../models/profile.js'

function newIngredient(req, res) {
  Ingredient.find({})
  .then(ingredients => {
  res.render('ingredients/new', {
    ingredients,
    title: 'Add a ingredient'
  })
})
.catch(err => {
  console.log(err)
  res.redirect('/recipes/new')
})
}

function create(req, res) {
  Ingredient.create(req.body)
  .then(ingredient => {
    res.redirect('/ingredients/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ingredients/new')
  })
}

export {
  newIngredient as new,
  create
}