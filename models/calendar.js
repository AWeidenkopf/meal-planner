import mongoose from 'mongoose'

const Schema = mongoose.Schema

const calendarSchema = new Schema({
  name: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
}, {
  timestamps: true,
})

const Calendar = mongoose.model('Calendar', calendarSchema)

export {
  Calendar
}
