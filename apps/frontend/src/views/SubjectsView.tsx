import { useState } from 'react';
import { Plus, Trash2, X, BookOpen, GraduationCap, Clock, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

interface SubjectFormInputs {
  name: string;
  teacher?: string;
  semester?: string;
}

interface GradeFormInputs {
  grade: number;
}

export const SubjectsView = () => {
  const { 
    subjects, removeSubject, 
    updateAbsences, calculateAverage,
    addSubject, addGrade
  } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormInputs>();
  const gradeForm = useForm<GradeFormInputs>();

  const onSubmitSubject = async (data: SubjectFormInputs) => {
    try {
      setIsSubmitting(true);
      await addSubject(data);
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar matéria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitGrade = async (data: GradeFormInputs) => {
    if (!selectedSubjectId) return;
    try {
      setIsSubmitting(true);
      // Converte para número caso venha como string do input
      const gradeValue = Number(data.grade);
      await addGrade(selectedSubjectId, gradeValue);
      setIsGradeModalOpen(false);
      gradeForm.reset();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar nota.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openGradeModal = (id: string) => {
    setSelectedSubjectId(id);
    setIsGradeModalOpen(true);
  };

  const handleUpdateAbsences = async (id: string, delta: number) => {
    try {
      await updateAbsences(id, delta);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveSubject = async (id: string) => {
    if (confirm("Deseja realmente remover esta matéria?")) {
      try {
        await removeSubject(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Minhas Matérias</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Gerencie seu desempenho acadêmico por disciplina</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="py-3 px-6 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/40 scale-105 hover:scale-110 active:scale-95 transition-all">
          <Plus size={22} /> Adicionar Matéria
        </Button>
      </div>

      {/* Modal Fixo de Adicionar Matéria */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          ></div>
          
          <Card className="relative w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
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
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmitSubject)} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nome da Matéria</label>
                <input 
                  {...register("name", { required: "O nome da matéria é obrigatório" })}
                  disabled={isSubmitting}
                  placeholder="Ex: Cálculo Diferencial I"
                  className={`w-full p-3 border rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all ${errors.name ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-indigo-500'}`}
                />
                {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Professor(a)</label>
                  <div className="relative">
                    <GraduationCap size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      {...register("teacher")}
                      disabled={isSubmitting}
                      placeholder="Docente"
                      className="w-full p-3 pl-10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Semestre</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      {...register("semester")}
                      disabled={isSubmitting}
                      placeholder="2024.1"
                      className="w-full p-3 pl-10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
                  {isSubmitting ? 'Salvando...' : 'Salvar Matéria'}
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
            onClick={() => !isSubmitting && setIsGradeModalOpen(false)}
          ></div>
          
          <Card className="relative w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-600 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Plus size={20} />
                <h3 className="font-bold">Lançar Nova Nota</h3>
              </div>
              <button onClick={() => !isSubmitting && setIsGradeModalOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={gradeForm.handleSubmit(onSubmitGrade)} className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center block">
                  Valor da Avaliação (0 a 10)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  autoFocus
                  disabled={isSubmitting}
                  {...gradeForm.register("grade", { 
                    required: "Informe o valor",
                    min: { value: 0, message: "Mínimo 0" },
                    max: { value: 10, message: "Máximo 10" }
                  })}
                  className={`w-full p-4 text-2xl font-black text-center border rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all ${gradeForm.formState.errors.grade ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:border-emerald-500'}`}
                />
                {gradeForm.formState.errors.grade && (
                  <p className="text-xs text-rose-500 font-bold text-center">{gradeForm.formState.errors.grade.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsGradeModalOpen(false)} disabled={isSubmitting} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-none">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Salvar Nota'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {subjects.length > 0 ? subjects.map(sub => (
          <Card key={sub.id} className="p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{sub.name}</h3>
                {sub.teacher && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Prof. {sub.teacher}</p>}
              </div>
              <button onClick={() => handleRemoveSubject(sub.id)} className="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Notas</span>
                  <button 
                    onClick={() => openGradeModal(sub.id)} 
                    className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-md font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sub.grades.length > 0 ? sub.grades.map((g, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {g.toFixed(1)}
                    </span>
                  )) : <span className="text-xs text-slate-400 dark:text-slate-600 italic">Nenhuma nota registrada</span>}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase">Faltas</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => handleUpdateAbsences(sub.id, -1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">-</button>
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{sub.absences}h</span>
                    <button onClick={() => handleUpdateAbsences(sub.id, 1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase">Média</p>
                  <p className={`text-2xl font-black ${parseFloat(calculateAverage(sub.grades)) < 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {calculateAverage(sub.grades)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )) : (
          <Card className="col-span-full py-20 flex flex-col items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent shadow-none">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-3xl flex items-center justify-center mb-6 animate-bounce duration-[3000ms]">
              <BookOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">Nenhuma matéria cadastrada</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8 px-4 text-sm font-medium">
              Comece adicionando as disciplinas que você está cursando neste semestre para acompanhar seu desempenho.
            </p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" className="gap-2 border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <Plus size={18} /> Adicionar minha primeira matéria
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
