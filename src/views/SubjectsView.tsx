import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

export const SubjectsView: React.FC = () => {
  const { 
    subjects, newSubjectName, setNewSubjectName, 
    addSubject, removeSubject, addGrade, 
    updateAbsences, calculateAverage 
  } = useAppContext();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Nome da nova matéria (Ex: Cálculo, Marketing...)"
          className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
        <Button onClick={addSubject} className="w-full sm:w-auto">
          <Plus size={20} /> Adicionar Matéria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.map(sub => (
          <Card key={sub.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">{sub.name}</h3>
              <button onClick={() => removeSubject(sub.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Notas</span>
                  <button onClick={() => addGrade(sub.id)} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold hover:bg-indigo-100">
                    + Adicionar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sub.grades.length > 0 ? sub.grades.map((g, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 rounded text-sm font-semibold text-slate-600 border border-slate-200">
                      {g.toFixed(1)}
                    </span>
                  )) : <span className="text-xs text-slate-400 italic">Nenhuma nota registrada</span>}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Faltas</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => updateAbsences(sub.id, -1)} className="p-1 hover:bg-slate-100 rounded">-</button>
                    <span className="text-lg font-bold text-slate-700">{sub.absences}h</span>
                    <button onClick={() => updateAbsences(sub.id, 1)} className="p-1 hover:bg-slate-100 rounded">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase">Média</p>
                  <p className={`text-2xl font-black ${parseFloat(calculateAverage(sub.grades)) < 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {calculateAverage(sub.grades)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
