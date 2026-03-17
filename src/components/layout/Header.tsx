import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { activeTab } = useAppContext();

  return (
    <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {activeTab === 'ai' ? 'Consultoria Inteligente' : 
             activeTab === 'subjects' ? 'Gerenciamento de Matérias' : 
             activeTab === 'occurrences' ? 'Registro de Ocorrências' : 'Painel Geral'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar conteúdo..." 
              className="bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">Gabriel Souza</p>
              <p className="text-xs text-slate-500">Estudante de Engenharia</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
              GS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
