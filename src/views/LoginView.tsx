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
    <div className="min-h-[85vh] flex items-center justify-center animate-in fade-in duration-700 px-4">
      <Card className="p-12 max-w-2xl w-full shadow-2xl border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bem-vindo de volta!</h2>
          <p className="text-lg text-slate-500 mt-3">Acesse sua conta EduFlow para continuar seus estudos</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-3">
            <label className="text-base font-semibold text-slate-700 flex items-center gap-2">
              <Mail size={20} className="text-indigo-500" />
              E-mail institucional
            </label>
            <div className="relative">
              <input
                {...register("email", { 
                  required: "E-mail é obrigatório", 
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } 
                })}
                className={`w-full px-5 py-4 text-lg border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                placeholder="exemplo@instituicao.edu.br"
              />
              {errors.email && <p className="text-sm text-rose-500 mt-2 font-medium">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-base font-semibold text-slate-700 flex items-center gap-2">
                <Lock size={20} className="text-indigo-500" />
                Sua senha
              </label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Esqueceu a senha?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                className={`w-full px-5 py-4 text-lg border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.password ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                placeholder="••••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4.5 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
              {errors.password && <p className="text-sm text-rose-500 mt-2 font-medium">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              id="remember" 
              {...register("remember")}
              className="w-5 h-5 text-indigo-600 border-slate-300 rounded-lg focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-base text-slate-600 cursor-pointer font-medium select-none">Mantenha-me conectado neste dispositivo</label>
          </div>

          <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] transition-transform">
            Entrar no Sistema
            <LogIn size={22} />
          </Button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-slate-100">
          <p className="text-base text-slate-500">
            Ainda não tem acesso?{' '}
            <button 
              onClick={() => setActiveTab('register')}
              className="font-black text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
            >
              Cadastre-se agora
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};
