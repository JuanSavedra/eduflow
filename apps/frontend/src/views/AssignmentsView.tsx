import { useState, useMemo } from 'react';
import { ListTodo, CheckCircle2, Clock, AlertCircle, Plus, Calendar, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { useAssignments } from '../context/AssignmentsContext';

export const AssignmentsView = () => {
  const { subjects } = useAppContext();
  const { assignments, addAssignment, updateAssignmentStatus, removeAssignment } = useAssignments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subjectId: '',
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.subjectId || !newAssignment.dueDate) return;

    await addAssignment({
      title: newAssignment.title,
      description: newAssignment.description,
      subjectId: newAssignment.subjectId,
      dueDate: new Date(newAssignment.dueDate).toISOString(),
    });

    setNewAssignment({ title: '', description: '', subjectId: '', dueDate: '' });
    setIsModalOpen(false);
  };

  const now = useMemo(() => new Date(), []);

  const categorizedAssignments = useMemo(() => {
    const pending: typeof assignments = [];
    const completed: typeof assignments = [];
    const late: typeof assignments = [];

    assignments.forEach(assignment => {
      if (assignment.status === 'completed') {
        completed.push(assignment);
      } else {
        const dueDate = new Date(assignment.dueDate);
        if (dueDate < now) {
          late.push(assignment);
        } else {
          pending.push(assignment);
        }
      }
    });

    return { pending, completed, late };
  }, [assignments, now]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getDaysRemaining = (dateString: string) => {
    const date = new Date(dateString);
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Gestão de Tarefas</h1>
          <p className="text-slate-500 dark:text-slate-400">Organize seus prazos, provas e trabalhos.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Plus size={20} />
          <span>Nova Tarefa</span>
        </Button>
      </div>

      {/* Tabs / Filters could go here */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Atrasadas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-4 border-b border-rose-100 dark:border-rose-900/30 pb-2">
            <AlertCircle size={20} />
            <h2 className="font-bold">Atrasadas ({categorizedAssignments.late.length})</h2>
          </div>
          {categorizedAssignments.late.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa atrasada. Excelente!</p>
          ) : (
            categorizedAssignments.late.map(task => (
              <Card key={task.id} className="p-4 border-l-4 border-rose-500 bg-rose-50/30 dark:bg-rose-950/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2">{task.title}</h3>
                  <button onClick={() => updateAssignmentStatus(task.id, 'completed')} className="text-slate-400 hover:text-emerald-500 transition-colors" title="Marcar como concluída">
                    <CheckCircle2 size={20} />
                  </button>
                </div>
                {task.subjectName && <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{task.subjectName}</p>}
                {task.description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{task.description}</p>}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                  <button onClick={() => removeAssignment(task.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pendentes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-500 mb-4 border-b border-amber-100 dark:border-amber-900/30 pb-2">
            <Clock size={20} />
            <h2 className="font-bold">Pendentes ({categorizedAssignments.pending.length})</h2>
          </div>
          {categorizedAssignments.pending.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa pendente.</p>
          ) : (
            categorizedAssignments.pending.map(task => {
              const daysLeft = getDaysRemaining(task.dueDate);
              const isUrgent = daysLeft <= 2;
              return (
                <Card key={task.id} className={`p-4 border-l-4 ${isUrgent ? 'border-amber-500' : 'border-blue-500'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2">{task.title}</h3>
                    <button onClick={() => updateAssignmentStatus(task.id, 'completed')} className="text-slate-400 hover:text-emerald-500 transition-colors" title="Marcar como concluída">
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                  {task.subjectName && <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{task.subjectName}</p>}
                  {task.description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{task.description}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isUrgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      <Calendar size={14} />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                    <button onClick={() => removeAssignment(task.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Card>
              )
            })
          )}
        </div>

        {/* Concluídas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-500 mb-4 border-b border-emerald-100 dark:border-emerald-900/30 pb-2">
            <ListTodo size={20} />
            <h2 className="font-bold">Concluídas ({categorizedAssignments.completed.length})</h2>
          </div>
          {categorizedAssignments.completed.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa concluída ainda.</p>
          ) : (
            categorizedAssignments.completed.map(task => (
              <Card key={task.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 opacity-75">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 line-through decoration-slate-400">{task.title}</h3>
                  <button onClick={() => updateAssignmentStatus(task.id, 'pending')} className="text-emerald-500 hover:text-amber-500 transition-colors" title="Desmarcar">
                    <CheckCircle2 size={20} className="fill-emerald-100 dark:fill-emerald-900/30" />
                  </button>
                </div>
                {task.subjectName && <p className="text-xs font-semibold text-slate-500 mb-2">{task.subjectName}</p>}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar size={14} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                  <button onClick={() => removeAssignment(task.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>

      {/* Modal Nova Tarefa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <Plus size={24} className="text-indigo-600 dark:text-indigo-400" />
              Adicionar Tarefa
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Título</label>
                <input
                  type="text"
                  required
                  value={newAssignment.title}
                  onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ex: Prova de Cálculo, Trabalho de História..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Disciplina</label>
                <select
                  required
                  value={newAssignment.subjectId}
                  onChange={e => setNewAssignment({...newAssignment, subjectId: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="" disabled>Selecione uma disciplina...</option>
                  {subjects.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Data e Hora de Entrega</label>
                <input
                  type="datetime-local"
                  required
                  value={newAssignment.dueDate}
                  onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Descrição (Opcional)</label>
                <textarea
                  value={newAssignment.description}
                  onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-24"
                  placeholder="Detalhes adicionais..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Salvar Tarefa
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
};
