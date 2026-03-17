import React from 'react';
import './index.css';
import { AppProvider, useAppContext } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { OccurrencesView } from './views/OccurrencesView';
import { AIView } from './views/AIView';

const AppContent: React.FC = () => {
  const { activeTab } = useAppContext();

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
