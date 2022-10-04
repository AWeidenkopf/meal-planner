import mongoose from 'mongoose'

const Schema = mongoose.Schema

const calendarSchema = new Schema({
  day: { 
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  meal: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner']
  },
  recipe: {type: Schema.Types.ObjectId, ref: "Recipe"},
}, {
  timestamps: true,
})

const Calendar = mongoose.model('Calendar', calendarSchema)

export {
  Calendar
}
