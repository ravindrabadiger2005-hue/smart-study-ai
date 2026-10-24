export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Deck {
  id: string;
  code: string;
  title: string;
  description: string;
  cardsCount: number;
  masteryPercent: number;
  badgeBg: string;
  badgeText: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  duration: string;
  title: string;
  subtitle: string;
  status: 'Up Next' | 'Scheduled' | 'Completed';
  icon: string;
  subject: string;
}

export interface StudyModule {
  id: number;
  title: string;
  subject: string;
  estimatedMinutes: number;
  completed: boolean;
  retentionScore?: number;
  targetDate: string;
}

export interface SmartNote {
  id: string;
  title: string;
  subject: string;
  courseCode: string;
  date: string;
  summary: string;
  keyTakeaways: string[];
  examTrap: string;
  flashcards: { front: string; back: string }[];
  cues: string[];
}

export interface UserStats {
  name: string;
  email: string;
  streakDays: number;
  studiedTodayHours: number;
  studiedGoalHours: number;
  velocityScore: number;
  overallGoalPercent: number;
  criticalGapMastery: number;
  activeModulesCompleted: number;
  totalModules: number;
}
