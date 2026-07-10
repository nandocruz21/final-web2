import React, { useEffect, useState } from 'react';
import { Search, Bell, FileText, Calendar, Users, Info, Phone, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/home')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Error fetching home data:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-grow w-full">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
          {/* Left Side (Dark Green) */}
          <div className="md:w-[45%] bg-[#104b3a] text-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight font-serif mb-6 text-white">
              Pantau Hafalan<br/>Anak Anda
            </h2>
            <p className="text-emerald-50/90 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
              Sistem Informasi Capaian Hafalan Santri (MSANTRI) memudahkan wali santri untuk melihat progres hafalan secara real-time.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/cek-rapor" className="bg-white text-slate-800 hover:bg-slate-50 py-3 px-6 rounded font-medium transition-all text-sm shadow-sm">
                Cek Rapor Santri
              </Link>
              <a href="#lokasi" className="border border-white/70 hover:bg-white/10 py-3 px-6 rounded font-medium transition-all text-sm text-white">
                Lokasi & Jadwal
              </a>
            </div>
            
            <div className="flex gap-2 mt-12">
              <div className="w-8 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
          
          {/* Right Side (Image) */}
          <div className="md:w-[55%] bg-slate-100 flex relative min-h-[300px] md:min-h-[400px]">
            <img src="/hero_illustration.png" alt="Ilustrasi Belajar" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </section>



        {/* Statistics Banner */}
        <section id="jadwal" className="bg-gradient-to-r from-[#eef8f2] to-[#f8fcf9] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-[#e3efe8]">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-3xl font-bold font-serif text-[#104b3a] leading-tight">
              TPQ Kami,<br/>
              Mencetak Generasi Qurani
            </h3>
          </div>
          
          <div className="md:w-1/2 flex flex-col items-start md:items-end w-full">
            <div className="text-center md:text-right mb-6">
              <h4 className="text-xl font-bold font-serif text-slate-900">Statistik MSANTRI</h4>
              <p className="text-slate-500 font-medium text-xs tracking-wide">Tahun Ajaran Aktif</p>
            </div>
            
            <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-start">
              <div className="flex flex-col items-center">
                <div className="text-orange-500 mb-3"><Users size={24} /></div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Total Santri</div>
                <div className="text-3xl font-bold text-[#104b3a] font-serif">{data?.totalSantri || 0}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-emerald-700 mb-3"><BookOpen size={24} /></div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Kelas</div>
                <div className="text-3xl font-bold text-slate-400 font-serif">--</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-amber-500 mb-3"><MapPin size={24} /></div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Pengajar</div>
                <div className="text-3xl font-bold text-slate-400 font-serif">--</div>
              </div>
            </div>
          </div>
        </section>

        {/* Optional Events Section (Kept for feature parity) */}
        {data?.info && (
          <section className="pt-4">
            <h3 className="text-2xl font-bold font-serif text-[#104b3a] mb-6">Pengumuman Terbaru</h3>
            <div className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-900 mb-1">{data.info.judul_info}</h4>
                <p className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wide">{data.info.kategori || 'Umum'}</p>
                <p className="text-slate-600 text-sm line-clamp-2">{data.info.isi_info}</p>
              </div>
              <Link to="/pengumuman" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2 rounded text-sm font-medium transition whitespace-nowrap">
                Baca Selengkapnya
              </Link>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Home;
