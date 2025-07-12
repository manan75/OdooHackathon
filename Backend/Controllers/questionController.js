import Questions from "../Models/questions.js";
import Answers from '../Models/answers.js';

import Users from "../Models/users.js";

import Tag from "../Models/tags.js";

export const createQuestion = async (req, res) => {
  try {
    const { username, title, description, tags } = req.body;

    // ✅ Step 1: Find user by username
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Step 2: Process tags (check if exists or create)
    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }
        return tag._id;
      })
    );

    // ✅ Step 3: Create Question
    const question = await Questions.create({
      user: user._id,
      title,
      description,
      tags: tagIds,
    });

    res.json({ success: true, question });
  } catch (err) {
    console.error("createQuestion error:", err);
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
