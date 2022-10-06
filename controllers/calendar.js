import { Calendar } from '../models/calendar.js'
import { Profile } from '../models/profile.js'
import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Calendar.find({})
  .populate('recipe')
  .then(schedules => {
    console.log(schedules)
    res.render('calendar/index', {
    title: 'Calendar',
    schedules,
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

function deleteSchedule(req, res) {
  console.log("params", req.params.id)
  Calendar.findByIdAndDelete(req.params.id)
    .then(schedule => {
      console.log("deleted", schedule)
      res.redirect(`/calendar`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  index,
  create,
  deleteSchedule as delete
}