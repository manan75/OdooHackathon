import { useState, useContext } from 'react';
import { ChevronDown, Bell, Settings, LogOut, User, Filter, Clock, MessageCircle, Plus, Moon, Sun } from 'lucide-react';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Mock context for demonstration
  const backendURL = 'http://localhost:3000';
  const userData = { username: 'John Doe', email: 'john@example.com' };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsFiltersOpen(false);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
    setIsProfileOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: userData?.username,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim().toLowerCase()),
    };

    try {
      // Mock API call for demonstration
      console.log('Submitting question:', payload);
      
      // Simulate API response
      const mockResponse = { data: { success: true } };
      
      if (mockResponse.data.success) {
        alert("Question submitted successfully!");
        setTitle('');
        setDescription('');
        setTags('');
      } else {
        alert("Failed to submit question");
      }
    } catch (err) {
      console.error("Error submitting question:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Home</a>
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Questions</a>
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Tags</a>
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Users</a>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <button className={`p-2 relative ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>

              {/* Filters Dropdown - Mobile */}
              <div className="relative md:hidden">
                <button
                  onClick={toggleFilters}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  <Filter size={16} />
                  <span className="text-sm">Filters</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Filters Dropdown Menu */}
                {isFiltersOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="py-2">
                      <button className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <Clock size={16} />
                        <span>Newest</span>
                      </button>
                      <button className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <MessageCircle size={16} />
                        <span>Unanswered</span>
                      </button>
                      <button className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <Plus size={16} />
                        <span>More</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className={`flex items-center space-x-2 p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'} transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="py-2">
                      {/* User Info */}
                      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                              {userData?.username || 'John Doe'}
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {userData?.email || 'john@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Navigation Links */}
                      <div className={`md:hidden border-b py-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>Home</a>
                        <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>Questions</a>
                        <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>Tags</a>
                        <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>Users</a>
                      </div>

                      {/* Profile Actions */}
                      <div className="py-2">
                        <button className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                          <User size={16} />
                          <span>Profile</span>
                        </button>
                        <button className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                          <Settings size={16} />
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className={`border-t py-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <button className={`w-full text-left px-4 py-2 text-sm text-red-600 flex items-center space-x-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}>
                          <LogOut size={16} />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-md p-6`}>
          
          {/* Title */}
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Ask a Question
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Question Title */}
            <div>
              <label className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
                placeholder="Enter question title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
                placeholder="Describe your question in detail..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className={`block font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
                placeholder="e.g. react, javascript, html"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Submit Question
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Overlay for mobile dropdowns */}
      {(isProfileOpen || isFiltersOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => {
            setIsProfileOpen(false);
            setIsFiltersOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AskQuestion;