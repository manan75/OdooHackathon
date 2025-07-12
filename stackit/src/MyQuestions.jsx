import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "./Context/AppContext";
import { MessageCircle, Clock, ArrowUp } from "lucide-react";

const MyQuestions = () => {
  const { userData, backendURL } = useContext(AppContent);
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("latest"); // latest | upvotes
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    if (!userData?.username) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${backendURL}/api/ques/fetchQues?username=${userData.username}`,
        { withCredentials: true }
      );

      let fetched = res.data.questions || [];

      if (filter === "latest") {
        fetched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filter === "upvotes") {
        fetched.sort((a, b) => b.upvotes - a.upvotes);
      }

      setQuestions(fetched);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.username) {
      fetchQuestions();
    }
  }, [filter, userData]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Questions</h2>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "latest" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("latest")}
        >
          <Clock size={16} className="mr-1" />
          Latest
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "upvotes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("upvotes")}
        >
          <ArrowUp size={16} className="mr-1" />
          Most Upvoted
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-600">Loading questions...</p>
      ) : questions.length === 0 ? (
        <p className="text-gray-600">No questions posted yet.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-blue-600">
                {q.title}
              </h3>
              <span className="text-sm text-gray-400">
                {new Date(q.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{q.description}</p>
            <p className="mt-2 text-sm text-gray-500">Upvotes: {q.upvotes}</p>

            {/* Answers */}
            <div className="mt-4">
              <h4 className="font-semibold mb-1 flex items-center text-gray-800">
                <MessageCircle size={16} className="mr-2" /> Answers
              </h4>
              {q.answers && q.answers.length === 0 ? (
                <p className="text-sm text-gray-500">No answers yet.</p>
              ) : (
                q.answers.map((ans) => (
                  <div
                    key={ans._id}
                    className="bg-gray-100 p-3 rounded-lg mb-2"
                  >
                    <p>{ans.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyQuestions;
