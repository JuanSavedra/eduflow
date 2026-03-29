import { BrainCircuit } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';

export const AIView = () => {
  const { subjects, calculateAverage } = useAppContext();

  // Lógica simples de análise para simular IA
  const needsImprovement = subjects.filter(s => parseFloat(calculateAverage(s.grades)) < 7);

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <Card className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none overflow-hidden relative shadow-xl shadow-indigo-500/20 dark:shadow-none">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <BrainCircuit size={28} />
            </div>
            <h2 className="text-2xl font-bold">EduAI Advisor</h2>
          </div>
          <p className="text-indigo-100 max-w-2xl text-lg font-medium">
            Olá! Eu analisei seus dados acadêmicos recentes. Aqui estão os pontos principais que notei para ajudar no seu sucesso.
          </p>
        </div>
        <div className="absolute top-[-20px] right-[-20px] opacity-10">
          <BrainCircuit size={200} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <span className="p-1 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded">⚠️</span> Foco Acadêmico Necessário
          </h3>
          <div className="space-y-4">
            {needsImprovement.length > 0 ? needsImprovement.map(sub => (
              <div key={sub.id} className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/30">
                <p className="font-bold text-rose-800 dark:text-rose-400">{sub.name}</p>
                <p className="text-sm text-rose-700 dark:text-rose-300/80 mt-1 leading-relaxed">
                  Sua média atual ({calculateAverage(sub.grades)}) está abaixo da meta. 
                  Recomendo revisar o conteúdo da última semana e focar em exercícios práticos.
                </p>
                <Button variant="outline" className="mt-3 text-xs py-1 h-8 bg-white dark:bg-slate-800 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                  Gerar Plano de Estudos
                </Button>
              </div>
            )) : (
              <p className="text-slate-500 dark:text-slate-500 italic text-sm">Excelente! Todas as suas médias estão acima de 7.0.</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-slate-900 dark:bg-black/40 border-none">
        <h3 className="text-lg font-bold mb-4 text-white dark:text-slate-100">Dica Rápida da IA</h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed italic">
          "Olá! Quando você adicionar suas matérias e notas, eu poderei analisar seu desempenho e fornecer dicas personalizadas para ajudar no seu sucesso acadêmico."
        </p>
      </Card>
    </div>
  );
};
