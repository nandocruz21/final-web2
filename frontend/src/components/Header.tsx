import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const Header: React.FC = () => {
  const [namaTpq, setNamaTpq] = useState('MSANTRI');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Ambil nama TPQ dari API
  useEffect(() => {
    api.get('/home').then(res => {
      if (res.data?.pengaturan?.nama_tpq) {
        setNamaTpq(res.data.pengaturan.nama_tpq);
      }
    }).catch(() => {});
  }, []);

  // Deteksi scroll supaya header berubah jadi frosted glass
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Kelas untuk link navigasi aktif vs biasa
  const getLinkClass = (path: string) => {
    const isActive = currentPath === path;
    return isActive
      ? 'text-primary font-semibold border-b-2 border-gold pb-0.5'
      : 'text-on-surface-variant hover:text-primary transition-colors duration-200';
  };

  return (
    <header
      className={`sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-light'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Logo & Nama TPQ */}
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo MSANTRI" className="h-11 w-auto object-contain" />
        <div className="leading-tight">
          {/* Nama menggunakan Playfair Display sesuai design system */}
          <h1 className="font-serif font-bold text-primary uppercase text-sm md:text-base tracking-wider">
            {namaTpq}
          </h1>
          <span className="text-[10px] text-gold uppercase tracking-widest font-sans hidden sm:block">
            Sistem Informasi
          </span>
        </div>
      </Link>

      {/* Navigasi Tengah */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-sans font-medium">
        <Link to="/" className={getLinkClass('/')}>Beranda</Link>
        <Link to="/pengumuman" className={getLinkClass('/pengumuman')}>Pengumuman</Link>
        <Link to="/cek-rapor" className={getLinkClass('/cek-rapor')}>Cek Rapor</Link>
        <Link to="/jadwal" className={getLinkClass('/jadwal')}>Jadwal Belajar</Link>
        <Link to="/statistik" className={getLinkClass('/statistik')}>Statistik</Link>
        <Link to="/profil" className={getLinkClass('/profil')}>Profil TPQ</Link>
        <Link to="/hubungi" className={getLinkClass('/hubungi')}>Hubungi Kami</Link>
      </nav>

      {/* Tombol Login Pengelola */}
      <Link
        to="/admin/login"
        className="bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-sm text-sm font-sans font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Login Pengelola
      </Link>
    </header>
  );
};

export default Header;
