/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Assignment } from '../types/index';
import api from '../services/api';
import { useAuth } from './AuthContext';

interface AssignmentsContextData {
  assignments: Assignment[];
  addAssignment: (data: Omit<Assignment, 'id' | 'status' | 'subjectName'>) => Promise<void>;
  updateAssignmentStatus: (id: string, status: 'pending' | 'completed') => Promise<void>;
  removeAssignment: (id: string) => Promise<void>;
  refreshAssignments: () => Promise<void>;
}

const AssignmentsContext = createContext<AssignmentsContextData | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const { signed } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const refreshAssignments = useCallback(async () => {
    if (!signed) return;
    try {
      const response = await api.get('/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }, [signed]);

  useEffect(() => {
    if (signed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshAssignments();
    } else {
      setAssignments([]);
    }
  }, [signed, refreshAssignments]);

  const addAssignment = async (data: Omit<Assignment, 'id' | 'status' | 'subjectName'>) => {
    try {
      const response = await api.post('/assignments', data);
      setAssignments(prev => [...prev, response.data].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      throw error;
    }
  };

  const updateAssignmentStatus = async (id: string, status: 'pending' | 'completed') => {
    try {
      const response = await api.patch(`/assignments/${id}/status`, { status });
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: response.data.status } : a));
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      throw error;
    }
  };

  const removeAssignment = async (id: string) => {
    try {
      await api.delete(`/assignments/${id}`);
      setAssignments(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
      throw error;
    }
  };

  return (
    <AssignmentsContext.Provider value={{
      assignments,
      addAssignment,
      updateAssignmentStatus,
      removeAssignment,
      refreshAssignments
    }}>
      {children}
    </AssignmentsContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentsProvider');
  }
  return context;
};
