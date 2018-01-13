const mongoose = require('./init')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  name: { type: [String], index: true},
  floor: String,
  capacity: Number,
  assets: {
    macLab: Boolean,
    pcLab: Boolean,
    projector: Boolean,
    tv: Boolean,
    opWalls: Boolean,
    whiteBoard: Boolean
  },
  bookings: [
    {
      _bookingId: Schema.Types.ObjectId,
      user: { type: Schema.ObjectId, ref: 'User' },
      bookingStart: Date,
      bookingEnd: Date,
      recurring: Boolean,
      businessUnit: String,
      purpose: String
    }
  ]
})

const Room = (module.exports = mongoose.model('Room', roomSchema))
