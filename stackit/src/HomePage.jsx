import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContent } from "./Context/AppContext";
import Navbar from "../Frontend/Navbar";

const HomePage = () => {
  const { userData, backendURL } = useContext(AppContent);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/ques/fetchQues?username=${userData.username}`, {
        withCredentials: true,
      });
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    if (userData?.username) {
      fetchQuestions();
    }
  }, [userData]);

  return (

    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <Navbar/>
      <div className="max-w-4xl mx-auto space-y-8 p-3">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Welcome, {userData?.username || "User"}
          </h1>
          <Link
            to="/home"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ask a New Question
          </Link>
        </div>

        {/* Questions */}
        {questions.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p>No questions found.</p>
            <Link
              to="/ask"
              className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ask Your First Question
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q._id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900">{q.title}</h2>
                <div
                  className="text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: q.description }}
                />
                <p className="text-sm text-gray-500 mt-2">Upvotes: {q.upvotes}</p>

                {/* Tags */}
                {q.tags && q.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Answers */}
                {q.answers && q.answers.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 mb-1">Answers:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {q.answers.map((ans) => (
                        <li key={ans._id}>{ans.content}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500 italic">No answers yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
