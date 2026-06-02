'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useResourceStore } from '@/store/resource.store';
import { login } from '@/features/auth/services/auth.service';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fp, dice, gainFP, triggerBFRBPenalty } = useResourceStore();
  const { user, token, setAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  // 🟩 引入路徑監聽器，自動抓取當前 URL 路由
  const pathname = usePathname();

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
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-400 font-mono flex flex-col uppercase text-xs selection:bg-cyan-900 selection:text-cyan-100">
      
      {/* TOP BAR */}
      <header className="flex justify-between items-center px-6 py-3 border-b border-zinc-900 text-[10px] tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-500">SYSTEM_STATUS: GROWTH_ACTIVE</span>
        </div>
        <div className="text-zinc-500 tracking-[0.2em]">
          NEURO-REWARD OPERATING SYSTEM v4.2
        </div>
        <div className="flex items-center gap-6">
          <span className="text-cyan-500">NP_COEFF: +11.0%</span>
          <span className="text-zinc-600">2026/05/19 | CORE: STABLE_SYNC</span>
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
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 border-r border-zinc-900 flex flex-col p-4 justify-between shrink-0">
          <div>
            <div className="text-[10px] text-zinc-600 mb-2">◆ MAIN EPIC: FREEDOM (FP)</div>
            
            {/* FP Tracker */}
            <div 
              className="flex justify-between items-end mb-1 cursor-pointer hover:text-white transition-colors"
              onClick={() => gainFP(0.5)}
            >
              <h1 className="text-2xl text-white normal-case font-sans tracking-tight">Germany</h1>
              <span className="text-red-500 text-sm">{fp.toFixed(1)}%</span>
            </div>
            
            <div className="text-[9px] text-zinc-700 text-right mb-8">
              PHASE 01: RESOURCE ACCUMULATION
            </div>

            {/* 🟩 路由級導航矩陣 - 基於路徑名精確匹配高亮樣式 */}
            <nav className="space-y-2">
              <Link 
                href="/"
                className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer transition-all border ${
                  pathname === '/dashboard' 
                    ? 'bg-cyan-950/30 text-cyan-500 border-cyan-900/50' 
                    : 'border-transparent text-zinc-500 hover:text-white'
                }`}
              >
                <span>⚡</span> CORE CORE
              </Link>
              
              <Link 
                href="/task"
                className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer transition-all border ${
                  pathname === '/dashboard/task' 
                    ? 'bg-cyan-950/30 text-cyan-500 border-cyan-900/50' 
                    : 'border-transparent text-zinc-500 hover:text-white'
                }`}
              >
                <span>∿</span> ACTION MATRIX
              </Link>
              
              <Link 
                href="/reward"
                className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer transition-all border ${
                  pathname === '/dashboard/reward' 
                    ? 'bg-amber-950/20 text-amber-500 border-amber-900/30' 
                    : 'border-transparent text-zinc-500 hover:text-white'
                }`}
              >
                <span>⊕</span> REWARD CENTER
              </Link>
              
              <Link 
                href="/statistics"
                className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer transition-all border ${
                  pathname === '/dashboard/statistics' 
                    ? 'bg-indigo-950/20 text-indigo-500 border-indigo-900/30' 
                    : 'border-transparent text-zinc-500 hover:text-white'
                }`}
              >
                <span>◷</span> STATISTICS
              </Link>
            </nav>
          </div>

          {/* SIDEBAR BOTTOM: DICE & PENALTY */}
          <div className="border-t border-zinc-900 pt-4 space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-zinc-600">PERMISSIONS</span>
              <span className="text-white text-lg">{dice} <span className="text-cyan-500 text-xs">DICE</span></span>
            </div>
            <button 
              onClick={triggerBFRBPenalty}
              className="w-full bg-red-950/20 text-red-500 border border-red-900/50 hover:bg-red-900/40 hover:text-white py-2 rounded transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-[10px]">⊗ TRIGGER BFRB PENALTY</span>
            </button>
          </div>
        </aside>

        {/* 🟩 真正符合 Next.js 範式的動態路由插槽 */}
        {children}
        
      </div>

      {/* BOTTOM TERMINAL BAR */}
      <footer className="h-8 border-t border-zinc-900 px-4 flex items-center justify-between text-[9px] tracking-wider shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-red-500">BFRB_MONITOR:</span>
          <span className="text-zinc-600">STATUS_OK // NO_LEAKS_DETECTED</span>
        </div>
        <div className="text-zinc-500">
          <span className="text-emerald-500">TERMINAL OUTPUT:</span> completed: Manga / Series Session [DIFF: {`{"dice":-1, "xp":0}`}]
        </div>
        <div className="text-zinc-700">UPLINK STABLE _ ▮</div>
      </footer>
    </div>
  );
}