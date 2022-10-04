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
  Calendar.create(req.body)
  .then(day => {
    day.save()
    console.log(day)
    res.redirect('/calendar')
  })
}

export {
  index,
  create
}