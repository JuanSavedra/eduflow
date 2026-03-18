import React from 'react';
import './index.css';
import { AppProvider, useAppContext } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { OccurrencesView } from './views/OccurrencesView';
import { AIView } from './views/AIView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';

const AppContent: React.FC = () => {
  const { activeTab, isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
            <span className="text-2xl font-bold italic">E</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">EduFlow</h1>
        </div>
        {activeTab === 'login' ? <LoginView /> : <RegisterView />}
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="bg-indigo-600 text-white p-4 mb-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">EduFlow Refatorado</h1>
        <p className="text-indigo-100">O Tailwind deve estar funcionando se você ver este bloco azul.</p>
      </div>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'subjects' && <SubjectsView />}
      {activeTab === 'occurrences' && <OccurrencesView />}
      {activeTab === 'ai' && <AIView />}
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
