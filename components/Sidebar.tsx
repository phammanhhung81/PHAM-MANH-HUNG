
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Languages, 
  Mic, 
  PenTool, 
  Map, 
  PieChart, 
  Settings,
  Heart,
  MessageCircleCode,
  LogOut,
  LogIn,
  ChevronsLeftRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isSidebarLocked, setIsSidebarLocked } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isZaloModalOpen, setIsZaloModalOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Bài học', path: '/lessons' },
    { icon: Languages, label: 'Từ vựng & chữ Hán', path: '/vocabulary' },
    { icon: Mic, label: 'Nghe – Nói – Phát âm', path: '/speaking' },
    { icon: PenTool, label: 'Viết & Bộ thủ', path: '/writing' },
    { icon: Map, label: 'Lộ trình học', path: '/learning-path' },
    { icon: PieChart, label: 'Báo cáo tiến độ', path: '/reports' },
    { icon: Settings, label: 'Cài đặt', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleDoubleClick = () => {
    setIsSidebarLocked(!isSidebarLocked);
  };

  // The sidebar is visible if it's locked OR if it's hovered
  const isVisible = isSidebarLocked || isHovered;

  return (
    <>
      {/* Invisible sensor zone to trigger hover when sidebar is collapsed */}
      {!isSidebarLocked && (
        <div 
          onMouseEnter={() => setIsHovered(true)}
          className="fixed left-0 top-0 w-4 h-full z-[45]"
        />
      )}

      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handleDoubleClick}
        className={`w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col shadow-2xl fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Right edge resize handle visual cue */}
        <div 
          className="absolute top-0 right-0 w-2 h-full cursor-col-resize flex items-center justify-center group/handle overflow-hidden"
          title="Nhấp đúp để ẩn/hiện cố định"
        >
          <div className="w-1 h-20 bg-white/20 rounded-full group-hover/handle:bg-white/40 transition-colors" />
          <div className="absolute right-0 opacity-0 group-hover/handle:opacity-100 transition-opacity bg-blue-600 p-1 rounded-l-md shadow-lg border border-white/20">
            <ChevronsLeftRight className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="p-6 border-b border-blue-600/50">
          <h1 className="text-2xl font-bold tracking-tight">Học tiếng Trung</h1>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-blue-600 shadow-md text-white font-medium border-l-4 border-white' 
                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Support Buttons Section */}
        <div className="px-4 py-4 space-y-3 border-t border-blue-600/50">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsDonationModalOpen(true); }}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-white/30 bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2 group"
          >
            <Heart className="w-4 h-4 text-red-400 group-hover:scale-125 transition-transform fill-current" />
            <span className="text-xs font-black uppercase tracking-tight">Tham gia ủng hộ App</span>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); setIsZaloModalOpen(true); }}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-blue-300/50 bg-blue-800/30 hover:bg-blue-800/50 transition-all flex items-center justify-center gap-2 group"
          >
            <MessageCircleCode className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black uppercase tracking-tight text-blue-100">Quét Zalo hỗ trợ</span>
          </button>
        </div>

        <div className="p-4 border-t border-blue-600/50 flex flex-col items-center gap-1">
          <p className="text-[10px] text-blue-300 font-medium text-center leading-tight">
            Bản quyền ứng dụng phát triển bởi<br/>Phạm Mạnh Hùng
          </p>
          <span className="text-[9px] text-blue-400/60 uppercase tracking-tighter">v3.0.0 INTERACTIVE</span>
        </div>
      </aside>

      {/* Donation QR Modal (VPBank) */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-gradient-to-br from-emerald-500 via-blue-500 to-blue-700 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-white rounded-[2.3rem] overflow-hidden flex flex-col items-center text-center p-6 md:p-10">
              <p className="text-slate-400 font-bold text-sm mb-4 uppercase tracking-widest leading-relaxed px-4">
                Vui lòng tham gia ủng hộ để tác giả có thêm động lực sáng tạo và nâng cấp app
              </p>
              
              <p className="text-slate-800 font-bold text-lg mb-2">Quét mã để chuyển tiền đến</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-1">PHAM MANH HUNG</h3>
              <div className="text-2xl font-black text-slate-900 mb-6 tracking-widest">8111111368</div>
              
              <div className="w-full h-[2px] border-t-2 border-dashed border-slate-200 relative mb-6">
                <div className="absolute -left-12 -top-2 w-4 h-4 bg-emerald-500 rounded-full"></div>
                <div className="absolute -right-12 -top-2 w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>

              <div className="mb-4 flex flex-col items-center w-full">
                 <div className="flex items-center gap-2 mb-6">
                    <img src="https://img.vietqr.io/image/VPB-8111111368-compact2.jpg" alt="VPBank Logo" className="h-7 object-contain" />
                    <span className="text-2xl font-black text-red-600">VPBank</span>
                 </div>
                 
                 <div className="bg-white p-3 border-4 border-slate-900 rounded-2xl mb-6 shadow-xl">
                    <img 
                      src="https://img.vietqr.io/image/VPB-8111111368-compact2.jpg?accountName=PHAM%20MANH%20HUNG" 
                      alt="Payment QR Code" 
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                 </div>

                 <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center">
                       <span className="text-red-500 font-black text-base italic mr-1">V</span>
                       <span className="text-blue-900 font-black text-sm uppercase tracking-tighter">ietQR</span>
                    </div>
                    <div className="flex items-center">
                       <span className="text-blue-600 font-bold text-sm">napas</span>
                       <span className="text-green-500 font-black text-sm ml-0.5">247</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsDonationModalOpen(false)}
                  className="w-full max-w-[200px] py-3.5 rounded-xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                 >
                    <LogOut className="w-4 h-4" />
                    THOÁT
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Updated Zalo Support Modal (Matches Final Screenshot) */}
      {isZaloModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xs flex flex-col items-center pt-12">
            <div className="absolute top-0 z-10 w-24 h-24 rounded-full border-4 border-white/50 overflow-hidden shadow-2xl bg-white p-0.5">
                <img 
                  src="https://picsum.photos/300/300?random=1" 
                  alt="Phạm Mạnh Hùng" 
                  className="w-full h-full object-cover rounded-full"
                />
            </div>

            <div className="bg-white w-full rounded-3xl shadow-2xl p-6 pt-16 text-center animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-black text-slate-800 mb-0.5">Phạm Mạnh Hùng</h3>
                <p className="text-slate-400 text-sm font-bold mb-6">Danh thiếp Zalo</p>

                <div className="bg-white p-4 rounded-2xl border-2 border-slate-50 shadow-sm mb-6 relative">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://zalo.me/0961313681" 
                      alt="Zalo QR Code" 
                      className="w-full aspect-square object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-[8px] font-black">Zalo</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full items-center">
                    <p className="text-[10px] text-slate-400 font-bold leading-tight px-4 uppercase">
                      Hãy cập nhật đúng mã zalo theo số điện thoại: 0961313681
                    </p>
                    
                    <button 
                      onClick={() => setIsZaloModalOpen(false)}
                      className="w-full max-w-[180px] py-3 rounded-2xl bg-[#1c2237] text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                    >
                        <LogIn className="w-4 h-4 rotate-180" />
                        THOÁT
                    </button>
                    
                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-blue-500 font-black uppercase tracking-tighter cursor-pointer hover:underline pt-2">
                       <MessageCircleCode className="w-3 h-3" />
                       <span>Quét mã Zalo để nhận hỗ trợ trực tiếp</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
