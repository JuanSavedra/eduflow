export interface Schedule {
  dayOfWeek: number; // 0 for Sunday, 1 for Monday, etc.
  startTime: string; // 'HH:MM'
  endTime: string; // 'HH:MM'
  room: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  semester?: string;
  grades: number[];
  absences: number;
  schedules: Schedule[];
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

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  subjectName?: string;
  dueDate: string;
  status: 'pending' | 'completed';
}
