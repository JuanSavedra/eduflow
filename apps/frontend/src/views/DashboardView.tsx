import { useState, useMemo } from 'react';
import { TrendingUp, Clock, BookOpen, AlertCircle, RotateCcw, Filter, ListTodo, Calendar } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { useAssignments } from '../context/AssignmentsContext';

type FilterType = 'monthYear' | 'period';

export const DashboardView = () => {
  const { globalAverage, subjects, occurrences, calculateAverage, isDarkMode } = useAppContext();
  const { assignments } = useAssignments();

  // Next Class Logic
  const nextClass = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentMinutesTotal = currentHour * 60 + currentMinute;

    let upcomingClass = null;
    let minMinutesDiff = Infinity;

    subjects.forEach(subject => {
      if (subject.schedules) {
        subject.schedules.forEach(schedule => {
          if (schedule.dayOfWeek === currentDay) {
            const [startH, startM] = schedule.startTime.split(':').map(Number);
            const startMinutesTotal = startH * 60 + startM;
            
            const diff = startMinutesTotal - currentMinutesTotal;
            
            // If class is today and hasn't started yet (or started within the last 15 mins but mostly we care about upcoming)
            if (diff > -15 && diff < minMinutesDiff) {
              minMinutesDiff = diff;
              upcomingClass = {
                subjectName: subject.name,
                room: schedule.room,
                startTime: schedule.startTime,
                diff,
              };
            }
          }
        });
      }
    });

    return upcomingClass as { subjectName: string; room: string; startTime: string; diff: number } | null;
  }, [subjects]);

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

  // Extrair anos únicos das ocorrências para o dropdown
  const availableYears = useMemo(() => {
    const years = occurrences.map(occ => new Date(occ.date).getFullYear().toString());
    const currentYear = new Date().getFullYear().toString();
    const uniqueYears = Array.from(new Set([...years, currentYear])).sort((a, b) => b.localeCompare(a));
    return uniqueYears;
  }, [occurrences]);

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedMonth(new Date().getMonth().toString());
    setSelectedYear(new Date().getFullYear().toString());
  };

  // Ocorrências filtradas pelo período ou mês/ano selecionado
  const filteredOccurrences = useMemo(() => {
    return occurrences.filter(occ => {
      const occDate = new Date(occ.date);

      if (filterType === 'monthYear') {
        const occMonth = occDate.getMonth().toString();
        const occYear = occDate.getFullYear().toString();
        return occMonth === selectedMonth && occYear === selectedYear;
      } else {
        if (!startDate && !endDate) return true;
        
        const start = startDate ? new Date(startDate) : new Date('2000-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-01-01');

        // Validação: se a data final for menor que a inicial, ignoramos o filtro final
        if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
          return occDate >= start;
        }
        
        end.setHours(23, 59, 59, 999);
        return occDate >= start && occDate <= end;
      }
    });
  }, [occurrences, filterType, startDate, endDate, selectedMonth, selectedYear]);

  // Dados para o Gráfico de Radar (RPG Stats)
  const radarData = subjects.map(sub => ({
    subject: sub.name,
    nota: parseFloat(calculateAverage(sub.grades)),
    fullMark: 10,
  }));

  // Dados para o Gráfico de Pizza (Ocorrências Gerais)
  const occurrenceStats = occurrences.reduce((acc: Record<string, number>, occ) => {
    acc[occ.category] = (acc[occ.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(occurrenceStats).map(type => ({
    name: type,
    value: occurrenceStats[type],
  }));

  const COLORS = isDarkMode 
    ? ['#fbbf24', '#34d399', '#818cf8', '#fb7185'] 
    : ['#f59e0b', '#10b981', '#6366f1', '#f43f5e'];

  // Dados reais para o Gráfico de Barras agrupado por Categoria
  const barChartData = useMemo(() => {
    const categories = ['Falta', 'Atraso', 'Advertência', 'Suspensão'];
    const counts = filteredOccurrences.reduce((acc, occ) => {
      if (categories.includes(occ.category)) {
        acc[occ.category] = (acc[occ.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return categories.map(cat => ({
      name: cat,
      quantidade: counts[cat] || 0,
    }));
  }, [filteredOccurrences]);

  const isInvalidRange = filterType === 'period' && startDate && endDate && new Date(endDate) < new Date(startDate);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {nextClass && (
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl p-4 text-white shadow-lg flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-lg backdrop-blur-sm">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-100 font-medium">Sua próxima aula hoje</p>
              <h3 className="text-lg font-bold">
                {nextClass.subjectName} {nextClass.room ? `• Sala ${nextClass.room}` : ''}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black">
              {nextClass.diff <= 0 ? 'Agora!' : nextClass.diff < 60 ? `em ${nextClass.diff} min` : `às ${nextClass.startTime}`}
            </p>
          </div>
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-l-4 border-indigo-500 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Média Global</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{globalAverage}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-emerald-500 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Disciplinas</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{subjects.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Widget Próximas Entregas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3 tracking-tight">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
              <ListTodo size={22} />
            </div>
            Próximas Entregas
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments
            .filter(a => a.status !== 'completed')
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
            .map(task => {
              const dueDate = new Date(task.dueDate);
              const now = new Date();
              const isLate = dueDate < now;
              const diffTime = Math.abs(dueDate.getTime() - now.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              const isUrgent = !isLate && diffDays <= 2;
              
              return (
                <div key={task.id} className={`p-4 rounded-xl border-2 transition-all ${
                  isLate 
                    ? 'border-rose-200 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-950/10' 
                    : isUrgent 
                      ? 'border-amber-200 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10' 
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20'
                }`}>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 line-clamp-1">{task.title}</h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{task.subjectName}</p>
                  <div className="flex items-center justify-between">
                    <div className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                      isLate 
                        ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400' 
                        : isUrgent 
                          ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {isLate 
                        ? `Atrasado há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}` 
                        : diffDays === 0 
                          ? 'Hoje' 
                          : diffDays === 1 
                            ? 'Amanhã' 
                            : `Faltam ${diffDays} dias`}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Calendar size={12} />
                      {dueDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          {assignments.filter(a => a.status !== 'completed').length === 0 && (
            <div className="col-span-full py-8 text-center">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-300 dark:text-slate-700">
                <ListTodo size={24} />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-500 italic">
                Nenhuma entrega próxima. Você está em dia!
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Radar - RPG Stats */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
              Atributos Acadêmicos
            </h3>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            {subjects.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke={isDarkMode ? "#334155" : "#e2e8f0"} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <Radar
                    name="Média"
                    dataKey="nota"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.6}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#1e293b',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-700">
                  <TrendingUp size={32} />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 italic">
                  Adicione matérias para visualizar o radar de desempenho acadêmico.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Gráfico de Pizza - Ocorrências */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Distribuição de Ocorrências
            </h3>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            {occurrences.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                      color: isDarkMode ? '#f1f5f9' : '#1e293b',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center px-6">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-700">
                  <AlertCircle size={32} />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 italic">
                  Nenhuma ocorrência registrada para gerar este gráfico.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Gráfico de Barras - Ocorrências por Período e Categoria */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-500">
                <Clock size={22} />
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Ocorrências por Período
              </h3>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap items-end gap-4">
              {/* Dropdown de Tipo de Filtro */}
              <div className="flex flex-col min-w-[140px]">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-1.5">
                  <Filter size={10} /> Tipo de Filtro
                </label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all cursor-pointer"
                >
                  <option value="monthYear">📅 Mês e Ano</option>
                  <option value="period">🗓️ Período</option>
                </select>
              </div>

              {filterType === 'monthYear' ? (
                <>
                  {/* Dropdown de Mês */}
                  <div className="flex flex-col min-w-[140px]">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Mês</label>
                    <select 
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all cursor-pointer"
                    >
                      {months.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown de Ano */}
                  <div className="flex flex-col min-w-[100px]">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Ano</label>
                    <select 
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all cursor-pointer"
                    >
                      {availableYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {/* Data Inicial */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">De</label>
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="text-sm font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                    />
                  </div>

                  {/* Data Final */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 px-1">Até</label>
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`text-sm font-bold p-2.5 rounded-xl border outline-none focus:ring-4 transition-all ${isInvalidRange ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 focus:ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-rose-500/10 focus:border-rose-500 text-slate-700 dark:text-slate-200'}`}
                    />
                  </div>
                </>
              )}

              {/* Botão Limpar */}
              <button 
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-black text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors group mb-[2px]"
                title="Limpar Filtros"
              >
                <RotateCcw size={18} className="group-hover:-rotate-45 transition-transform" />
                LIMPAR
              </button>
            </div>
          </div>

          {isInvalidRange && (
            <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl flex items-center gap-3 text-rose-600 dark:text-rose-400 animate-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p className="text-xs font-bold">Atenção: A data final não pode ser menor que a data inicial.</p>
            </div>
          )}
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  allowDecimals={false}
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f1f5f9' : '#1e293b',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' 
                  }}
                  formatter={(value: number) => [value, 'Ocorrências']}
                />
                <Bar 
                  dataKey="quantidade" 
                  radius={[6, 6, 0, 0]} 
                  barSize={48}
                >
                  {barChartData.map((entry, index) => {
                    const barColors: Record<string, string> = {
                      'Falta': '#f59e0b',
                      'Atraso': '#f97316',
                      'Advertência': '#f43f5e',
                      'Suspensão': isDarkMode ? '#94a3b8' : '#334155'
                    };
                    return <Cell key={`cell-${index}`} fill={barColors[entry.name] || '#6366f1'} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
