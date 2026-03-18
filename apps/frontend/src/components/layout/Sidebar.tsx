import { LayoutDashboard, BookOpen, AlertCircle, BrainCircuit } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col transition-colors">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <span className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">EduFlow</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-semibold">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('subjects')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'subjects' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <BookOpen size={20} />
          <span className="font-semibold">Minhas Matérias</span>
        </button>
        <button 
          onClick={() => setActiveTab('occurrences')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'occurrences' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <AlertCircle size={20} />
          <span className="font-semibold">Ocorrências</span>
        </button>
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'ai' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
          >
            <BrainCircuit size={20} />
            <span className="font-semibold text-sm">Auxiliar de IA</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
