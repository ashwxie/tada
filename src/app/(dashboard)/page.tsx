'use client';

import { useState, useEffect } from 'react';
import { login } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function TestLoginPage() {
  const { user, token, setAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Verification log to console
  useEffect(() => {
    console.log('Current Auth State:', { user, token });
  }, [user, token]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login({ email: 'test@example.com', password: 'password123' });
      setAuth(response.token, response.user);
      alert('Login Successful! Check console.');
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async() => {
    logout();
    window.location.href = '/login';
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Auth Foundation Test</h1>
      
      <div className="p-4 border rounded bg-gray-50">
        <p><strong>User:</strong> {user?.name || 'Not logged in'}</p>
        <p><strong>Token:</strong> {token ? `${token.substring(0, 10)}...` : 'None'}</p>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Trigger Mock Login'}
        </button>

        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Clear Auth
        </button>
      </div>
    </div>
  );
}