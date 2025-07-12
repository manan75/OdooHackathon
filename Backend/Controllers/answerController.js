import Notifications from '../Models/notfication.js';
import Questions from '../Models/questions.js';
import Users from '../Models/users.js';
import Answers from '../Models/answers.js';

export const answerQuestion = async (req, res) => {
  const { questionId, content, username } = req.body;

  const question = await Questions.findById(questionId).populate('user');
  const user = await Users.findOne({ username });

  // Save the answer
  const answer = await Answers.create({
    content,
    user: user._id,
    question: questionId,
  });

  // ✅ Create a notification for the question owner
  if (question.user._id.toString() !== user._id.toString()) {
    await Notifications.create({
      recipient: question.user._id,
      message: `${user.username} answered your question.`,
      type: 'answer',
      link: `/questions/${questionId}#${answer._id}`,
    });
  }

  res.json({ success: true, answer });
};
