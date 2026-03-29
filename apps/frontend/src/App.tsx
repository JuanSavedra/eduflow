import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AssignmentsProvider } from './context/AssignmentsContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { OccurrencesView } from './views/OccurrencesView';
import { AssignmentsView } from './views/AssignmentsView';
import { TimetableView } from './views/TimetableView';
import { AIView } from './views/AIView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { SettingsView } from './views/SettingsView';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { signed, loading } = useAuth();
  const location = useLocation();

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
          <span className="text-2xl font-bold italic">E</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight italic">EduFlow</h1>
      </div>
      {children}
    </div>
  );
};

const AppRoutes = () => {
  const { signed } = useAuth();

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={signed ? <Navigate to="/dashboard" replace /> : <PublicLayout><LoginView /></PublicLayout>} />
      <Route path="/register" element={signed ? <Navigate to="/dashboard" replace /> : <PublicLayout><RegisterView /></PublicLayout>} />

      {/* Rotas Protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="subjects" element={<SubjectsView />} />
        <Route path="timetable" element={<TimetableView />} />
        <Route path="occurrences" element={<OccurrencesView />} />
        <Route path="assignments" element={<AssignmentsView />} />
        <Route path="ai" element={<AIView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AssignmentsProvider>
          <AppRoutes />
        </AssignmentsProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
