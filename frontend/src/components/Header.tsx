import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const Header: React.FC = () => {
  const [namaTpq, setNamaTpq] = useState('MSANTRI');
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    api.get('/home')
      .then(res => {
        if (res.data?.pengaturan?.nama_tpq) {
          setNamaTpq(res.data.pengaturan.nama_tpq);
        }
      })
      .catch(err => {
        // Silently fail if not found to avoid console clutter
      });
  }, []);

  const getLinkClass = (path: string) => {
    return currentPath === path 
      ? "text-slate-900 border-b-2 border-slate-900 pb-1" 
      : "hover:text-slate-900 transition";
  };

  return (
    <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo MSANTRI" className="h-12 w-auto object-contain" />
        <div className="leading-tight">
          <h1 className="font-bold text-slate-900 uppercase text-sm md:text-base tracking-wider font-serif">
            {namaTpq}
          </h1>
          <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest hidden sm:block">Sistem Informasi</span>
        </div>
      </div>
      
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link to="/" className={getLinkClass('/')}>Beranda</Link>
        <Link to="/pengumuman" className={getLinkClass('/pengumuman')}>Pengumuman</Link>
        <Link to="/cek-rapor" className={getLinkClass('/cek-rapor')}>Cek Rapor</Link>
        <Link to="/jadwal" className={getLinkClass('/jadwal')}>Jadwal Belajar</Link>
        <Link to="/statistik" className={getLinkClass('/statistik')}>Statistik</Link>
        <Link to="/profil" className={getLinkClass('/profil')}>Profil TPQ</Link>
        <Link to="/hubungi" className={getLinkClass('/hubungi')}>Hubungi Kami</Link>
      </nav>

      <div className="flex items-center gap-6">
        <Link to="/admin/login" className="bg-[#0b3d2c] hover:bg-[#082d20] text-white py-2 px-5 rounded text-sm font-medium transition-all shadow-md">
          Login Pengelola
        </Link>
      </div>
    </header>
  );
};

export default Header;
