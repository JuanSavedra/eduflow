import axios from 'axios';

// Cria uma instância centralizada do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@EduFlow:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Interceptor para tratar erros de autenticação (como token expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se der 401 (Não autorizado), limpa a sessão e desloga
      localStorage.removeItem('@EduFlow:token');
      localStorage.removeItem('@EduFlow:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
