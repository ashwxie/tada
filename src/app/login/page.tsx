'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/features/auth/components/LoginForm';
import { useAuthStore } from '@/store/auth.store';

export default function LoginPage() {
  const { token } = useAuthStore();
  const router = useRouter();

  // 核心逻辑：如果已经有 Token，禁止访问登录页，直接去 Dashboard
  useEffect(() => {
    console.log(token)
    if (token) {
      console.log('test')
      router.push('/');
    }
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}