import React from 'react';
import { Users, BookOpen, MapPin, Search, Bell, Settings, LogOut, FileText, CheckSquare, Home, Globe, Megaphone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-emerald-100 hidden md:flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="p-6">
          <div className="font-serif font-bold text-2xl text-white tracking-wide mb-1">MSANTRI</div>
          <div className="text-emerald-400 text-xs uppercase tracking-widest">Panel Pengelola</div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path === '/admin/dashboard' ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <Home size={20} /> Dashboard Utama
          </Link>
          <Link to="/admin/santri" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path.startsWith('/admin/santri') ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <Users size={20} /> Data Santri
          </Link>
          <Link to="/admin/rapor" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path.startsWith('/admin/rapor') ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <BookOpen size={20} /> Rapor Hafalan
          </Link>
          <Link to="/admin/kehadiran" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path.startsWith('/admin/kehadiran') ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <CheckSquare size={20} /> Kehadiran
          </Link>
          <Link to="/admin/pengumuman" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path.startsWith('/admin/pengumuman') ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <Megaphone size={20} /> Pengumuman
          </Link>
          <Link to="/admin/pesan" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${path.startsWith('/admin/pesan') ? 'bg-emerald-800/50 text-white' : 'text-emerald-200 hover:bg-emerald-800/30 hover:text-white'}`}>
            <Mail size={20} /> Pesan Masuk
          </Link>
        </nav>
        
        <div className="p-4 mt-auto space-y-2">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 w-full bg-emerald-800 text-white hover:bg-emerald-700 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
          >
            <Globe size={16} /> Halaman User
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_token');
              window.location.href = '/admin/login';
            }} 
            className="flex items-center justify-center gap-2 w-full bg-red-700  text-white hover:bg-red-800 hover:text-black  px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>


      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="font-semibold text-lg md:hidden">MSANTRI</div>
          <div className="hidden md:flex relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari..." 
              className="bg-slate-100 border-none rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-700"><Bell size={20} /></button>
            <button className="text-slate-400 hover:text-slate-700"><Settings size={20} /></button>
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 bg-slate-50 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
