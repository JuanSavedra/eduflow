import { useState } from 'react';
import { Search, Bell, Settings, LogOut, Moon, Sun, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Header = () => {
  const { activeTab, logout, setActiveTab, isDarkMode, toggleDarkMode } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-20 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 capitalize">
            {activeTab === 'ai' ? 'Consultoria Inteligente' : 
             activeTab === 'subjects' ? 'Gerenciamento de Matérias' : 
             activeTab === 'occurrences' ? 'Registro de Ocorrências' : 
             activeTab === 'settings' ? 'Configurações da Conta' : 'Painel Geral'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar conteúdo..." 
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 w-64 text-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors group"
            >
              <Bell size={20} className="group-hover:text-indigo-600 transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            {/* Modal/Dropdown Local de Notificações */}
            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsNotificationsOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Notificações</p>
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase">3 Novas</span>
                  </div>

                  <div className="max-h-96 overflow-y-auto px-2 py-1">
                    {[
                      { id: 1, title: 'Nova nota postada', desc: 'Sua nota de Cálculo I foi publicada: 8.5', time: '5 min atrás', icon: '📝', color: 'bg-emerald-50 dark:bg-emerald-900/20' },
                      { id: 2, title: 'Material de aula', desc: 'Professor Silva enviou novos slides de Algoritmos', time: '2 horas atrás', icon: '📚', color: 'bg-blue-50 dark:bg-blue-900/20' },
                      { id: 3, title: 'Lembrete de Aula', desc: 'Sua aula de História começa em 15 minutos', time: '15 min atrás', icon: '⏰', color: 'bg-amber-50 dark:bg-amber-900/20' }
                    ].map(notif => (
                      <button key={notif.id} className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex gap-4 items-start group">
                        <div className={`w-10 h-10 shrink-0 ${notif.color} rounded-full flex items-center justify-center text-lg`}>
                          {notif.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{notif.desc}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{notif.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 px-2 border-t border-slate-50 dark:border-slate-800">
                    <button className="w-full py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Gabriel Souza</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Estudante de Engenharia</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold ring-2 ring-transparent hover:ring-indigo-200 dark:hover:ring-indigo-900/50 transition-all">
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
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 z-20 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Minha Conta</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">gabriel.souza@edu.br</p>
                  </div>

                  <div className="px-2 space-y-1">
                    <button 
                      onClick={() => {
                        setActiveTab('settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm transition-all">
                          <Settings size={18} />
                        </div>
                        <span className="text-sm font-semibold">Configurações</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>

                    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                          {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                        </div>
                        <span className="text-sm font-semibold">Modo Escuro</span>
                      </div>
                      <button 
                        onClick={toggleDarkMode}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 px-2 border-t border-slate-50 dark:border-slate-800">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    >
                      <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
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
