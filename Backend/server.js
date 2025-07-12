import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from "./Config/db.js";
import authRouter from "./Routes/authRoutes.js"
import userRouter from "./Routes/userRoutes.js";
import quesrouter from './Routes/questionRoutes.js'


dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));




app.use(express.json())
app.use(cookieParser())

connectDB();


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/ques', quesrouter)

app.get('/', (req, res) => res.send('StackIt API is running'))


    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  
