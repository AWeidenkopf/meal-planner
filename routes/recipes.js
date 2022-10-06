import { Router } from "express"
import * as recipesCtrl from '../controllers/recipes.js'
import * as middlewareCtrl from '../middleware/middleware.js'

const router = Router()

router.get('/', middlewareCtrl.isLoggedIn, recipesCtrl.index)

router.get('/new', middlewareCtrl.isLoggedIn, recipesCtrl.new)

router.get('/:id', middlewareCtrl.isLoggedIn, recipesCtrl.show)

router.get('/:id/edit', middlewareCtrl.isLoggedIn, recipesCtrl.edit)

router.post('/', middlewareCtrl.isLoggedIn, recipesCtrl.create)

router.post('/:id/ingredients', middlewareCtrl.isLoggedIn, recipesCtrl.addToList)

router.put('/:id', middlewareCtrl.isLoggedIn, recipesCtrl.update)

router.delete('/:id', middlewareCtrl.isLoggedIn, recipesCtrl.delete)

router.delete('/:id/ingredients/:ingredientId', middlewareCtrl.isLoggedIn, recipesCtrl.deleteIngredient)

export {
  router
}
