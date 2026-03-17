import React from 'react';
import { Plus, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

export const OccurrencesView: React.FC = () => {
  const { occurrences } = useAppContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <p className="text-slate-500">Histórico de observações e comportamentos acadêmicos.</p>
        <Button variant="outline"><Plus size={16}/> Nova Ocorrência</Button>
      </div>
      <div className="space-y-4">
      {occurrences.map(occ => (
        <Card key={occ.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${occ.type === 'Aviso' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{occ.title}</h4>
              <p className="text-sm text-slate-500">Referente a disciplina: <span className="text-indigo-600 font-medium">{occ.subject}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Data do Registro</p>
              <p className="text-sm font-medium text-slate-600">{occ.date}</p>
            </div>
            <ChevronRight className="text-slate-300 hidden md:block" />
          </div>
        </Card>
      ))}
      </div>
    </div>
  );
};
