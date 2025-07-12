import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Tag, User, MessageSquare, Eye } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filterType, setFilterType] = useState('Newest');
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const backendURL = 'http://localhost:5000';

  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchQuestions = async () => {
    try {
      const sortParam = filterType === 'Most Voted' ? 'upvotes' : 'latest';
      const res = await axios.get(`${backendURL}/api/ques/all?sort=${sortParam}`);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filterType]);

  const filterOptions = ['Newest', 'Most Voted'];

  const filteredQuestions = questions.filter((q) =>
    q.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilterType(option)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition ${
                  filterType === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {(filteredQuestions.length === 0 && searchTerm !== '') ? (
            <p className="text-gray-500">No questions found for that tag.</p>
          ) : (
            (searchTerm ? filteredQuestions : questions).map((q) => (
              <div
                key={q._id}
                className="p-5 rounded-lg shadow-sm border bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <h2 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                    {q.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div
                  className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(q.description) }}
                />

                <div className="flex justify-between flex-wrap items-center text-sm text-gray-500">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      {q.answers.length}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      {q.views || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {q.user?.username || 'Unknown'}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    {q.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
