export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  semester?: string;
  grades: number[];
  absences: number;
}

export interface Occurrence {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  subjectName: string;
  category: 'Falta' | 'Atraso' | 'Advertência' | 'Suspensão';
  date: string;
}
