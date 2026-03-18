import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterView: React.FC = () => {
  const { setActiveTab } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();

  const password = watch("password");

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Register data:", data);
    alert("Conta criada com sucesso! Agora faça seu login.");
    setActiveTab('login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-500 px-4">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Crie sua conta</h2>
          <p className="text-slate-500">Junte-se ao EduFlow hoje</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-indigo-500" />
              Senha
            </label>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Lock size={16} className="text-indigo-500" />
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { 
                  required: "Confirmação é obrigatória",
                  validate: (val: string) => val === password || "As senhas não coincidem"
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.confirmPassword ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full py-3">
              Criar Conta
              <UserPlus size={18} />
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <button 
            onClick={() => setActiveTab('login')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft size={16} />
            Já tem uma conta? Faça login
          </button>
        </div>
      </Card>
    </div>
  );
};
