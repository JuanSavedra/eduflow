import { useEffect } from 'react';
import './index.css';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { OccurrencesView } from './views/OccurrencesView';
import { AIView } from './views/AIView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { SettingsView } from './views/SettingsView';

const AppContent = () => {
  const { activeTab, setActiveTab } = useAppContext();
  const { signed, loading } = useAuth();

  // Sincroniza a aba ativa com o estado de login
  useEffect(() => {
    if (!loading) {
      if (signed && (activeTab === 'login' || activeTab === 'register')) {
        setActiveTab('dashboard');
      } else if (!signed && activeTab !== 'login' && activeTab !== 'register') {
        setActiveTab('login');
      }
    }
  }, [signed, loading, activeTab, setActiveTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Carregando EduFlow...</p>
        </div>
      </div>
    );
  }

  if (!signed) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
            <span className="text-2xl font-bold italic">E</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight italic">EduFlow</h1>
        </div>
        {activeTab === 'login' ? <LoginView /> : <RegisterView />}
      </div>
    );
  }

  return (
    <MainLayout>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'subjects' && <SubjectsView />}
      {activeTab === 'occurrences' && <OccurrencesView />}
      {activeTab === 'ai' && <AIView />}
      {activeTab === 'settings' && <SettingsView />}
    </MainLayout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
