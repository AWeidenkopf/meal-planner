import { Router } from "express"
import * as groceryListCtrl from '../controllers/groceries.js'

const router = Router()

router.get('/', groceryListCtrl.index)

export {
  router
}