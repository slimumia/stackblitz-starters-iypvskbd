'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MorningBriefing from '../components/MorningBriefing';
import { useAppStore } from '../store/useAppStore';
import { Sun, Map as MapIcon, Receipt } from 'lucide-react';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-[#131B24] flex items-center justify-center animate-pulse">
      <p className="text-emerald-400/50 font-medium tracking-widest">
        雷達圖資載入中...
      </p>
    </div>
  ),
});

export default function Page() {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'briefing' && <MorningBriefing />}
        {activeTab === 'radar' && <LeafletMap />}
        {activeTab === 'receipt' && (
          <div className="flex items-center justify-center h-full">
            {/* 🟢 Please fill in here: 未來的收據掃描與 Firebase 串接模組將放置於此 */}
            <p className="text-slate-500">收據掃描模組開發中...</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1E293B]/95 backdrop-blur-md border-t border-slate-700/50 z-[500] safe-area-pb">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
          <button
            onClick={() => setActiveTab('briefing')}
            className={`flex flex-col items-center justify-center w-full space-y-1 ${
              activeTab === 'briefing' ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <Sun className="w-6 h-6" />
            <span className="text-[10px] font-medium">早報</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex flex-col items-center justify-center w-full space-y-1 ${
              activeTab === 'radar' ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <MapIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">雷達</span>
          </button>

          <button
            onClick={() => setActiveTab('receipt')}
            className={`flex flex-col items-center justify-center w-full space-y-1 ${
              activeTab === 'receipt' ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <Receipt className="w-6 h-6" />
            <span className="text-[10px] font-medium">收據</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
