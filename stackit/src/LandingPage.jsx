import React, { useState } from 'react';
import { Search, Sun, Moon, ChevronLeft, ChevronRight, Tag, User, MessageSquare, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(3);
  const [filterType, setFilterType] = useState('Newest');

  const sampleQuestions = [
    {
      id: 1,
      title: "How to join 2 columns in a data set to make a separate column in SQL",
      description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine...",
      tags: ['sql', 'database'],
      username: 'User Name',
      answers: 5,
      views: 124
    },
    {
      id: 2,
      title: "Best practices for React state management in large applications",
      description: "I'm working on a large React application and struggling with state management. What are the best practices for organizing state in complex components?",
      tags: ['react', 'javascript', 'state-management'],
      username: 'Developer123',
      answers: 3,
      views: 89
    },
    {
      id: 3,
      title: "Python list comprehension vs traditional loops performance",
      description: "I've been wondering about the performance differences between list comprehensions and traditional for loops in Python. When should I use each?",
      tags: ['python', 'performance', 'optimization'],
      username: 'PythonExplorer',
      answers: 2,
      views: 156
    }
  ];

  const filterOptions = ['Newest', 'Unanswered', 'Most Voted', 'Most Viewed'];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };





  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Questions</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Tags</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Users</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Questions</span>
                  <span className="text-blue-600">23,456</span>
                </div>
                <div className="flex justify-between">
                  <span>Answers</span>
                  <span className="text-green-600">45,789</span>
                </div>
                <div className="flex justify-between">
                  <span>Users</span>
                  <span className="text-purple-600">12,345</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Mobile Menu - Only visible on small screens */}
            <div className="lg:hidden">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-sm mb-4`}>
                <h3 className="font-semibold mb-3 text-sm">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold">23.4k</div>
                    <div className="text-xs text-gray-500">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-semibold">45.7k</div>
                    <div className="text-xs text-gray-500">Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600 font-semibold">12.3k</div>
                    <div className="text-xs text-gray-500">Users</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button

                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
                >
                  Ask New Question
                </button>
                <div className="flex border rounded-lg overflow-hidden">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFilterType(option)}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm flex-1 sm:flex-none ${filterType === option
                          ? 'bg-blue-600 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className={`w-full pl-10 pr-4 py-2 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {sampleQuestions.map((question) => (
                <div key={question.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Stats */}
                    <div className="flex lg:flex-col gap-4 lg:gap-2 text-center lg:w-20 order-2 lg:order-1">
                      <div className="flex items-center gap-1 justify-center lg:justify-start">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{question.answers}</span>
                        <span className="text-xs text-gray-500">ans</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center lg:justify-start">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{question.views}</span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1 order-1 lg:order-2">
                      <h3 className="text-base sm:text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-2">
                        {question.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {question.description}
                      </p>

                      {/* Tags and User Info */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'
                                }`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{question.username}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 py-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition-colors`}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base transition-colors ${currentPage === page
                      ? 'bg-blue-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition-colors`}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}

    </div>
  );
};

export default LandingPage;