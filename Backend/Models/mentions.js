import mongoose from 'mongoose'

const mentionSchema = new mongoose.Schema({
  mentionedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  byUser:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contextType:   { type: String, enum: ['question', 'answer'] },
  contextId:     { type: mongoose.Schema.Types.ObjectId },
  message:       { type: String } // raw message where @username occurred
}, { timestamps: true })

const Mentions = mongoose.model('mentions', mentionSchema)
export default Mentions