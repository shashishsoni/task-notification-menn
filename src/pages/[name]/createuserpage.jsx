'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query; // Get the username from the query parameters
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const generateDeepLink = () => {
    const baseUrl = 'http://localhost:3000'; // Use localhost for testing
    return `${baseUrl}/name/createuserpage?username=${username}`; // Long shareable link with parameters
  };

  const handleShare = async () => {
    const deepLink = generateDeepLink();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Notification Page for ${username}`,
          text: `Check out ${username}'s notification page!`,
          url: deepLink
        });
      } catch (error) {
        console.log('Error sharing:', error);
        navigator.clipboard.writeText(deepLink);
        alert('Deep link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(deepLink);
      alert('Deep link copied to clipboard!');
    }
  };

  const handleNotification = () => {
    setShowPhoneInput(true); // Show the phone number input
  };

  const sendNotification = async () => {
    if (!phoneNumber) {
      alert('Please enter a valid phone number');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/notifications/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // Include phone number in the request
          messageBody: `Notification from ${username}: ${username} sent you a notification! Here is your link: ${generateDeepLink()}` // Include the message body
        })
      });

      const text = await response.text(); // Get response as text
      console.log('Response:', text); // Log the response for debugging

      let data;
      try {
        data = JSON.parse(text); // Attempt to parse JSON
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Failed to parse server response.');
        return;
      }

      if (response.ok) {
        alert('SMS sent successfully!');
        setShowPhoneInput(false); // Hide the phone input after sending
        setPhoneNumber(''); // Clear the phone number
      } else {
        alert(data.message || 'Failed to send notification');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  if (!username) return null; // Ensure username is available

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border border-blue-200">
        <h1 className="text-4xl font-bold text-blue-800 text-center">This page is for {username}</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">Share this link with others!</p>
        <p className="mt-2 text-sm text-gray-600 text-center">Please enter your phone number with the country code (e.g., +91XXXXXXXXXX).</p>
        <button onClick={handleShare} className="mt-6 p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 w-full">
          Share Deep Link
        </button>
        <button onClick={handleNotification} className="mt-4 p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full">
          Send Notification
        </button>

        {/* Phone Number Input Modal */}
        {showPhoneInput && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-blue-700 mb-2">Enter Phone Number with Country Code (e.g., +91XXXXXXXXXX)</label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Type your phone number with country code (e.g., +91XXXXXXXXXX)"
              className="w-full px-4 py-2 bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
              required
            />
            <button onClick={sendNotification} className="mt-4 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full">
              Send Notification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}