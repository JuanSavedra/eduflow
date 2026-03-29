import { LayoutDashboard, BookOpen, BrainCircuit, ListTodo } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-30 shadow-2xl transition-colors">
      <Link to="/dashboard" className={`flex flex-col items-center p-2 ${isActive('dashboard') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-bold mt-1">Home</span>
      </Link>
      <Link to="/subjects" className={`flex flex-col items-center p-2 ${isActive('subjects') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
        <BookOpen size={20} />
        <span className="text-[10px] font-bold mt-1">Aulas</span>
      </Link>
      <Link to="/assignments" className={`flex flex-col items-center p-2 ${isActive('assignments') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
        <ListTodo size={20} />
        <span className="text-[10px] font-bold mt-1">Tarefas</span>
      </Link>
      <Link to="/ai" className={`flex flex-col items-center p-2 ${isActive('ai') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
        <BrainCircuit size={20} />
        <span className="text-[10px] font-bold mt-1">EduAI</span>
      </Link>
    </nav>
  );
};
