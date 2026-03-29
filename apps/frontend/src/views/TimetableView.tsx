import { useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Schedule } from '../types';

interface ClassSchedule extends Schedule {
  subjectName: string;
  colorClass: string;
}

export const TimetableView = () => {
  const { subjects } = useAppContext();

  const daysOfWeek = [
    { id: 1, name: 'Segunda' },
    { id: 2, name: 'Terça' },
    { id: 3, name: 'Quarta' },
    { id: 4, name: 'Quinta' },
    { id: 5, name: 'Sexta' },
  ];

  // Colors for different subjects to make the grid colorful
  const subjectColors = [
    'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800',
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800',
    'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800',
    'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800',
    'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-800',
    'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-800',
  ];

  // Organize schedules into a matrix [day][array of classes]
  const scheduleMatrix = useMemo(() => {
    const matrix: Record<number, ClassSchedule[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    
    subjects.forEach((subject, subjectIndex) => {
      const colorClass = subjectColors[subjectIndex % subjectColors.length];
      if (subject.schedules) {
        subject.schedules.forEach(schedule => {
          if (matrix[schedule.dayOfWeek]) {
            matrix[schedule.dayOfWeek].push({
              ...schedule,
              subjectName: subject.name,
              colorClass,
            });
          }
        });
      }
    });

    // Sort classes within each day by start time
    Object.keys(matrix).forEach(day => {
      matrix[Number(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return matrix;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects]);

  const hasAnyClass = Object.values(scheduleMatrix).some(dayClasses => dayClasses.length > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
              <CalendarIcon size={24} />
            </div>
            Cronograma Semanal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sua grade de aulas completa.</p>
        </div>
      </div>

      {!hasAnyClass ? (
        <Card className="p-12 text-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent shadow-none">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-700">
            <CalendarIcon size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Seu cronograma está vazio</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Vá até a aba de Matérias e adicione horários às suas disciplinas para visualizá-las aqui.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {daysOfWeek.map(day => (
            <div key={day.id} className="flex flex-col h-full">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-t-xl border-b-2 border-indigo-500 text-center">
                <h3 className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest text-sm">{day.name}</h3>
              </div>
              <div className="flex-1 bg-white dark:bg-slate-900 p-2 rounded-b-xl border border-t-0 border-slate-100 dark:border-slate-800 space-y-2 min-h-[400px]">
                {scheduleMatrix[day.id].length > 0 ? (
                  scheduleMatrix[day.id].map((cls, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg border-l-4 shadow-sm transition-transform hover:scale-[1.02] ${cls.colorClass}`}
                    >
                      <h4 className="font-bold text-sm mb-2 line-clamp-2">{cls.subjectName}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                          <Clock size={12} />
                          <span>{cls.startTime} - {cls.endTime}</span>
                        </div>
                        {cls.room && (
                          <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                            <MapPin size={12} />
                            <span>{cls.room}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center p-6 text-slate-400 dark:text-slate-600 text-sm font-medium italic text-center">
                    Livre
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
