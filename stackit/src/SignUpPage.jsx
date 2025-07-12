import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username || !formData.password) {
    setMessage("Please fill all required fields.");
    console.warn("Signup failed: Empty fields");
    return;
  }

  setLoading(true);
  try {
    console.log("Sending signup request to:", `${backendURL}/api/auth/register`);
    const { data } = await axios.post(
      `${backendURL}/api/auth/register`,
      {
        username: formData.username,
        password: formData.password,
      },
      { withCredentials: true }
    );

    if (data.success) {
      console.log("Signup successful:", data);
      setMessage("Registration successful! Please login.");
      alert("Signed up successfully!");
      setFormData({ username: "", password: "" });
    } else {
      console.warn("Signup failed:", data.message || "Unknown error");
      setMessage(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    setMessage("Server error during registration");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-xl w-full max-w-md`}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* Message */}
            {message && (
              <div className={`text-center mt-2 text-sm font-medium ${message.includes("successful") ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
          </form>

          {/* Links */}
          <div className="text-center mt-6 space-x-4">
            <Link to="/login" className="text-blue-600 hover:underline">Already have an account?</Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link to="/admin-login" className="text-purple-600 hover:underline">Are you admin?</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
