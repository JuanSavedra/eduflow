import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

export const LoginView: React.FC = () => {
  const { login, setActiveTab } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
    login();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-500 px-4">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Bem-vindo de volta!</h2>
          <p className="text-slate-500">Acesse sua conta EduFlow</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-indigo-500" />
              E-mail
            </label>
            <div className="relative">
              <input
                {...register("email", { 
                  required: "E-mail é obrigatório", 
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } 
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock size={16} className="text-indigo-500" />
                Senha
              </label>
              <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Esqueci a senha?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.password ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remember" 
              {...register("remember")}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Lembrar de mim</label>
          </div>

          <Button type="submit" className="w-full py-3">
            Entrar
            <LogIn size={18} />
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Não tem uma conta?{' '}
            <button 
              onClick={() => setActiveTab('register')}
              className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Crie uma agora
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};
