import React from 'react';
import { BookOpen, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';

export const DashboardView: React.FC = () => {
  const { globalAverage, totalAbsences, subjects, occurrences, calculateAverage } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-indigo-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Média Global</p>
              <h3 className="text-2xl font-bold text-slate-800">{globalAverage}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-amber-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Faltas Totais</p>
              <h3 className="text-2xl font-bold text-slate-800">{totalAbsences}h</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Disciplinas</p>
              <h3 className="text-2xl font-bold text-slate-800">{subjects.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Desempenho por Matéria</h3>
          <div className="space-y-4">
            {subjects.map(sub => (
              <div key={sub.id} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">{sub.name}</span>
                  <span className="text-indigo-600 font-bold">{calculateAverage(sub.grades)}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${parseFloat(calculateAverage(sub.grades)) < 7 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                    style={{ width: `${parseFloat(calculateAverage(sub.grades)) * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Últimas Ocorrências</h3>
          <div className="space-y-3">
            {occurrences.map(occ => (
              <div key={occ.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${occ.type === 'Aviso' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{occ.title}</p>
                    <p className="text-xs text-slate-500">{occ.subject}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400">{occ.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
