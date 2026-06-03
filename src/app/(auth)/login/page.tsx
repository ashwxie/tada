"use client";
import { useState } from "react";
import { login } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email: "test@operator.os", password: "123" });
      setAuth(res.token, res.user);
      // Hard refresh or router.push both work now because the Cookie is set
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow rounded">
        <h1 className="mb-4 text-xl font-bold">System Login</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Authenticating..." : "Login to Dashboard"}
        </button>
      </form>
    </div>
  );
}
