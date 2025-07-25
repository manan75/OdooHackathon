
import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  title:      { type: String, required: true },
  description:{ type: String, required: true }, // HTML string
  upvotes:    { type: Number, default: 0 },
  acceptedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'answers' },
  tags:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true })


const Questions = mongoose.model('questions', questionSchema)
export default Questions