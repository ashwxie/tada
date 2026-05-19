'use client';

import { useResourceStore } from '@/store/resource.store';

export default function TestLoginPage() {

  const { dice, xp, gainDice, gainXP } = useResourceStore();

  return (
    <main className="flex-1 p-8 flex flex-col items-center justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black overflow-y-auto">
      
      {/* CIRCULAR DICE TRACKER */}
      <div 
        className="relative w-64 h-64 flex items-center justify-center cursor-pointer group"
        onClick={() => gainDice(1)}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="128" cy="128" r="120" stroke="#111" strokeWidth="4" fill="none" />
          <circle 
            cx="128" cy="128" r="120" 
            stroke="#00e5ff" strokeWidth="4" fill="none" 
            strokeDasharray="753" 
            strokeDashoffset={753 - (753 * Math.min(dice, 100)) / 100} 
            className="transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="text-center group-hover:scale-105 transition-transform">
          <div className="text-[9px] text-zinc-500 tracking-[0.2em] mb-2">NEURAL PERMISSION</div>
          <div className="text-6xl text-white font-sans font-light tracking-tighter">{dice}</div>
          <div className="text-[9px] text-cyan-600 tracking-[0.2em] mt-2">ACCUMULATED DICE</div>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="flex gap-4 mt-16">
        
        {/* ACTIVE BUFFS CARD */}
        <div 
          className="w-64 border border-zinc-800 bg-black/50 p-4 rounded cursor-pointer hover:border-zinc-700 transition-colors"
          onClick={() => gainXP(100)}
        >
          <div className="text-[10px] text-zinc-500 mb-4 flex justify-between items-center">
            ACTIVE BUFFS <span className="text-cyan-500">⚡</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600">NP_SCALE</span>
              <span className="text-cyan-500">+11.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">XP_LEVEL</span>
              <span className="text-white">LVL {Math.floor(xp / 100) + 1}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">OPERATING_MODE</span>
              <span className="bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded text-[9px]">GROWTH</span>
            </div>
          </div>
        </div>

        {/* SYSTEM CONTEXT CARD */}
        <div className="w-80 border border-zinc-800 bg-black/50 p-4 rounded flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-zinc-500 mb-4">SYSTEM CONTEXT</div>
            <div className="text-zinc-400 leading-relaxed font-sans text-sm italic">
              Objective: Minimize shadow dopamine. Protect NP at all costs.
            </div>
          </div>
          <div className="text-[9px] text-zinc-700 mt-4 uppercase">
            [ FACTORY RESET PROTOCOL ]
          </div>
        </div>

      </div>
    </main>      
  );
}