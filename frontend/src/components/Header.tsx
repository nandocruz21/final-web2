import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { publicService } from '../services/publicService';

const Header: React.FC = () => {
  const [namaTpq, setNamaTpq] = useState('MSANTRI');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Tutup menu mobile ketika rute berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Ambil nama TPQ dari API
  useEffect(() => {
    publicService.getHomeData().then((res: any) => {
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
  const getLinkClass = (path: string, isMobile = false) => {
    const isActive = currentPath === path;
    if (isMobile) {
      return isActive
        ? 'text-primary font-bold'
        : 'text-on-surface-variant hover:text-primary transition-colors duration-200';
    }
    return isActive
      ? 'text-primary font-semibold border-b-2 border-gold pb-0.5'
      : 'text-on-surface-variant hover:text-primary transition-colors duration-200';
  };

  return (
    <header
      className={`sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-outline-light'
          : 'bg-surface border-b border-transparent'
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
        </div>
      </Link>

      {/* Navigasi Tengah */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-sans font-medium">
        <Link to="/" className={getLinkClass('/')}>Beranda</Link>
        <Link to="/pengumuman" className={getLinkClass('/pengumuman')}>Pengumuman</Link>
        <Link to="/cek-rapor" className={getLinkClass('/cek-rapor')}>Cek Rapor</Link>
        <Link to="/profil" className={getLinkClass('/profil')}>Profil TPQ</Link>
        <Link to="/hubungi" className={getLinkClass('/hubungi')}>Hubungi Kami</Link>
      </nav>

      {/* Navigasi Kanan & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* Tombol Login Pengelola (Desktop) */}
        <Link
          to="/admin/login"
          className="hidden md:inline-block bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-sm text-sm font-sans font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Login Pengelola
        </Link>
        
        {/* Tombol Hamburger untuk Mobile */}
        <button
          className="lg:hidden text-primary p-2 hover:bg-primary/10 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-xl border-b border-outline-light flex flex-col lg:hidden animate-fadeDown">
          <nav className="flex flex-col text-sm font-sans font-medium">
            <Link to="/" className={`px-6 py-4 border-b border-slate-100 ${getLinkClass('/', true)}`}>Beranda</Link>
            <Link to="/pengumuman" className={`px-6 py-4 border-b border-slate-100 ${getLinkClass('/pengumuman', true)}`}>Pengumuman</Link>
            <Link to="/cek-rapor" className={`px-6 py-4 border-b border-slate-100 ${getLinkClass('/cek-rapor', true)}`}>Cek Rapor</Link>
            <Link to="/profil" className={`px-6 py-4 border-b border-slate-100 ${getLinkClass('/profil', true)}`}>Profil TPQ</Link>
            <Link to="/hubungi" className={`px-6 py-4 border-b border-slate-100 ${getLinkClass('/hubungi', true)}`}>Hubungi Kami</Link>
            
            {/* Tombol Login di Mobile Menu */}
            <div className="p-6 md:hidden">
              <Link
                to="/admin/login"
                className="block text-center bg-primary hover:bg-primary-dark text-white py-3 px-5 rounded-md text-sm font-sans font-semibold transition-all duration-300 shadow-sm"
              >
                Login Pengelola
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
