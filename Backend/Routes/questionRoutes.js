import express from 'express';
import { createQuestion, getUserQuestions, getAllQuestions } from '../Controllers/questionController.js';

const quesrouter = express.Router();

quesrouter.post('/create',createQuestion);
quesrouter.get('/fetchQues',getUserQuestions);
quesrouter.get('/all',getAllQuestions);

export default quesrouter;
