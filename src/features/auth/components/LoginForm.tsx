'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function LoginForm() {
  const [email, setEmail] = useState('test@operator.os');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password: 'password123' });
      
      setAuth(res.token, res.user);
      
      router.push('/'); 
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Operator Login</h2>
      <input 
        className="w-full p-2 border rounded" 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Sign In
      </button>
    </form>
  );
}