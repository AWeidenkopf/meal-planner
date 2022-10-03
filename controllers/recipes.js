import { Recipe } from '../models/recipe.js'
import { Profile } from '../models/profile.js'
import { Ingredient } from '../models/ingredient.js'

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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
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

function show(req, res) {
  Recipe.findById(req.params.id)
  .populate('ingredients author')
  .then(recipe => {
    Ingredient.find({_id: {$nin: recipe.ingredients}})
    .then(ingredients => { 
    res.render('recipes/show', {
      title: 'Recipe',
      recipe,
      ingredients
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})
.catch(err => {
  console.log(err)
  res.redirect('/')
})
}

function edit(req, res) {
  Recipe.findById(req.params.id) 
  .populate('ingredients')
  .then(recipe => {
    Ingredient.find({_id: {$nin: recipe.ingredients}})
    .then(ingredients => { 
    res.render('recipes/edit', {
      recipe,
      title: 'Edit Recipe',
      ingredients
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
  })
.catch(err => {
  console.log(err)
  res.redirect('/')
})
}

function update(req, res) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(recipe => {
    res.redirect(`/recipes/${recipe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.id)
  .then(recipe => {
    res.redirect(`/recipes`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToList(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    recipe.ingredients.push(req.body.ingredientId)
    recipe.save()
    .then(() => {
      res.redirect(`/recipes/${recipe._id}`)
    })
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  edit,
  update,
  deleteRecipe as delete,
  addToList
}