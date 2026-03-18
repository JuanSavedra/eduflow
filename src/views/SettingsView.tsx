import { useState } from 'react';
import { 
  User, 
  Lock, 
  History, 
  Shield, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  Trash2,
  Clock,
  Globe,
  Monitor
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const SettingsView = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'history'>('profile');

  // Dados fictícios do usuário
  const [userData, setUserData] = useState({
    name: 'Gabriel Souza',
    email: 'gabriel.souza@edu.br',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP',
    bio: 'Estudante de Engenharia de Software no 5º semestre. Apaixonado por tecnologia e educação.'
  });

  // Histórico fictício
  const accountHistory = [
    { id: 1, action: 'Login realizado', device: 'Chrome no Windows', date: 'Hoje, 08:30', icon: <Monitor size={16} /> },
    { id: 2, action: 'Senha alterada', device: 'iPhone 13', date: '15 Mar, 14:20', icon: <Lock size={16} /> },
    { id: 3, action: 'Novo dispositivo conectado', device: 'Safari no macOS', date: '10 Mar, 09:15', icon: <Monitor size={16} /> },
    { id: 4, action: 'E-mail secundário adicionado', device: 'Chrome no Windows', date: '05 Mar, 11:00', icon: <Mail size={16} /> },
    { id: 5, action: 'Configurações de privacidade atualizadas', device: 'iPhone 13', date: '01 Mar, 16:45', icon: <Shield size={16} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de Configurações */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveSection('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeSection === 'profile' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User size={18} />
            Perfil Pessoal
          </button>
          <button 
            onClick={() => setActiveSection('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeSection === 'security' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock size={18} />
            Segurança e Senha
          </button>
          <button 
            onClick={() => setActiveSection('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeSection === 'history' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <History size={18} />
            Histórico da Conta
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {activeSection === 'profile' && (
            <Card className="p-6 md:p-8 space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                <div className="relative">
                  <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-bold border-4 border-white shadow-xl">
                    GS
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-indigo-600 hover:scale-110 transition-transform">
                    <User size={16} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Gabriel Souza</h3>
                  <p className="text-slate-500 text-sm mb-3">gabriel.souza@edu.br</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Estudante Premium</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Conta Verificada</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Telefone</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Localização</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={userData.location}
                      onChange={(e) => setUserData({...userData, location: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Bio / Sobre Mim</label>
                <textarea 
                  rows={4}
                  value={userData.bio}
                  onChange={(e) => setUserData({...userData, bio: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-4 px-5 text-sm font-semibold text-slate-700 transition-all outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-4 gap-3">
                <Button variant="outline">Descartar Alterações</Button>
                <Button className="gap-2">
                  <Save size={18} />
                  Salvar Alterações
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Segurança da Conta</h3>
                    <p className="text-sm text-slate-500">Gerencie sua senha e configurações de autenticação.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-50">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 px-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                      />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 px-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmar Nova Senha</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-3 px-4 text-sm font-semibold text-slate-700 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border-2 border-indigo-50/50">
                    <div className="flex gap-4 items-center">
                      <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                        <Monitor size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Autenticação em Duas Etapas</p>
                        <p className="text-xs text-slate-500">Adicione uma camada extra de segurança.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white">Configurar</Button>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button className="gap-2">
                      <Lock size={18} />
                      Atualizar Senha
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-rose-50 bg-rose-50/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                      <Trash2 size={24} />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Zona de Perigo</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Excluir sua conta removerá todos os seus dados permanentemente. Esta ação não pode ser desfeita.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-100 hover:border-rose-300 transition-all shrink-0">
                    Encerrar Minha Conta
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'history' && (
            <Card className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">Atividades Recentes</h3>
                    <p className="text-sm text-slate-500">Últimos acessos e alterações na sua conta.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex">Exportar Log</Button>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-8 relative">
                  {accountHistory.map((item) => (
                    <div key={item.id} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 shrink-0 bg-white border-2 border-slate-100 text-slate-400 rounded-xl flex items-center justify-center shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-600 transition-all z-10">
                        {item.icon}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.action}</h4>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">{item.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                          <Globe size={12} className="text-slate-300" />
                          {item.device}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button className="text-xs font-bold text-indigo-600 hover:underline">Ver histórico completo de acessos</button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
