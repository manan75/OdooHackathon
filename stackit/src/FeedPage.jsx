import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContent } from './Context/AppContext';

const FeedPage = () => {
  const { userData, backendURL } = useContext(AppContent);
  const [questions, setQuestions] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});

  // Fetch questions with answers
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/ques/all`, {
        withCredentials: true,
      });
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleUpvote = async (questionId) => {
    try {
      await axios.post(`${backendURL}/api/ques/upvote`, { questionId }, { withCredentials: true });
      fetchQuestions(); // Refresh
    } catch (err) {
      console.error("Upvote error:", err);
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    const content = answerInputs[questionId]?.trim();
    if (!content) return;

    try {
      await axios.post(`${backendURL}/api/ques/answer`, {
        questionId,
        content,
        username: userData.username,
      }, { withCredentials: true });

      setAnswerInputs({ ...answerInputs, [questionId]: '' });
      fetchQuestions(); // Refresh to show new answer
    } catch (err) {
      console.error("Answer submit error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <aside className="bg-white shadow rounded-lg p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-blue-600">{userData?.username}</h2>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📝 Questions Asked: {userData?.questionsAsked || 0}</p>
              <p>💬 Answers Given: {userData?.answersGiven || 0}</p>
            </div>
          </div>
        </aside>

        {/* Feed Section */}
        <main className="lg:col-span-3 space-y-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2"> Questions Feed</h1>

          {questions.map((q) => (
            <div key={q._id} className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-purple-700 flex items-center gap-1 mb-1">
                    <span>👤</span> {q.user?.username}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-800">{q.title}</h2>
                  <div className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: q.description }} />

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Upvote */}
                <div className="flex flex-col items-center ml-4">
                  <button
                    onClick={() => handleUpvote(q._id)}
                    className="text-blue-600 font-bold text-xl hover:text-blue-800"
                    title="Upvote"
                  >
                    ⬆️
                  </button>
                  <span className="text-gray-700 mt-1">{q.upvotes || 0}</span>
                </div>
              </div>

              {/* Existing Answers */}
              {q.answers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700">Answers:</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
                    {q.answers.map((ans) => (
                      <li key={ans._id}>{ans.content}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Answer Box */}
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write your answer..."
                  value={answerInputs[q._id] || ''}
                  onChange={(e) =>
                    setAnswerInputs({ ...answerInputs, [q._id]: e.target.value })
                  }
                  className="flex-1 p-2 border rounded text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleAnswerSubmit(q._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default FeedPage;
