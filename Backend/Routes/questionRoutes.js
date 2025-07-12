import express from 'express';
import { createQuestion, getUserQuestions } from '../Controllers/questionController.js';

const quesrouter = express.Router();

quesrouter.post('/create',createQuestion);
quesrouter.get('/fetchQues',getUserQuestions)

export default quesrouter;
