import { Router } from "express"
import * as ingredientsCtrl from '../controllers/ingredients.js'

const router = Router()

router.get('/new', ingredientsCtrl.new)

router.post('/', ingredientsCtrl.create)

router.delete('/:id', ingredientsCtrl.delete)

export {
  router
}