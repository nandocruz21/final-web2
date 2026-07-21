import React from 'react';
import { Users, BookOpen, Search, Bell, Settings, LogOut, CheckSquare, Home, Globe, Megaphone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex">
      {/* Sidebar Emerald & Gold */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col fixed inset-y-0 left-0 z-20 shadow-xl border-r border-gold/20">
        <div className="p-6 border-b border-primary-dark/60 bg-primary-dark/40">
          <div className="flex items-center gap-2 mb-1">
            <img src="/logo.png" alt="Logo MSANTRI" className="w-8 h-8 object-contain drop-shadow-md" />
            <div className="font-serif font-bold text-2xl text-white tracking-wide flex-1">MSANTRI</div>
            <span className="text-white text-[10px] px-2 py-0.5 rounded-full bg-white/20 border border-white/30 font-sans font-bold uppercase tracking-wider shadow-sm">Admin</span>
          </div>
          <div className="text-gold text-xs uppercase tracking-widest font-sans font-semibold pl-10">Panel Pengelola</div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {[
            { to: '/admin/dashboard', icon: <Home size={18} />, label: 'Dashboard Utama', active: path === '/admin/dashboard' },
            { to: '/admin/santri', icon: <Users size={18} />, label: 'Data Santri', active: path.startsWith('/admin/santri') },
            { to: '/admin/rapor', icon: <BookOpen size={18} />, label: 'Rapor Hafalan', active: path.startsWith('/admin/rapor') },
            { to: '/admin/kehadiran', icon: <CheckSquare size={18} />, label: 'Kehadiran', active: path.startsWith('/admin/kehadiran') },
            { to: '/admin/pengumuman', icon: <Megaphone size={18} />, label: 'Pengumuman', active: path.startsWith('/admin/pengumuman') },
            { to: '/admin/pesan', icon: <Mail size={18} />, label: 'Pesan Masuk', active: path.startsWith('/admin/pesan') },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                item.active
                  ? 'bg-primary-dark text-gold font-bold border-l-4 border-gold shadow-md'
                  : 'text-white/80 hover:bg-primary-dark/50 hover:text-gold'
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-primary-dark/60 bg-primary-dark/20 space-y-2">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 w-full bg-white/10 text-white hover:bg-white/20 px-4 py-2.5 rounded-lg font-medium transition-all text-sm border border-white/10"
          >
            <Globe size={16} /> Halaman User
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_token');
              window.location.href = '/admin/login';
            }} 
            className="flex items-center justify-center gap-2 w-full bg-red-600 text-white hover:bg-red-700 hover:text-white px-4 py-2.5 rounded-lg font-medium transition-all text-sm shadow-md"
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-surface min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-outline-light h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="font-serif font-bold text-lg md:hidden text-primary">MSANTRI</div>
          <div className="hidden md:flex relative w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50" />
            <input 
              type="text" 
              placeholder="Cari data di panel..." 
              className="bg-surface-low border border-outline-light rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold w-full transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-gold hover:bg-surface-low transition-all">
              <Bell size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-gold hover:bg-surface-low transition-all">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-outline-light">
              <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gold/30">
                A
              </div>
              <div className="hidden sm:block text-left text-xs font-sans">
                <p className="font-semibold text-on-surface">Administrator</p>
                <p className="text-gold font-medium">Admin TPQ</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content dengan animasi fadeUp */}
        <div className="flex-1 bg-surface flex flex-col animate-fadeUp">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
