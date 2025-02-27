'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedUsername = username.trim().replace(/[^A-Za-z0-9]/g, '');

    if (!sanitizedUsername) {
      alert('Please enter a valid username');
      return;
    }

    // Redirect to the create user page for the specific user
    router.push(`/name/createuserpage?username=${sanitizedUsername}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 ml-[-600px]">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Admin Dashboard</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">Enter a username to navigate to the user page.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-700 mb-2">
              Enter Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-blue-50 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
          >
            Go to User Page
          </button>
        </form>
      </div>
    </div>
  );
} 