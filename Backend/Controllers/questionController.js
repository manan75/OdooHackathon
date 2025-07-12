import Questions from "../Models/questions.js";
import Answers from '../Models/answers.js';

import Users from "../Models/users.js";

export const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Title and description are required" });
  }

  try {
    const newQuestion = new Questions({
      user: req.user.id, // Comes from userAuth middleware
      title,
      description,
      tags, // assume it's an array of tag ObjectIds
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      questionId: newQuestion._id,
    });
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const getUserQuestions = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ success: false, message: "Username is required" });
  }

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch all questions by this user
    const questions = await Questions.find({ user: user._id })
      .populate("tags", "name")
      .populate("acceptedAnswer")
      .sort({ createdAt: -1 });

    // Fetch answers for each question
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answers = await Answers.find({ question: question._id })
          .populate("user", "username")
          .sort({ upvotes: -1 }); // Optional: sort answers by upvotes

        return {
          ...question._doc,
          answers
        };
      })
    );

    return res.json({ success: true, questions: questionsWithAnswers });

  } catch (error) {
    console.error("getUserQuestions error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
