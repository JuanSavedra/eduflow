import { TrendingUp, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

export const DashboardView = () => {
  const { globalAverage, totalAbsences, subjects, occurrences, calculateAverage, isDarkMode } = useAppContext();

  // Dados para o Gráfico de Radar (RPG Stats)
  const radarData = subjects.map(sub => ({
    subject: sub.name,
    nota: parseFloat(calculateAverage(sub.grades)),
    fullMark: 10,
  }));

  // Dados para o Gráfico de Pizza (Ocorrências)
  const occurrenceStats = occurrences.reduce((acc: Record<string, number>, occ) => {
    acc[occ.type] = (acc[occ.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(occurrenceStats).map(type => ({
    name: type,
    value: occurrenceStats[type],
  }));

  const COLORS = isDarkMode 
    ? ['#fbbf24', '#34d399', '#818cf8', '#fb7185'] 
    : ['#f59e0b', '#10b981', '#6366f1', '#f43f5e'];

  // Dados para o Gráfico de Barras (Faltas por Mês - Simulado)
  const monthlyAbsencesData = [
    { name: 'Jan', faltas: 0 },
    { name: 'Fev', faltas: 0 },
    { name: 'Mar', faltas: 0 },
    { name: 'Abr', faltas: 0 },
    { name: 'Mai', faltas: 0 },
    { name: 'Jun', faltas: 0 },
    { name: 'Jul', faltas: 0 },
    { name: 'Ago', faltas: 0 },
    { name: 'Set', faltas: 0 },
    { name: 'Out', faltas: 0 },
    { name: 'Nov', faltas: 0 },
    { name: 'Dez', faltas: 0 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <Card className="p-6 border-l-4 border-amber-500 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Faltas Totais</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalAbsences}h</h3>
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
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Gráfico de Radar - RPG Stats */}
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
        Atributos Acadêmicos
      </h3>
    </div>
    <div className="h-[300px] w-full">
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
          <div className="h-[300px] w-full">
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
          </div>
        </Card>

        {/* Gráfico de Barras - Faltas Mensais */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock size={20} className="text-rose-500" />
              Faltas por Período
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Faltas/mês
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAbsencesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: isDarkMode ? '#f1f5f9' : '#1e293b',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Bar 
                  dataKey="faltas" 
                  fill="#f43f5e" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
