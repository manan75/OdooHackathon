import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },
  type:   { type: String, enum: ['upvote', 'downvote'], required: true }
}, { timestamps: true })


const Votes = mongoose.model('votes', voteSchema)
export default Votes