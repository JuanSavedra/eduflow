/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password?: string; // Optional if using different providers, but we use email/password
}

interface SignUpCredentials {
  name: string;
  email: string;
  password?: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signed: boolean;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
  updateProfile(data: Partial<User>): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storagedUser = localStorage.getItem('@EduFlow:user');
    if (storagedUser) {
      try {
        return JSON.parse(storagedUser);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        return null;
      }
    }
    return null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('@EduFlow:token');
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/auth/login', { email, password });
    
    const { access_token, user: userData } = response.data;
    
    setUser(userData);
    setToken(access_token);
    
    localStorage.setItem('@EduFlow:user', JSON.stringify(userData));
    localStorage.setItem('@EduFlow:token', access_token);
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    const response = await api.post('/auth/register', { name, email, password });
    
    const { access_token, user: userData } = response.data;
    
    setUser(userData);
    setToken(access_token);
    
    localStorage.setItem('@EduFlow:user', JSON.stringify(userData));
    localStorage.setItem('@EduFlow:token', access_token);
  }

  function signOut() {
    localStorage.removeItem('@EduFlow:user');
    localStorage.removeItem('@EduFlow:token');
    setUser(null);
    setToken(null);
  }

  async function updateProfile(data: Partial<User>) {
    const response = await api.patch('/users/profile', data);
    const updatedUser = response.data;

    setUser(updatedUser);
    localStorage.setItem('@EduFlow:user', JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider 
      value={{ 
        signed: !!user, 
        user, 
        token, 
        loading, 
        signIn, 
        signUp, 
        signOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
