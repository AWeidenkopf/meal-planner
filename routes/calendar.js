import { Router } from "express"
import * as calendarCtrl from '../controllers/calendar.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, calendarCtrl.index)

router.post('/', isLoggedIn, calendarCtrl.create)

router.delete('/:id', isLoggedIn, calendarCtrl.delete)


export {
  router
}