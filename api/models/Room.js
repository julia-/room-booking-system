const mongoose = require('./init')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: { type: Schema.ObjectId, ref: 'User' },
  bookingStart: Date,
  bookingEnd: Date,
  recurring: { type: Boolean, default: false },
  businessUnit: { type: String, required: true },
  purpose: { type: String, required: true }
})

const roomSchema = new Schema({
  name: { type: String, index: true, required: true },
  floor: { type: String, required: true },
  capacity: Number,
  assets: {
    macLab: { type: Boolean, default: false },
    pcLab: { type: Boolean, default: false },
    projector: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    opWalls: { type: Boolean, default: false },
    whiteBoard: { type: Boolean, default: false }
  },
  bookings: [bookingSchema]
})

const Room = (module.exports = mongoose.model('Room', roomSchema))
