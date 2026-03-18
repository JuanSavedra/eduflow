/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react';

interface AppContextData {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  subjects: Subject[];
  occurrences: Occurrence[];
  newSubjectName: string;
  setNewSubjectName: (name: string) => void;
  calculateAverage: (grades: number[]) => string;
  globalAverage: string | number;
  totalAbsences: number;
  addSubject: () => void;
  removeSubject: (id: number) => void;
  updateAbsences: (id: number, delta: number) => void;
  addGrade: (id: number) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);


  const login = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveTab('login');
  };
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Cálculo I', grades: [8.5, 7.0, 9.2], absences: 4 },
    { id: 2, name: 'História Geral', grades: [9.5, 10], absences: 2 },
    { id: 3, name: 'Algoritmos', grades: [6.5, 5.0], absences: 8 },
  ]);
  const [occurrences] = useState<Occurrence[]>([
    { id: 1, date: '2023-10-15', title: 'Entrega Atrasada', type: 'Aviso', subject: 'Cálculo I' },
    { id: 2, date: '2023-11-02', title: 'Destaque Acadêmico', type: 'Elogio', subject: 'História Geral' }
  ]);
  const [newSubjectName, setNewSubjectName] = useState('');

  const calculateAverage = (grades: number[]) => {
    if (grades.length === 0) return "0.0";
    const sum = grades.reduce((a, b) => a + b, 0);
    return (sum / grades.length).toFixed(1);
  };

  const globalAverage = useMemo(() => {
    const total = subjects.reduce((acc, sub) => acc + parseFloat(calculateAverage(sub.grades)), 0);
    return subjects.length > 0 ? (total / subjects.length).toFixed(1) : 0;
  }, [subjects]);

  const totalAbsences = subjects.reduce((acc, sub) => acc + sub.absences, 0);

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    const newSub: Subject = {
      id: Date.now(),
      name: newSubjectName,
      grades: [],
      absences: 0
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName('');
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateAbsences = (id: number, delta: number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, absences: Math.max(0, s.absences + delta) } : s));
  };

  const addGrade = (id: number) => {
    const gradeStr = prompt("Digite a nota (0-10):");
    if (!gradeStr) return;
    const grade = parseFloat(gradeStr.replace(',', '.'));
    if (isNaN(grade) || grade < 0 || grade > 10) return;
    setSubjects(subjects.map(s => s.id === id ? { ...s, grades: [...s.grades, grade] } : s));
  };

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      isAuthenticated, login, logout,
      subjects, occurrences,
      newSubjectName, setNewSubjectName,
      calculateAverage, globalAverage, totalAbsences,
      addSubject, removeSubject, updateAbsences, addGrade,
      isDarkMode, toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
