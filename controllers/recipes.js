import { Recipe } from '../models/recipe.js'
import { Profile } from '../models/profile.js'
import { Ingredient } from '../models/ingredient.js'
import { Calendar } from '../models/calendar.js'


function index(req, res) {
  Recipe.find({})
    .then(recipes => {
      Calendar.find({})
        .then(days => {
          res.render('recipes/index', {
            recipes,
            days,
            title: 'All Recipes'
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

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'Add a Recipe'
  })
}

// Hey guys, I'm working on the code below!
// let imagePath

// function handleUpload(req, res, next) {
//   let storage = multer.diskStorage({
//     destination: function(req, file, cb){
//       cb(null, './public/assets/images')
//     },
//     filename: function(req, file, cb) {
//       cb(null,  Date.now() + file.originalname)
//     }
//   })
//   let upload = multer({storage: storage}).single('image')
//   upload(req, res, function(err){
//     if(err){
//       console.log(err)
//       return res.end('Error Uploading file')
//     } else{
//       console.log(req.file.filename)
//       req.flash('sucess', req.file.filename)
//       imagePath = req.file.filename
//       Image.create({path: imagePath})
//       return imagePath, next()
//     }
//   })
// }

function create(req, res) {
  req.body.author = req.user.profile._id
  Recipe.create({ title: req.body.title, author: req.body.author, instructions: req.body.instructions, notes: req.body.notes, image: req.body.image })
    .then(recipe => {
      recipe.save()
      req.body.ingredients = req.body.ingredients.split(', ')
      for (let i = 0; i < req.body.ingredients.length; i++) {
        let currIngredient = req.body.ingredients[i]
        Ingredient.findOneAndUpdate({ name: currIngredient }, { name: currIngredient }, {
          new: true,
          upsert: true
        })
          .then(ingredient => {
            ingredient.save()
            Recipe.findOne({ title: recipe.title })
              .then(recipe => {
                recipe.ingredients.push(ingredient._id)
                recipe.save()
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
      Ingredient.find({ _id: { $nin: recipe.ingredients } })
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
      Ingredient.find({ id: { $nin: recipe.ingredients } })
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
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
          res.redirect(`/recipes/${recipe._id}/edit`)
        })
    })
}

function deleteIngredient(req, res) {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.ingredients.remove({ _id: req.params.ingredientId })
      recipe.save()
        .then(() => {
          res.redirect(`/recipes/${req.params.id}/edit`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/recipes/${req.params.id}`)
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
  addToList,
  deleteIngredient,
}