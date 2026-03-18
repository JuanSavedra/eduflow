import { useState } from 'react';
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

export const RegisterView = () => {
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
    <div className="min-h-[85vh] flex items-center justify-center animate-in fade-in duration-700 px-4 py-12">
      <Card className="p-12 max-w-3xl w-full shadow-2xl border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Crie sua conta EduFlow</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-4">Junte-se a milhares de estudantes e organize sua vida acadêmica</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="grid grid-cols-1 gap-7">
            <div className="space-y-3">
              <label className="text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mail size={20} className="text-indigo-500" />
                E-mail acadêmico
              </label>
              <div className="relative">
                <input
                  {...register("email", { 
                    required: "E-mail é obrigatório", 
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } 
                  })}
                  className={`w-full px-5 py-4 text-lg border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.email ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-indigo-500'}`}
                  placeholder="seu.nome@universidade.edu"
                />
                {errors.email && <p className="text-sm text-rose-500 mt-2 font-medium">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock size={20} className="text-indigo-500" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                    className={`w-full px-5 py-4 text-lg border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.password ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                  {errors.password && <p className="text-sm text-rose-500 mt-2 font-medium">{errors.password.message}</p>}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-base font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock size={20} className="text-indigo-500" />
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", { 
                      required: "Confirmação é obrigatória",
                      validate: (val: string) => val === password || "As senhas não coincidem"
                    })}
                    className={`w-full px-5 py-4 text-lg border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.confirmPassword ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-indigo-500'}`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-sm text-rose-500 mt-2 font-medium">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button type="submit" className="w-full py-5 text-xl font-black shadow-xl shadow-indigo-100 dark:shadow-indigo-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all">
              Finalizar Cadastro e Começar
              <UserPlus size={24} />
            </Button>
          </div>
        </form>

        <div className="mt-12 text-center border-t border-slate-100 dark:border-slate-800 pt-8">
          <button 
            onClick={() => setActiveTab('login')}
            className="text-lg font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline flex items-center justify-center gap-3 mx-auto transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Já possui uma conta acadêmica? Entre aqui
          </button>
        </div>
      </Card>
    </div>
  );
};
