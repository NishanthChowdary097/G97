import React, { useState } from 'react';
import { FaMoon } from 'react-icons/fa';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark bg-orange-950 text-white' : 'bg-orange-100 text-gray-900'}>  
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-orange-100 p-8 rounded-lg shadow-lg max-w-md border-t-4 border-b-4 border-orange-500 w-full">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-orange-500"
                required
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="text-center">
            <a
              href="#"
              className="text-orange-500 hover:text-orange-600 focus:outline-none focus:underline"
            >
              Signup if not registered
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
