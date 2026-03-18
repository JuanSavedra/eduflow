export type TabType = 'dashboard' | 'subjects' | 'occurrences' | 'ai' | 'login' | 'register' | 'settings';

export interface Subject {
  id: number;
  name: string;
  grades: number[];
  absences: number;
}

export interface Occurrence {
  id: number;
  date: string;
  title: string;
  type: 'Aviso' | 'Elogio';
  subject: string;
}
