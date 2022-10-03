import { Router } from "express"
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

router.get('/', recipesCtrl.index)

router.get('/new', recipesCtrl.new)

router.get('/:id', recipesCtrl.show)

router.get('/:id/edit', recipesCtrl.edit)

router.post('/', recipesCtrl.create)

router.post('/:id/ingredients', recipesCtrl.addToList)

router.put('/:id', recipesCtrl.update)

router.delete('/:id', recipesCtrl.delete)

export {
  router
}