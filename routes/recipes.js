import { Router } from "express"
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, recipesCtrl.index)

router.get('/new', isLoggedIn, recipesCtrl.new)

router.get('/:id', isLoggedIn, recipesCtrl.show)

router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

router.post('/', isLoggedIn, recipesCtrl.create)

router.post('/:id/ingredients', isLoggedIn, recipesCtrl.addToList)

router.put('/:id', isLoggedIn, recipesCtrl.update)

router.delete('/:id', isLoggedIn, recipesCtrl.delete)

router.delete('/:id/ingredients/:ingredientId', isLoggedIn, recipesCtrl.deleteIngredient)

export {
  router
}
