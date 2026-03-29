/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo, useEffect, useCallback, type ReactNode } from 'react';
import type { Subject, Occurrence, Schedule } from '../types/index';
import api from '../services/api';
import { useAuth } from './AuthContext';

interface AppContextData {
  subjects: Subject[];
  occurrences: Occurrence[];
  calculateAverage: (grades: number[]) => string;
  globalAverage: string | number;
  addSubject: (data: { name: string; teacher?: string; semester?: string }) => Promise<void>;
  removeSubject: (id: string) => Promise<void>;
  addGrade: (id: string, grade: number) => Promise<void>;
  updateSubjectSchedules: (id: string, schedules: Schedule[]) => Promise<void>;
  addOccurrence: (data: Omit<Occurrence, 'id'>) => Promise<void>;
  removeOccurrence: (id: string) => Promise<void>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  refreshSubjects: () => Promise<void>;
  refreshOccurrences: () => Promise<void>;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { signed } = useAuth();
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

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  const refreshSubjects = useCallback(async () => {
    if (!signed) return;
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
    }
  }, [signed]);

  const refreshOccurrences = useCallback(async () => {
    if (!signed) return;
    try {
      const response = await api.get('/occurrences');
      setOccurrences(response.data);
    } catch (error) {
      console.error("Erro ao carregar ocorrências:", error);
    }
  }, [signed]);

  useEffect(() => {
    if (signed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshSubjects();
      refreshOccurrences();
    } else {
      setSubjects([]);
      setOccurrences([]);
    }
  }, [signed, refreshSubjects, refreshOccurrences]);

  const calculateAverage = (grades: number[]) => {
    if (!grades || grades.length === 0) return "0.0";
    const sum = grades.reduce((a, b) => a + b, 0);
    return (sum / grades.length).toFixed(1);
  };

  const globalAverage = useMemo(() => {
    const total = subjects.reduce((acc, sub) => acc + parseFloat(calculateAverage(sub.grades)), 0);
    return subjects.length > 0 ? (total / subjects.length).toFixed(1) : 0;
  }, [subjects]);

  const addSubject = async (data: { name: string; teacher?: string; semester?: string }) => {
    try {
      const response = await api.post('/subjects', data);
      setSubjects(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar matéria:", error);
      throw error;
    }
  };

  const removeSubject = async (id: string) => {
    try {
      await api.delete(`/subjects/${id}`);
      setSubjects(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error("Erro ao remover matéria:", error);
      throw error;
    }
  };

  const addGrade = async (id: string, grade: number) => {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;
    
    const newGrades = [...subject.grades, grade];
    
    try {
      const response = await api.patch(`/subjects/${id}`, { grades: newGrades });
      setSubjects(prev => prev.map(s => s.id === id ? response.data : s));
    } catch (error) {
      console.error("Erro ao adicionar nota:", error);
      throw error;
    }
  };

  const updateSubjectSchedules = async (id: string, schedules: Schedule[]) => {
    try {
      const response = await api.patch(`/subjects/${id}`, { schedules });
      setSubjects(prev => prev.map(s => s.id === id ? response.data : s));
    } catch (error) {
      console.error("Erro ao atualizar horários:", error);
      throw error;
    }
  };

  const addOccurrence = async (data: Omit<Occurrence, 'id'>) => {
    try {
      const response = await api.post('/occurrences', data);
      setOccurrences(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar ocorrência:", error);
      throw error;
    }
  };

  const removeOccurrence = async (id: string) => {
    try {
      await api.delete(`/occurrences/${id}`);
      setOccurrences(prev => prev.filter(o => o.id !== id));
    } catch (error) {
      console.error("Erro ao remover ocorrência:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      subjects, occurrences,
      calculateAverage, globalAverage,
      addSubject, removeSubject, addGrade,
      updateSubjectSchedules,
      addOccurrence, removeOccurrence,
      isDarkMode, toggleDarkMode, refreshSubjects, refreshOccurrences
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
