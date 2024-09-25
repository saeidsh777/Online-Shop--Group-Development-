"use client";
import { useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '@/services/user';
import useToken from '@/hooks/useToken';
import ChangePassword from '@/components/Others/ChangePassword/ChangePassword';

const ProfileForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = useToken();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const { result } = await getUserInfo(token);
        setUser({
          name: result.name || '',
          email: result.email || '',
          phoneNumber: result.phoneNumber || '',
        });
      } catch (err) {
        setError('Failed to fetch user info');
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!token) {
      setError('Token is missing');
      setLoading(false);
      return;
    }

    try {
      const { result } = await updateUserInfo(user, token);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 w-full mx-auto bg-white rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform">
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label htmlFor="name" className="block text-lg font-semibold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name || ''}
          onChange={handleInputChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 transform hover:scale-105"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email || ''}
          onChange={handleInputChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 transform hover:scale-105"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber || ''}
          onChange={handleInputChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 transform hover:scale-105"
          required
        />
      </div>

      <button
        type="submit"
        className="mx-w-lg bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>

    </form>
      <div className="pt-4">
        <ChangePassword />
      </div>
    </div>
  );
};

export default ProfileForm;
