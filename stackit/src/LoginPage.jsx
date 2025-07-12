import React, { useState } from 'react';
import { Sun, Moon, Mail, Lock, User, Eye, EyeOff, Shield, ArrowLeft, Sparkles } from 'lucide-react';

const LoginPage
 = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    adminCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`${currentView === 'login' ? 'Login' : currentView === 'register' ? 'Registration' : 'Admin Login'} successful!`);
    }, 1500);
  };

  const FloatingShape = ({ className, delay = 0 }) => (
    <div 
      className={`absolute rounded-full opacity-10 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">Sign in to continue your journey</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 rounded" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
          } text-white shadow-lg hover:shadow-xl`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentView('register')}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors"
          >
            Create account
          </button>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <button
            onClick={() => setCurrentView('admin')}
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium transition-colors flex items-center"
          >
            <Shield className="h-4 w-4 mr-1" />
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Join StackIt!</h1>
        <p className="text-gray-600 dark:text-gray-400">Create your account and start learning</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-green-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
            } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-green-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
            } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-green-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
            } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-green-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-green-500'
            } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <label className="flex items-center">
          <input type="checkbox" className="mr-2 rounded" required />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            I agree to the <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105'
          } text-white shadow-lg hover:shadow-xl`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentView('login')}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );

  const renderAdminForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
        <p className="text-gray-600 dark:text-gray-400">Secure administrator login</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Admin password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="adminCode"
            placeholder="Admin access code"
            value={formData.adminCode}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
          } text-white shadow-lg hover:shadow-xl`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Authenticating...
            </div>
          ) : (
            'Admin Login'
          )}
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentView('login')}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to regular login
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <FloatingShape className="w-64 h-64 bg-blue-500 -top-32 -left-32" delay={0} />
      <FloatingShape className="w-48 h-48 bg-purple-500 top-1/4 -right-24" delay={1} />
      <FloatingShape className="w-32 h-32 bg-green-500 bottom-1/4 -left-16" delay={2} />
      <FloatingShape className="w-40 h-40 bg-pink-500 -bottom-20 -right-20" delay={0.5} />

      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-sm sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md">
          <div className={`${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} backdrop-blur-sm rounded-2xl shadow-2xl border p-8`}>
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'register' && renderRegisterForm()}
            {currentView === 'admin' && renderAdminForm()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage
;