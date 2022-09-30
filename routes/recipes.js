import { Router } from "express"
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

router.get('/', recipesCtrl.index)

router.get('/',)

router.get('/new', recipesCtrl.new)

router.post('/', recipesCtrl.create)

export {
  router
}