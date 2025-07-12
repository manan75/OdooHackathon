
import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'questions' },
  content:  { type: String, required: true }, // rich text
  upvotes:  { type: Number, default: 0 }
}, { timestamps: true })


const Answers = mongoose.model('answers',answerSchema )
export default Answers