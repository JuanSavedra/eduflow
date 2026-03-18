import React, { useState } from 'react';
import { Search, Bell, Settings, LogOut, Moon, Sun, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { activeTab, logout } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Gabriel Souza</p>
                <p className="text-xs text-slate-500">Estudante de Engenharia</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold ring-2 ring-transparent hover:ring-indigo-200 transition-all">
                GS
              </div>
            </button>

            {/* Modal/Dropdown Local do Perfil */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-5 py-3 border-b border-slate-50 mb-2">
                    <p className="text-sm font-bold text-slate-800">Minha Conta</p>
                    <p className="text-xs text-slate-500">gabriel.souza@edu.br</p>
                  </div>

                  <div className="px-2 space-y-1">
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                          <Settings size={18} />
                        </div>
                        <span className="text-sm font-semibold">Configurações</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>

                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                          {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                        </div>
                        <span className="text-sm font-semibold">Modo Escuro</span>
                      </div>
                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 px-2 border-t border-slate-50">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <div className="p-2 bg-rose-50 rounded-lg">
                        <LogOut size={18} />
                      </div>
                      <span className="text-sm font-bold">Sair da Sessão</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
