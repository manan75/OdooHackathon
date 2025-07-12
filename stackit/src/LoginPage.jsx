// LoginPage.jsx
import React, { useState,useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { AppContent } from './Context/AppContext';
import { Sun, Moon, Lock, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const toggleTheme = () => setDarkMode(!darkMode);
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate()
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContent)

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Make API call here
    try{
      const {data} = await axios.post(backendURL+'/api/auth/login', formData,{withCredentials:true})

        if (data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    console.log("Login response: ", data);
                    navigate('/userhome')
                }
                else {
                    alert(data.message)
                }
    }
    catch(err){
      console.error("Auth error:", err)
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-sm sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">Home</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl border shadow-xl`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Login to StackIt</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">Login</button>
          </form>
          <div className="text-center mt-6 space-y-2">
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 text-sm">Don't have an account? Sign up</Link>
            <br />
            <Link to="/admin-login" className="text-purple-600 hover:text-purple-700 text-sm">Are you an admin?</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
