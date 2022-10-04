import { Router } from "express"
import * as calendarCtrl from '../controllers/calendar.js'

const router = Router()

router.get('/', calendarCtrl.index)

router.post('/', calendarCtrl.create)

export {
  router
}