import { useState } from 'react';
import { Plus, AlertCircle, ChevronRight, X, Calendar, BookOpen, Save, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import type { Occurrence } from '../types';

interface OccurrenceFormInputs {
  title: string;
  date: string;
  type: 'Aviso' | 'Elogio';
  subject: string;
  description?: string;
}

export const OccurrencesView = () => {
  const { occurrences, subjects } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccurrence, setSelectedOccurrence] = useState<Occurrence | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<OccurrenceFormInputs>({
    defaultValues: {
      type: 'Aviso',
      date: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = (data: OccurrenceFormInputs) => {
    console.log("Nova ocorrência:", data);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Ocorrências Acadêmicas</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Histórico de observações e comportamentos acadêmicos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="py-3 px-6 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/40 scale-105 hover:scale-110 active:scale-95 transition-all">
          <Plus size={22} /> Nova Ocorrência
        </Button>
      </div>

      {/* Modal Fixo de Nova Ocorrência */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <Card className="relative w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-amber-500 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Novo Registro</h3>
                  <p className="text-amber-100 text-xs font-medium uppercase tracking-wider">Histórico do Aluno</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Título da Ocorrência</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    {...register("title", { required: "O título é obrigatório" })}
                    placeholder="Ex: Entrega de trabalho em atraso"
                    className={`w-full p-3 pl-10 border rounded-xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all ${errors.title ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-amber-500'}`}
                  />
                </div>
                {errors.title && <p className="text-xs text-rose-500 font-bold">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Data</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="date"
                      {...register("date", { required: "A data é obrigatória" })}
                      className="w-full p-3 pl-10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tipo</label>
                  <select 
                    {...register("type")}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 outline-none focus:border-amber-500"
                  >
                    <option value="Aviso">⚠️ Aviso / Observação</option>
                    <option value="Elogio">✨ Elogio / Destaque</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Disciplina Relacionada</label>
                <div className="relative">
                  <BookOpen size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <select 
                    {...register("subject", { required: "Selecione a disciplina" })}
                    className={`w-full p-3 pl-10 border rounded-xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 ${errors.subject ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 focus:border-amber-500'}`}
                  >
                    <option value="">Selecione uma matéria...</option>
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.name}>{sub.name}</option>
                    ))}
                  </select>
                </div>
                {errors.subject && <p className="text-xs text-rose-500 font-bold">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Descrição Detalhada (Opcional)</label>
                <textarea 
                  {...register("description")}
                  placeholder="Descreva o ocorrido com mais detalhes..."
                  rows={3}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 outline-none focus:border-amber-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 border-none text-white">
                  <Save size={18} /> Registrar Ocorrência
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal Fixo de Detalhes da Ocorrência */}
      {selectedOccurrence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedOccurrence(null)}
          ></div>
          
          <Card className="relative w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-8 text-white flex justify-between items-start ${selectedOccurrence.type === 'Aviso' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
              <div className="flex gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">{selectedOccurrence.type} Acadêmico</span>
                  <h3 className="text-3xl font-black mt-1 leading-tight">{selectedOccurrence.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOccurrence(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Disciplina Relacionada</p>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-lg">
                    <BookOpen size={20} className="text-indigo-500 dark:text-indigo-400" />
                    {selectedOccurrence.subject}
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Data do Registro</p>
                  <div className="flex items-center gap-2 justify-end text-slate-700 dark:text-slate-200 font-bold text-lg">
                    <Calendar size={20} className="text-indigo-500 dark:text-indigo-400" />
                    {selectedOccurrence.date}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Detalhamento da Ocorrência</p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "Esta é uma descrição detalhada fictícia da ocorrência. O sistema registrou este evento para acompanhamento pedagógico. 
                  Em sistemas reais, aqui constariam os detalhes inseridos pelo corpo docente ou coordenação sobre o evento de {selectedOccurrence.title} 
                  ocorrido na data de {selectedOccurrence.date}."
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => setSelectedOccurrence(null)}
                  className="px-8"
                >
                  Fechar Detalhes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-4">
      {occurrences.length > 0 ? occurrences.map(occ => (
        <Card 
          key={occ.id} 
          onClick={() => setSelectedOccurrence(occ)}
          className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-500 dark:hover:border-l-indigo-400"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl transition-colors ${occ.type === 'Aviso' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/30'}`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{occ.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-500">Referente a disciplina: <span className="text-indigo-600 dark:text-indigo-400 font-medium">{occ.subject}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Data do Registro</p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{occ.date}</p>
            </div>
            <ChevronRight className="text-slate-300 dark:text-slate-700 hidden md:block group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      )) : (
        <Card className="py-20 flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent shadow-none">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 text-amber-500 dark:text-amber-400 rounded-3xl flex items-center justify-center mb-6 animate-bounce duration-[3000ms]">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Sem ocorrências registradas</h3>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8 px-4 text-sm font-medium">
            Aqui aparecerão seus avisos, elogios e observações acadêmicas registradas pelo corpo docente ou coordenação.
          </p>
        </Card>
      )}
      </div>
    </div>
  );
};
