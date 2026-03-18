import React, { useState } from 'react';
import { Plus, Trash2, X, BookOpen, GraduationCap, Clock, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

interface SubjectFormInputs {
  name: string;
  teacher?: string;
  semester?: string;
  targetGrade?: number;
}

interface GradeFormInputs {
  grade: number;
}

export const SubjectsView = () => {
  const { 
    subjects, removeSubject, 
    updateAbsences, calculateAverage 
  } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormInputs>();
  const gradeForm = useForm<GradeFormInputs>();

  const onSubmitSubject = (data: SubjectFormInputs) => {
    console.log("Nova matéria:", data);
    setIsModalOpen(false);
    reset();
  };

  const onSubmitGrade = (data: GradeFormInputs) => {
    console.log(`Nova nota para matéria ${selectedSubjectId}:`, data);
    setIsGradeModalOpen(false);
    gradeForm.reset();
  };

  const openGradeModal = (id: number) => {
    setSelectedSubjectId(id);
    setIsGradeModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Minhas Matérias</h2>
          <p className="text-slate-500 font-medium">Gerencie seu desempenho acadêmico por disciplina</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="py-3 px-6 shadow-indigo-100 shadow-xl scale-105 hover:scale-110 active:scale-95 transition-all">
          <Plus size={22} /> Adicionar Matéria
        </Button>
      </div>

      {/* Modal Fixo de Adicionar Matéria */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <Card className="relative w-full max-w-lg bg-white shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nova Disciplina</h3>
                  <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Cadastro Acadêmico</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitSubject)} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nome da Matéria</label>
                <input 
                  {...register("name", { required: "O nome da matéria é obrigatório" })}
                  placeholder="Ex: Cálculo Diferencial I"
                  className={`w-full p-3 border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.name ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-indigo-500'}`}
                />
                {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Professor(a)</label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      {...register("teacher")}
                      placeholder="Docente"
                      className="w-full p-3 pl-10 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Semestre</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      {...register("semester")}
                      placeholder="2024.1"
                      className="w-full p-3 pl-10 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <Save size={18} /> Salvar Matéria
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal Fixo de Adicionar Nota */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsGradeModalOpen(false)}
          ></div>
          
          <Card className="relative w-full max-w-sm bg-white shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-600 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Plus size={20} />
                <h3 className="font-bold">Lançar Nova Nota</h3>
              </div>
              <button onClick={() => setIsGradeModalOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={gradeForm.handleSubmit(onSubmitGrade)} className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 text-center block">
                  Valor da Avaliação (0 a 10)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  autoFocus
                  {...gradeForm.register("grade", { 
                    required: "Informe o valor",
                    min: { value: 0, message: "Mínimo 0" },
                    max: { value: 10, message: "Máximo 10" }
                  })}
                  className={`w-full p-4 text-2xl font-black text-center border rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${gradeForm.formState.errors.grade ? 'border-rose-500 bg-rose-50' : 'border-slate-200 focus:border-emerald-500'}`}
                />
                {gradeForm.formState.errors.grade && (
                  <p className="text-xs text-rose-500 font-bold text-center">{gradeForm.formState.errors.grade.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsGradeModalOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Salvar Nota
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

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
                  <button onClick={() => openGradeModal(sub.id)} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 transition-colors">
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
