import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  message:   { type: String, required: true },
  type:      { type: String, enum: ['mention', 'answer', 'comment'] },
  read:      { type: Boolean, default: false },
  link:      { type: String } // e.g., /questions/:id#answer
}, { timestamps: true })


const Notifications = mongoose.model('notifications', notificationSchema)
export default Notifications