import { Ingredient } from '../models/ingredient.js'
import { Profile } from '../models/profile.js'
import { Recipe } from '../models/recipe.js'

function newIngredient(req, res) {
  Ingredient.find({})
    .then(ingredients => {
      res.render('ingredients/new', {
        ingredients,
        title: 'Ingredient List'
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

function deleteIngredient(req, res) {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(ingredient => {
      res.redirect(`/ingredients/new`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  newIngredient as new,
  create,
  deleteIngredient as delete
}