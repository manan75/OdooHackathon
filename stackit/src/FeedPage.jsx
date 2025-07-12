import React, { useState } from 'react';

const FeedPage = () => {
  const currentUser = {
    name: 'Paraj Mehta',
    // avatar: 'https://i.pravatar.cc/100?img=3',
    questionsAsked: 2,
    answersGiven: 3,
  };

  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: 'Anya Sharma',
      title: 'How to fetch API data in React?',
      description: 'Can someone explain how to fetch data using useEffect?',
      tags: ['react', 'api', 'fetch'],
      votes: 3,
      answers: ['You can use fetch inside useEffect to call the API.'],
    },
    {
      id: 2,
      user: 'Ravi Kumar',
      title: 'Difference between var, let, and const?',
      description: 'What is the difference between var, let and const in JavaScript?',
      tags: ['javascript', 'variables'],
      votes: 5,
      answers: [],
    },
  ]);

  const [answerInputs, setAnswerInputs] = useState({});

  const handleUpvote = (id) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, votes: q.votes + 1 } : q
    );
    setQuestions(updated);
  };

  const handleAnswerSubmit = (id) => {
    const answer = answerInputs[id]?.trim();
    if (!answer) return;
    const updated = questions.map((q) =>
      q.id === id ? { ...q, answers: [...q.answers, answer] } : q
    );
    setQuestions(updated);
    setAnswerInputs({ ...answerInputs, [id]: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <aside className="bg-white shadow rounded-lg p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            {/* <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-3"
            /> */}
            <h2 className="text-xl font-bold text-blue-600">{currentUser.name}</h2>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📝 Questions Asked: {currentUser.questionsAsked}</p>
              <p>💬 Answers Given: {currentUser.answersGiven}</p>
            </div>
          </div>
        </aside>

        {/* Feed Section */}
        <main className="lg:col-span-3 space-y-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2"> Questions Feed</h1>

          {questions.map((q) => (
            <div key={q.id} className="bg-white shadow-md rounded-lg p-6 space-y-4">
              {/* Question Info */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-purple-700 flex items-center gap-1 mb-1">
                    <span>👤</span> {q.user}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-800">{q.title}</h2>
                  <p className="text-gray-600 mt-1">{q.description}</p>

                  {/* Tags */}
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Upvote */}
                <div className="flex flex-col items-center ml-4">
                  <button
                    onClick={() => handleUpvote(q.id)}
                    className="text-blue-600 font-bold text-xl hover:text-blue-800"
                    title="Upvote"
                  >
                    ⬆️
                  </button>
                  <span className="text-gray-700 mt-1">{q.votes}</span>
                </div>
              </div>

              {/* Existing Answers */}
              {q.answers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700">Answers:</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1">
                    {q.answers.map((ans, i) => (
                      <li key={i}>{ans}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Answer Box */}
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write your answer..."
                  value={answerInputs[q.id] || ''}
                  onChange={(e) =>
                    setAnswerInputs({ ...answerInputs, [q.id]: e.target.value })
                  }
                  className="flex-1 p-2 border rounded text-gray-800 bg-gray-50 focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleAnswerSubmit(q.id)}
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
  )
};

export default FeedPage;
