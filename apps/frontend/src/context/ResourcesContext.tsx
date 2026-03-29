/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Resource } from '../types';
import api from '../services/api';
import { useAuth } from './AuthContext';

interface ResourcesContextData {
  resources: Resource[];
  addResource: (data: Omit<Resource, 'id' | 'isFavorite' | 'createdAt' | 'subjectName'>) => Promise<void>;
  toggleFavorite: (id: string, isFavorite: boolean) => Promise<void>;
  removeResource: (id: string) => Promise<void>;
  refreshResources: () => Promise<void>;
}

const ResourcesContext = createContext<ResourcesContextData | undefined>(undefined);

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const { signed } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);

  const refreshResources = useCallback(async () => {
    if (!signed) return;
    try {
      const response = await api.get('/resources');
      setResources(response.data);
    } catch (error) {
      console.error("Erro ao carregar recursos:", error);
    }
  }, [signed]);

  useEffect(() => {
    if (signed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshResources();
    } else {
      setResources([]);
    }
  }, [signed, refreshResources]);

  const addResource = async (data: Omit<Resource, 'id' | 'isFavorite' | 'createdAt' | 'subjectName'>) => {
    try {
      const response = await api.post('/resources', data);
      setResources(prev => [response.data, ...prev]);
    } catch (error) {
      console.error("Erro ao adicionar recurso:", error);
      throw error;
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const response = await api.patch(`/resources/${id}/favorite`, { isFavorite });
      setResources(prev => prev.map(r => r.id === id ? { ...r, isFavorite: response.data.isFavorite } : r));
    } catch (error) {
      console.error("Erro ao atualizar status de favorito:", error);
      throw error;
    }
  };

  const removeResource = async (id: string) => {
    try {
      await api.delete(`/resources/${id}`);
      setResources(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Erro ao remover recurso:", error);
      throw error;
    }
  };

  return (
    <ResourcesContext.Provider value={{
      resources,
      addResource,
      toggleFavorite,
      removeResource,
      refreshResources
    }}>
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error('useResources must be used within an ResourcesProvider');
  }
  return context;
};
