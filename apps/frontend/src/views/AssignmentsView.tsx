import { useState, useMemo } from 'react';
import { ListTodo, CheckCircle2, Clock, AlertCircle, Plus, Calendar, Trash2, Filter, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { useAssignments } from '../context/AssignmentsContext';

type FilterType = 'monthYear' | 'period';

export const AssignmentsView = () => {
  const { subjects, occurrences } = useAppContext();
  const { assignments, addAssignment, updateAssignmentStatus, removeAssignment } = useAssignments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subjectId: '',
    dueDate: '',
  });

  // Estados para os filtros
  const [filterType, setFilterType] = useState<FilterType>('monthYear');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const months = [
    { value: '0', label: 'Janeiro' },
    { value: '1', label: 'Fevereiro' },
    { value: '2', label: 'Março' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Maio' },
    { value: '5', label: 'Junho' },
    { value: '6', label: 'Julho' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Setembro' },
    { value: '9', label: 'Outubro' },
    { value: '10', label: 'Novembro' },
    { value: '11', label: 'Dezembro' },
  ];

  const availableYears = useMemo(() => {
    const years = [...occurrences, ...assignments].map(item => {
      const dateStr = 'date' in item ? item.date : item.dueDate;
      return new Date(dateStr).getFullYear().toString();
    });
    const currentYear = new Date().getFullYear().toString();
    const uniqueYears = Array.from(new Set([...years, currentYear])).sort((a, b) => b.localeCompare(a));
    return uniqueYears;
  }, [occurrences, assignments]);

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedMonth(new Date().getMonth().toString());
    setSelectedYear(new Date().getFullYear().toString());
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter(task => {
      const taskDate = new Date(task.dueDate);

      if (filterType === 'monthYear') {
        const taskMonth = taskDate.getMonth().toString();
        const taskYear = taskDate.getFullYear().toString();
        return taskMonth === selectedMonth && taskYear === selectedYear;
      } else {
        if (!startDate && !endDate) return true;
        
        const start = startDate ? new Date(startDate) : new Date('2000-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-01-01');

        if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
          return taskDate >= start;
        }
        
        end.setHours(23, 59, 59, 999);
        return taskDate >= start && taskDate <= end;
      }
    });
  }, [assignments, filterType, startDate, endDate, selectedMonth, selectedYear]);

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

    filteredAssignments.forEach(assignment => {
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
  }, [filteredAssignments, now]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getDaysDiff = (dateString: string) => {
    const date = new Date(dateString);
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isInvalidRange = filterType === 'period' && startDate && endDate && new Date(endDate) < new Date(startDate);

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

      {/* Filtros */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Filter size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              Filtrar Tarefas
            </h3>
          </div>
          
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col min-w-[140px]">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Tipo de Filtro</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
                className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="monthYear">📅 Mês e Ano</option>
                <option value="period">🗓️ Período</option>
              </select>
            </div>

            {filterType === 'monthYear' ? (
              <>
                <div className="flex flex-col min-w-[140px]">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Mês</label>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    {months.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col min-w-[100px]">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Ano</label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">De</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Até</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`text-sm font-bold p-2.5 rounded-xl border outline-none focus:ring-4 transition-all ${isInvalidRange ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 focus:ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-700 dark:text-slate-200'}`}
                  />
                </div>
              </>
            )}

            <button 
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-black text-slate-400 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors group mb-[2px]"
              title="Limpar Filtros"
            >
              <RotateCcw size={18} className="group-hover:-rotate-45 transition-transform" />
              LIMPAR
            </button>
          </div>
        </div>
        {isInvalidRange && (
          <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-center gap-3 text-rose-600 dark:text-rose-400 animate-in slide-in-from-top-2">
            <AlertCircle size={18} />
            <p className="text-xs font-bold">Atenção: A data final não pode ser menor que a data inicial.</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Atrasadas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-4 border-b border-rose-100 dark:border-rose-900/30 pb-2">
            <AlertCircle size={20} />
            <h2 className="font-bold">Atrasadas ({categorizedAssignments.late.length})</h2>
          </div>
          {categorizedAssignments.late.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa atrasada neste período.</p>
          ) : (
            categorizedAssignments.late.map(task => {
              const diffDays = getDaysDiff(task.dueDate);
              return (
                <Card key={task.id} className="p-4 border-l-4 border-rose-500 bg-rose-50/30 dark:bg-rose-950/10 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2">{task.title}</h3>
                    <button onClick={() => updateAssignmentStatus(task.id, 'completed')} className="text-slate-400 hover:text-emerald-500 transition-colors" title="Marcar como concluída">
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                  {task.subjectName && <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{task.subjectName}</p>}
                  {task.description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{task.description}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                        <Calendar size={14} />
                        <span>{formatDate(task.dueDate)}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-rose-500">Atrasado há {diffDays} {diffDays === 1 ? 'dia' : 'dias'}</span>
                    </div>
                    <button onClick={() => removeAssignment(task.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Pendentes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-500 mb-4 border-b border-amber-100 dark:border-amber-900/30 pb-2">
            <Clock size={20} />
            <h2 className="font-bold">Pendentes ({categorizedAssignments.pending.length})</h2>
          </div>
          {categorizedAssignments.pending.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa pendente neste período.</p>
          ) : (
            categorizedAssignments.pending.map(task => {
              const date = new Date(task.dueDate);
              const diffTime = date.getTime() - now.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const isUrgent = diffDays <= 2;
              return (
                <Card key={task.id} className={`p-4 border-l-4 transition-all hover:shadow-md ${isUrgent ? 'border-amber-500' : 'border-blue-500'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-2">{task.title}</h3>
                    <button onClick={() => updateAssignmentStatus(task.id, 'completed')} className="text-slate-400 hover:text-emerald-500 transition-colors" title="Marcar como concluída">
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                  {task.subjectName && <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{task.subjectName}</p>}
                  {task.description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{task.description}</p>}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-1">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${isUrgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        <Calendar size={14} />
                        <span>{formatDate(task.dueDate)}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase ${isUrgent ? 'text-amber-500' : 'text-slate-400'}`}>
                        {diffDays === 0 ? 'Hoje' : diffDays === 1 ? 'Amanhã' : `Faltam ${diffDays} dias`}
                      </span>
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
            <p className="text-sm text-slate-500 dark:text-slate-500 italic">Nenhuma tarefa concluída neste período.</p>
          ) : (
            categorizedAssignments.completed.map(task => (
              <Card key={task.id} className="p-4 border-l-4 border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 opacity-75 transition-all hover:shadow-md">
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
