import React from 'react';
import { LayoutDashboard, BookOpen, BrainCircuit } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const MobileNav = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-30 shadow-2xl">
      <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center p-2 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-bold mt-1">Home</span>
      </button>
      <button onClick={() => setActiveTab('subjects')} className={`flex flex-col items-center p-2 ${activeTab === 'subjects' ? 'text-indigo-600' : 'text-slate-400'}`}>
        <BookOpen size={20} />
        <span className="text-[10px] font-bold mt-1">Aulas</span>
      </button>
      <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center p-2 ${activeTab === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}>
        <BrainCircuit size={20} />
        <span className="text-[10px] font-bold mt-1">EduAI</span>
      </button>
    </nav>
  );
};
