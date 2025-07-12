import React, { useState } from 'react';
import { ChevronDown, Bell, Settings, LogOut, User, Filter, Clock, MessageCircle, Plus, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>John Doe</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>john@example.com</p>
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

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-lg shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className={`text-xl font-semibold mb-4 sm:mb-0 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Latest Questions</h2>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Newest
              </button>
              <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}>
                Unanswered
              </button>
              <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}>
                Most Voted
              </button>
              <button className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}>
                Most Viewed
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search questions..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>

          {/* Sample Questions */}
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-4 mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>5 answers</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>124 views</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                How to join 2 columns in a data set to make a separate column in SQL
              </h3>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a...
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>sql</span>
                <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>database</span>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-4 mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 answers</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>89 views</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Best practices for React state management in large applications
              </h3>
              <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm working on a large React application and struggling with state management. What are the best practices for organizing state in complex components?
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>react</span>
                <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>javascript</span>
                <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>state-management</span>
              </div>
            </div>
          </div>
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
}