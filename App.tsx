
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { LessonDetail } from './pages/LessonDetail';
import { LessonsPage } from './pages/LessonsPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { WritingPage } from './pages/WritingPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { GenericPage } from './pages/GenericPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppProvider, useApp } from './context/AppContext';
import { ChatBot } from './components/ChatBot';
import { Map, PieChart } from 'lucide-react';

const EntryGuard: React.FC = () => {
  const { isUnlocked, setIsUnlocked, setIsFullscreen } = useApp();

  if (isUnlocked) return null;

  const handleAllow = () => {
    // Request fullscreen automatically on unlock
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed or denied:", err);
      });
    }
    setIsFullscreen(true);
    setIsUnlocked(true);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-slate-50/60 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100 w-full max-w-lg p-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
        
        {/* Header Section - Updated Typography */}
        <div className="space-y-2 mb-10">
          <h2 
            className="text-[22px] font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent uppercase tracking-tight leading-tight"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            CHÀO MỪNG BẠN VÀO<br/>HỌC TIẾNG TRUNG
          </h2>
          <p className="text-blue-600 font-bold text-sm">
            Bản quyền ứng dụng phát triển bởi Phạm Mạnh Hùng
          </p>
        </div>

        <div className="w-full h-px bg-slate-100 mb-10"></div>

        {/* Feature List Section - Updated Typography */}
        <div className="space-y-4 mb-14">
          <h3 
            className="text-[13px] font-bold text-purple-600 uppercase tracking-tighter"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            ĐA DẠNG BÀI HỌC & SÁCH THAM KHẢO
          </h3>
          <h3 
            className="text-[13px] font-bold text-purple-600 uppercase tracking-tighter"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            TỪ VỰNG & FLASHCARD & BỘ THỦ
          </h3>
        </div>

        {/* Main Action Button - Updated Typography */}
        <button 
          onClick={handleAllow}
          className="px-16 py-5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-[2rem] text-[18px] font-bold uppercase tracking-[0.1em] transition-all shadow-2xl shadow-purple-200 active:scale-95 mb-14"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          BẮT ĐẦU HỌC
        </button>

        {/* Footer Note */}
        <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.15em]">
          ỨNG DỤNG TỐI ƯU CHO CHẾ ĐỘ TOÀN MÀN HÌNH
        </p>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isSidebarLocked } = useApp();

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
        <EntryGuard />
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Wrapper - Dynamic Margin based on Sidebar state */}
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarLocked ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Sticky Header */}
          <Header />

          {/* Scrollable Content Area */}
          <main className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/learning-path" element={<GenericPage title="Lộ trình học" icon={Map} description="Cá nhân hóa lộ trình học tập dựa trên mục tiêu của bạn." />} />
              <Route path="/reports" element={<GenericPage title="Báo cáo" icon={PieChart} description="Phân tích chi tiết điểm mạnh, điểm yếu và tiến độ." />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        
        {/* Global AI ChatBot */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
