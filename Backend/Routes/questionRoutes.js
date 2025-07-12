import express from 'express';
import { createQuestion, getUserQuestions, getAllQuestions } from '../Controllers/questionController.js';
import { answerQuestion } from '../Controllers/answerController.js';

const quesrouter = express.Router();

quesrouter.post('/create',createQuestion);
quesrouter.get('/fetchQues',getUserQuestions);
quesrouter.get('/all',getAllQuestions);
quesrouter.post('/answer', answerQuestion);

export default quesrouter;
