import { Recipe } from '../models/recipe.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: 'All Recipes'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'Add a Recipe'
  })
}

function create(req, res) {
  req.body.author = req.user.profile._id
  console.log(req.body)
  Recipe.create(req.body)
  .then(recipe => {
    recipe.save()
    console.log(recipe)
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  newRecipe as new,
  create
}