import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Search, Bell, Settings, LogOut, CheckSquare, Home, Globe, Megaphone, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState<{name: string, avatar: string | null}>({ name: 'Administrator', avatar: null });
  const location = useLocation();
  const path = location.pathname;

  // Ambil data profil admin yang sedang login
  useEffect(() => {
    authService.check()
      .then(res => {
        if (res.data?.user) {
          setAdminData({
            name: res.data.user.name,
            avatar: res.data.user.avatar || null
          });
        }
      })
      .catch(() => {});
  }, [path]); // update jika path berubah (misal setelah save profil)

  // Tutup sidebar mobile saat rute berubah
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [path]);

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex relative overflow-hidden">
      {/* Overlay untuk mobile sidebar (background gelap) */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Emerald & Gold */}
      <aside className={`w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-40 shadow-xl border-r border-gold/20 transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-primary-dark/60 bg-primary-dark/40">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-white w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1">
              <img src="/logo.png" alt="Logo MSANTRI" className="w-full h-full object-contain" />
            </div>
            <div className="font-serif font-bold text-2xl text-white tracking-wide flex-1">MSANTRI</div>
            <span className="text-white text-[10px] px-2 py-0.5 rounded-full bg-white/20 border border-white/30 font-sans font-bold uppercase tracking-wider shadow-sm">Admin</span>
          </div>
          <div className="text-gold-light text-xs uppercase tracking-widest font-sans font-semibold pl-10">Panel Pengelola</div>
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
                  ? 'bg-primary-dark text-white font-bold border-l-4 border-gold shadow-md'
                  : 'text-white/80 hover:bg-primary-dark/50 hover:text-gold-light'
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
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-surface min-w-0 overflow-x-hidden w-full transition-all duration-300">
        {/* Top Navbar */}
        <header className="bg-white border-b border-outline-light h-16 flex items-center justify-between md:justify-end px-4 md:px-6 sticky top-0 z-10 shadow-sm">
          {/* Tombol Hamburger Mobile */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden p-2 text-primary hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <Link to="/admin/pengaturan" className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors group">
            <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gold/30 group-hover:scale-105 transition-transform overflow-hidden">
              {adminData.avatar ? (
                <img src={adminData.avatar} alt={adminData.name} className="w-full h-full object-cover" />
              ) : (
                adminData.name ? adminData.name.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div className="hidden sm:block text-left text-xs font-sans">
              <p className="font-semibold text-on-surface">{adminData.name}</p>
              <p className="text-gold font-medium">Admin TPQ</p>
            </div>
          </Link>
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
