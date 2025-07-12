import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role:     { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true })


const Users = mongoose.model('users', userSchema)
export default Users