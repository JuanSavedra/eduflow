export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  semester?: string;
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
