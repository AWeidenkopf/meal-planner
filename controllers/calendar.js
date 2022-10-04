import { Calendar } from '../models/calendar.js'
import { Profile } from '../models/profile.js'
import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Calendar.find({})
  .populate('recipe')
  .then(schedules => {
    res.render('calendar/index', {
    title: 'Calendar',
    schedules
  })
})
}

function create(req, res){
  let filter = {day: req.body.day, meal: req.body.meal}
  console.log(filter)
  Calendar.findOneAndUpdate(filter, req.body, {
    new: true,
    upsert: true
  })
  .then(day => {
    day.save()
    res.redirect('/calendar')
  })
}

export {
  index,
  create
}