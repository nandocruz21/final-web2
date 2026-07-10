import React, { useEffect } from 'react';
import { Search, Bell, Settings, Filter, ChevronLeft, ChevronRight, Volume2, Users, CreditCard, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

const Pengumuman: React.FC = () => {
  useEffect(() => {
    // Simulated fetch
    api.get('/home')
      .then(() => {
        // Success
      })
      .catch(err => {
        console.error("Error fetching announcements:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-slate-900 mb-3">Pengumuman</h1>
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            Informasi terbaru dan pembaruan penting mengenai kegiatan akademik dan administrasi.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pengumuman..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-700 focus:outline-none appearance-none pr-10 cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
              <option>Semua Kategori</option>
              <option>Akademik</option>
              <option>Administrasi</option>
            </select>
            <button className="bg-[#0f5c3d] hover:bg-emerald-900 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Featured Card (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 border border-slate-200 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 bg-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-bl-full -mr-10 -mt-10 opacity-50 z-0 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Volume2 size={14} /> Penting
                </span>
                <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                  <Calendar size={12} /> 15 Nov 2024
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold font-serif text-slate-900 mb-4 leading-tight">
                Pembaruan Jadwal Ujian Akhir Semester Ganjil
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mb-8">
                Mohon perhatian seluruh santri dan wali santri, terdapat penyesuaian jadwal Ujian Akhir Semester (UAS) ganjil tahun ajaran ini. Penyesuaian ini dilakukan untuk mengoptimalkan waktu belajar dan memastikan persiapan yang lebih matang.
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <button className="text-[#0f5c3d] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Baca Selengkapnya <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Standard Card 1 (Image Top) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 bg-white">
            <div className="h-48 overflow-hidden bg-slate-100">
              <img src="/event_photo.png" alt="Perpustakaan" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100/50 text-[#0f5c3d] px-3 py-1 rounded-full text-xs font-bold">
                  Akademik
                </span>
                <span className="text-slate-500 text-xs font-medium">
                  12 Nov 2024
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 leading-snug">
                Penambahan Koleksi Kitab di Perpustakaan Utama
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                Perpustakaan MSANTRI telah menambahkan lebih dari 500 judul kitab baru untuk...
              </p>
              <button className="text-slate-500 hover:text-[#0f5c3d] text-xs font-semibold flex items-center gap-1 mt-auto">
                Detail <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Standard Card 2 (Icon Top) */}
          <div className="border border-slate-200 rounded-2xl p-6 flex flex-col group hover:shadow-lg transition-all duration-300 bg-white">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-5">
              <Users size={18} />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                Kegiatan
              </span>
              <span className="text-slate-500 text-xs font-medium">
                10 Nov 2024
              </span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2 leading-snug">
              Pendaftaran Ekstrakurikuler Semester Genap Dibuka
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
              Santri dipersilakan mendaftar kegiatan ekstrakurikuler pilihan melalui portal siswa sebelum batas waktu tanggal 25 November.
            </p>
            <button className="text-slate-500 hover:text-[#0f5c3d] text-xs font-semibold flex items-center gap-1 mt-auto">
              Detail <ChevronRight size={12} />
            </button>
          </div>

          {/* Standard Card 3 (Icon Top) */}
          <div className="border border-slate-200 rounded-2xl p-6 flex flex-col group hover:shadow-lg transition-all duration-300 bg-white">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-5">
              <CreditCard size={18} />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                Administrasi
              </span>
              <span className="text-slate-500 text-xs font-medium">
                08 Nov 2024
              </span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2 leading-snug">
              Informasi Pembayaran SPP Bulan Depan
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
              Terdapat pembaruan nomor rekening virtual account untuk pembayaran SPP. Mohon periksa panduan terbaru di sistem.
            </p>
            <button className="text-slate-500 hover:text-[#0f5c3d] text-xs font-semibold flex items-center gap-1 mt-auto">
              Detail <ChevronRight size={12} />
            </button>
          </div>

          {/* Standard Card 4 (Large Gray Placeholder Top) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 bg-white">
            <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-300">
              <Award size={48} strokeWidth={1} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-emerald-100/50 text-[#0f5c3d] px-3 py-1 rounded-full text-xs font-bold">
                  Prestasi
                </span>
                <span className="text-slate-500 text-xs font-medium">
                  05 Nov 2024
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 leading-snug">
                Juara Umum Musabaqah Hifdzil Qur'an Tingkat Provinsi
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                Selamat kepada kontingen MSANTRI yang telah berhasil meraih juara umum pada...
              </p>
              <button className="text-slate-500 hover:text-[#0f5c3d] text-xs font-semibold flex items-center gap-1 mt-auto">
                Detail <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0f5c3d] text-white font-medium text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
            3
          </button>
          <span className="text-slate-400 px-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pengumuman;
