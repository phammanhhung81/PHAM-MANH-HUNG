
export interface KPIData {
  value: string;
  label: string;
  icon: 'book' | 'type' | 'message' | 'clock';
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  status: 'doing' | 'done' | 'review' | 'not-started';
  lastStudied: string;
  progress: number;
}

export interface ScheduleItem {
  id: string;
  time: string;
  task: string;
  isAI?: boolean;
  completed: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Vocabulary {
  id: string;
  char: string;
  pinyin: string;
  meaning: string;
  level: string;
  example?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
}

export type LessonTab = 'vocab' | 'listening' | 'speaking' | 'writing';
