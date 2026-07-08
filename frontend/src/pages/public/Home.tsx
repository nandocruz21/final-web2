import React, { useEffect, useState } from 'react';
import { BookOpen, MapPin, Search } from 'lucide-react';
import api from '../../services/api';

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/home')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching home data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-primary font-medium text-lg">Memuat data MSANTRI...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="text-xl font-bold font-serif text-secondary">{data?.pengaturan?.nama_tpq || 'MSANTRI'}</h1>
          </div>
          <a href="http://localhost:8000/admin/login" className="btn-outline py-2 px-4 text-sm rounded-lg hidden sm:inline-flex">
            Login Pengelola
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-emerald-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 leading-tight">
            Pantau Capaian Hafalan Al-Quran Anak Anda dari Rumah
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Sistem Informasi Capaian Hafalan Santri (MSANTRI) memudahkan wali santri untuk melihat progres dan catatan pengajar secara real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="http://localhost:8000/cek-rapor" className="bg-white text-primary hover:bg-slate-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              <Search size={20} /> Cek Rapor Santri
            </a>
            <a href="#lokasi" className="bg-transparent border border-white/30 hover:bg-white/10 text-white font-medium py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2">
              <MapPin size={20} /> Lihat Jadwal & Lokasi
            </a>
          </div>
        </div>
        
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-emerald-50 rounded-2xl p-8 border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-center gap-4 text-primary mb-2">
              <BookOpen size={32} />
            </div>
            <h3 className="text-4xl font-bold text-secondary">{data?.totalSantri || 0}</h3>
            <p className="text-slate-500 font-medium mt-1 uppercase tracking-wider text-sm">Santri Aktif Terdaftar</p>
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      {data?.info && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-sm font-bold tracking-wider text-primary uppercase">{data.info.kategori || 'PENGUMUMAN'}</span>
              <h2 className="text-3xl font-bold text-secondary mt-2">Informasi Terbaru</h2>
            </div>
            <div className="card p-8 bg-white border-l-4 border-l-primary">
              <h3 className="text-xl font-bold mb-3">{data.info.judul_info}</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{data.info.isi_info}</p>
              <div className="mt-6 text-sm text-slate-400 font-medium">
                Diposting pada: {new Date(data.info.tanggal_posting).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary text-slate-300 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} {data?.pengaturan?.nama_tpq || 'MSANTRI'}. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};

export default Home;
