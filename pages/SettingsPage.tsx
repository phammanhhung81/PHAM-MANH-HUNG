import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Save, RefreshCw, Trash2, Database, ShieldCheck, HardDrive, CheckCircle2, AlertTriangle, Monitor, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { saveConfig, lessons, customVocabulary, resetAllData, isFullscreen, setIsFullscreen } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        alert(`Không thể bật chế độ toàn màn hình: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  const handleManualSave = () => {
    setIsSaving(true);
    // Simulate some work
    setTimeout(() => {
        saveConfig();
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const learnedLessonsCount = lessons.filter(l => l.status === 'done').length;
  const inProgressCount = lessons.filter(l => l.status === 'doing').length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-800">Cài đặt hệ thống</h2>
        <p className="text-slate-500">Quản lý cấu hình, lưu trữ và bảo mật dữ liệu học tập.</p>
      </div>

      {/* Main Save Action */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Database className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Lưu cấu hình & Tiến độ</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Toàn bộ bài học đã hoàn thành, từ vựng tùy chỉnh, lịch sử ôn tập và các báo cáo sẽ được lưu trữ an toàn trong trình duyệt của bạn. Bạn có thể yên tâm tải lại trang mà không mất dữ liệu.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button 
                        onClick={handleManualSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                            showSuccess 
                            ? 'bg-green-500 text-white shadow-green-100' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                        }`}
                    >
                        {isSaving ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : showSuccess ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {showSuccess ? 'Đã lưu thành công!' : isSaving ? 'Đang lưu...' : 'Lưu cấu hình ngay'}
                    </button>
                    
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                    >
                        Tải lại ứng dụng
                    </button>
                </div>
            </div>
        </div>
        
        {/* Status Bar */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <HardDrive className="w-3.5 h-3.5" />
                    Trạng thái: <span className="text-green-600 ml-1">Đã đồng bộ</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Bảo mật: <span className="text-blue-600 ml-1">Cục bộ (Local)</span>
                </div>
            </div>
            <div className="text-[10px] text-slate-400 italic">
                Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
            </div>
        </div>
      </div>

      {/* Display Settings Section - Based on Screenshot */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Cài đặt hiển thị</h3>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between py-4 border-b border-dashed border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                        <Monitor className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Khóa toàn màn hình</span>
                </div>
                
                {/* Custom Checkbox Button style from Screenshot */}
                <button 
                    onClick={toggleFullscreen}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isFullscreen 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-100' 
                        : 'bg-white border-slate-200 text-transparent'
                    }`}
                >
                    <Check className={`w-6 h-6 stroke-[3px] ${isFullscreen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} transition-all`} />
                </button>
            </div>
            <p className="mt-6 text-sm text-slate-400 font-medium leading-relaxed text-center">
                Tạo tính năng khóa toàn màn hình, khi tích chọn dấu 'tích xanh' màn hình sẽ luôn hiển thị ở chế độ "Toàn màn hình". Khi bỏ chọn 'Tích xanh' màn hình sẽ có thể thu nhỏ.
            </p>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Tóm tắt tiến độ
            </h4>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Bài học đã xong</span>
                    <span className="font-bold text-slate-800">{learnedLessonsCount} bài</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Đang học dở</span>
                    <span className="font-bold text-slate-800">{inProgressCount} bài</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-50 pt-4">
                    <span className="text-slate-500">Từ vựng tùy chỉnh</span>
                    <span className="font-bold text-blue-600">{customVocabulary.length} từ</span>
                </div>
            </div>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col justify-between">
            <div>
                <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Vùng nguy hiểm
                </h4>
                <p className="text-red-600/80 text-xs leading-relaxed mb-4">
                    Thao tác này sẽ xóa sạch toàn bộ lịch sử học tập, các từ vựng bạn đã thêm và đưa ứng dụng về trạng thái ban đầu.
                </p>
            </div>
            <button 
                onClick={resetAllData}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
            >
                <Trash2 className="w-4 h-4" />
                Xóa toàn bộ dữ liệu
            </button>
        </div>
      </div>

      {/* Advanced Info */}
      <div className="bg-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <Database className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-lg">
            <h3 className="text-xl font-bold mb-3">Lưu trữ trên đám mây (Sắp ra mắt)</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Chúng tôi đang phát triển tính năng đồng bộ hóa tài khoản qua Google Drive hoặc GitHub để bạn có thể học tập trên nhiều thiết bị khác nhau mà không lo mất dữ liệu.
            </p>
            <div className="flex gap-3">
                <span className="px-3 py-1 bg-blue-800 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-700">Beta Testing</span>
                <span className="px-3 py-1 bg-blue-800 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-700">v3.1.0 Roadmap</span>
            </div>
        </div>
      </div>
    </div>
  );
};