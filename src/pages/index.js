'use client';
import AdminDashboard from '../components/AdminDashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div>
        <h2>Welcome</h2>
        <p>Please enter your phone number with the country code (e.g., +91XXXXXXXXXX).</p>
        <input
          type="text"
          placeholder="Type your phone number with country code (e.g., +91XXXXXXXXXX)"
          // other props...
        />
        {/* Other form elements */}
      </div>
      <AdminDashboard />
    </div>
  );
}
