import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lesson, ScheduleItem, KPIData, Vocabulary } from '../types';

interface WordProgress {
  box: number; // Leitner box: 0 to 5
  nextReview: number; // Timestamp
}

interface AppContextType {
  lessons: Lesson[];
  schedule: ScheduleItem[];
  kpis: KPIData[];
  searchQuery: string;
  customVocabulary: Vocabulary[];
  vocabProgress: Record<string, WordProgress>;
  isUnlocked: boolean;
  isFullscreen: boolean;
  isSidebarLocked: boolean;
  setIsUnlocked: (val: boolean) => void;
  setIsFullscreen: (val: boolean) => void;
  setIsSidebarLocked: (val: boolean) => void;
  setSearchQuery: (query: string) => void;
  updateLessonProgress: (id: string, progress: number) => void;
  toggleScheduleItem: (id: string) => void;
  addScheduleItem: (time: string, task: string) => void;
  deleteScheduleItem: (id: string) => void;
  addLesson: (lesson: Lesson) => void;
  addVocabulary: (vocab: Vocabulary) => void;
  updateVocabSRS: (id: string, known: boolean) => void;
  saveConfig: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_LESSONS: Lesson[] = [
  {
    id: 'pinyin-1',
    title: 'Bài 1: Nhập môn Pinyin',
    subtitle: 'Nguyên âm, Phụ âm & Quy tắc biến điệu',
    status: 'done',
    lastStudied: 'Hôm nay',
    progress: 100,
  },
  {
    id: 'writing-1',
    title: 'Bài 2: Luyện viết chữ Hán',
    subtitle: 'Luyện viết chữ Hán theo 7 Quy tắc cơ bản',
    status: 'done',
    lastStudied: 'Hôm nay',
    progress: 100,
  },
  {
    id: 'fan-yuye',
    title: 'Giáo án 范玉叶',
    subtitle: 'Giáo trình tích hợp 34 buổi học từ cơ bản',
    status: 'doing',
    lastStudied: 'Hôm nay',
    progress: 45,
  },
  {
    id: 'self-study-sentence-1',
    title: 'Tự học ghép từ - Tập 1',
    subtitle: 'Tự học ghép các từ thành câu (117 trang)',
    status: 'not-started',
    lastStudied: 'Chưa học',
    progress: 0,
  },
  {
    id: 'self-study-sentence-2',
    title: 'Tự học ghép từ - Tập 2',
    subtitle: 'Tự học ghép các từ thành câu nâng cao',
    status: 'not-started',
    lastStudied: 'Chưa học',
    progress: 0,
  },
  {
    id: 'self-study-sentence-3',
    title: 'Tự Học Ghép từ - Tập 3',
    subtitle: 'Ghép từ đơn giản - Tạo câu dễ dàng (HSK 4)',
    status: 'not-started',
    lastStudied: 'Chưa học',
    progress: 0,
  },
  {
    id: 'hsk1-1',
    title: 'HSK 1: Bài 1',
    subtitle: 'Chào hỏi: 你好',
    status: 'done',
    lastStudied: 'Hôm qua',
    progress: 100,
  },
  {
    id: 'hsk1-2',
    title: 'HSK 1: Bài 2',
    subtitle: 'Cảm ơn và Tạm biệt: 谢谢，再见',
    status: 'review',
    lastStudied: '2 ngày trước',
    progress: 70,
  },
  {
    id: 'hsk1-3',
    title: 'HSK 1: Bài 3',
    subtitle: 'Bạn tên là gì: 你叫什么名字',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk2-1',
    title: 'HSK 2: Bài 1',
    subtitle: 'Thời tiết: 今天天气怎么样',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk2-2',
    title: 'HSK 2: Bài 2',
    subtitle: 'Sở thích: 你的爱好是什么',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk2-3',
    title: 'HSK 2: Bài 3',
    subtitle: 'Ăn uống: 你想吃什么',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk3-1',
    title: 'HSK 3: Bài 1',
    subtitle: 'Sức khỏe: 身体怎么样',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk3-2',
    title: 'HSK 3: Bài 2',
    subtitle: 'Du lịch: 打算去哪儿旅游',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
  {
    id: 'hsk3-3',
    title: 'HSK 3: Bài 3',
    subtitle: 'Công việc: 你的工作忙吗',
    status: 'not-started',
    lastStudied: '-',
    progress: 0,
  },
];

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  { id: '1', time: '05:30', task: 'Ôn từ cũ', completed: true },
  { id: '2', time: '12:00', task: 'Nghe hội thoại', completed: false },
  { id: '3', time: '21:00', task: 'Viết chữ Hán', completed: false },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionTime, setSessionTime] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarLocked, setIsSidebarLocked] = useState(true);
  
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('user_lessons');
    return saved ? JSON.parse(saved) : DEFAULT_LESSONS;
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('user_schedule');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
  });

  const [customVocabulary, setCustomVocabulary] = useState<Vocabulary[]>(() => {
    const saved = localStorage.getItem('user_custom_vocab');
    return saved ? JSON.parse(saved) : [];
  });

  const [vocabProgress, setVocabProgress] = useState<Record<string, WordProgress>>(() => {
    const saved = localStorage.getItem('hsk_vocab_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatSessionTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
  };

  const kpis: KPIData[] = [
    { value: '12/100', label: 'SÁCH ĐÃ ĐỌC XONG', icon: 'book' },
    { value: '300/3266', label: 'Chữ Hán đã học', icon: 'type' },
    { value: '260/3266', label: 'Câu đã nghe – nói', icon: 'message' },
    { value: formatSessionTime(sessionTime), label: 'Thời gian học hiện tại', icon: 'clock' },
  ];

  const saveConfig = () => {
    localStorage.setItem('user_lessons', JSON.stringify(lessons));
    localStorage.setItem('user_schedule', JSON.stringify(schedule));
    localStorage.setItem('user_custom_vocab', JSON.stringify(customVocabulary));
    localStorage.setItem('hsk_vocab_progress', JSON.stringify(vocabProgress));
  };

  useEffect(() => {
    saveConfig();
  }, [lessons, schedule, customVocabulary, vocabProgress]);

  const updateLessonProgress = (id: string, progress: number) => {
    setLessons(prev => prev.map(l => {
      if (l.id === id) {
        // Fixed: Use the correct variable name 'progress' instead of undefined 'newProgress'
        const updated = { ...l, progress: progress };
        // Fixed: Use the correct variable name 'progress' instead of undefined 'newProgress'
        if (progress === 100) updated.status = 'done';
        // Fixed: Use the correct variable name 'progress' instead of undefined 'newProgress'
        else if (progress > 0) updated.status = 'doing';
        return updated;
      }
      return l;
    }));
  };

  const updateVocabSRS = (id: string, known: boolean) => {
    const intervals = [0, 10, 1440, 4320, 10080, 20160];
    const current = vocabProgress[id] || { box: 0, nextReview: Date.now() };

    let nextBox;
    let nextReview;

    if (known) {
      nextBox = Math.min(current.box + 1, intervals.length - 1);
      nextReview = Date.now() + intervals[nextBox] * 60 * 1000;
    } else {
      nextBox = 0;
      nextReview = Date.now() + 5 * 60 * 1000;
    }

    setVocabProgress(prev => ({
      ...prev,
      [id]: { box: nextBox, nextReview }
    }));
  };

  const toggleScheduleItem = (id: string) => {
    setSchedule(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addScheduleItem = (time: string, task: string) => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time,
      task,
      completed: false
    };
    setSchedule(prev => [...prev, newItem].sort((a, b) => a.time.localeCompare(b.time)));
  };

  const deleteScheduleItem = (id: string) => {
    setSchedule(prev => prev.filter(item => item.id !== id));
  };

  const addLesson = (newLesson: Lesson) => {
    setLessons(prev => [newLesson, ...prev]);
  };

  const addVocabulary = (newVocab: Vocabulary) => {
    setCustomVocabulary(prev => [newVocab, ...prev]);
  };

  const resetAllData = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình học tập không?")) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <AppContext.Provider value={{ 
      lessons, 
      schedule, 
      kpis, 
      searchQuery, 
      customVocabulary,
      vocabProgress,
      isUnlocked,
      isFullscreen,
      isSidebarLocked,
      setIsUnlocked,
      setIsFullscreen,
      setIsSidebarLocked,
      setSearchQuery, 
      updateLessonProgress, 
      toggleScheduleItem,
      addScheduleItem,
      deleteScheduleItem,
      addLesson,
      addVocabulary,
      updateVocabSRS,
      saveConfig,
      resetAllData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};