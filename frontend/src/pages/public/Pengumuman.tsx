import React, { useEffect } from 'react';
import { Volume2, Users, CreditCard, Award, Calendar, ChevronRight, ChevronLeft, Search, Filter } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

const Pengumuman: React.FC = () => {
  useEffect(() => {
    api.get('/home').then(() => {}).catch(() => {});
  }, []);

  // Data pengumuman contoh (statis)

  const standardCards = [
    { icon: null, img: '/event_photo.png', badge: 'Akademik', date: '12 Nov 2024', title: 'Penambahan Koleksi Kitab di Perpustakaan Utama', desc: 'Perpustakaan MSANTRI telah menambahkan lebih dari 500 judul kitab baru untuk mendukung pembelajaran...' },
    { icon: <Users size={18} />, img: null, badge: 'Kegiatan', date: '10 Nov 2024', title: 'Pendaftaran Ekstrakurikuler Semester Genap Dibuka', desc: 'Santri dipersilakan mendaftar kegiatan ekstrakurikuler pilihan melalui portal siswa sebelum batas waktu 25 November.' },
    { icon: <CreditCard size={18} />, img: null, badge: 'Administrasi', date: '08 Nov 2024', title: 'Informasi Pembayaran SPP Bulan Depan', desc: 'Terdapat pembaruan nomor rekening virtual account untuk pembayaran SPP. Mohon periksa panduan terbaru di sistem.' },
    { icon: <Award size={18} />, img: null, badge: 'Prestasi', date: '05 Nov 2024', title: "Juara Umum Musabaqah Hifdzil Qur'an Tingkat Provinsi", desc: "Selamat kepada kontingen MSANTRI yang telah berhasil meraih juara umum pada kompetisi bergengsi ini..." },
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Informasi &amp; Berita</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Papan Pengumuman</h1>
          <p className="font-sans text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Informasi terbaru dan pembaruan penting mengenai kegiatan akademik dan administrasi TPQ.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex-grow w-full">

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Cari pengumuman..."
              className="w-full bg-white border border-outline-light rounded-sm py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-white border border-outline-light rounded-sm py-3 px-4 text-sm font-sans text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Semua Kategori</option>
              <option>Akademik</option>
              <option>Administrasi</option>
              <option>Kegiatan</option>
              <option>Prestasi</option>
            </select>
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Grid Pengumuman */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Kartu Utama (Featured) */}
          <div className="lg:col-span-2 card-marble p-8 relative overflow-hidden flex flex-col justify-between group hover:border-gold/30 transition-all duration-300">
            {/* Ornamen sudut */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-surface-high rounded-bl-full opacity-60 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold font-sans flex items-center gap-1.5">
                  <Volume2 size={12} /> Penting
                </span>
                <span className="text-on-surface-variant text-xs font-sans flex items-center gap-1">
                  <Calendar size={12} /> 15 Nov 2024
                </span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-on-surface mb-4 leading-tight">
                Pembaruan Jadwal Ujian Akhir Semester Ganjil
              </h2>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-2xl mb-8">
                Mohon perhatian seluruh santri dan wali santri, terdapat penyesuaian jadwal Ujian Akhir Semester (UAS) ganjil tahun ajaran ini untuk mengoptimalkan waktu belajar.
              </p>
            </div>
            <button className="relative z-10 text-primary font-sans font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Baca Selengkapnya <ChevronRight size={16} />
            </button>
          </div>

          {/* Kartu-kartu Standar */}
          {standardCards.map((card, i) => (
            <div key={i} className="card-marble overflow-hidden flex flex-col group hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
              {card.img ? (
                <div className="h-44 overflow-hidden">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="h-20 bg-surface-mid flex items-center justify-center text-on-surface-variant">
                  {card.icon}
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold">{card.badge}</span>
                  <span className="text-on-surface-variant text-xs font-sans">{card.date}</span>
                </div>
                <h3 className="font-serif text-base text-on-surface mb-2 leading-snug">{card.title}</h3>
                <p className="text-on-surface-variant text-xs font-sans leading-relaxed flex-grow line-clamp-3 mb-4">{card.desc}</p>
                <button className="text-primary hover:text-primary-dark text-xs font-sans font-semibold flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                  Detail <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-outline-light text-on-surface-variant hover:bg-surface-mid transition-colors">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map(n => (
            <button key={n} className={`w-9 h-9 flex items-center justify-center rounded-sm font-sans font-medium text-sm transition-colors ${n === 1 ? 'bg-primary text-white' : 'border border-outline-light text-on-surface hover:bg-surface-mid'}`}>
              {n}
            </button>
          ))}
          <span className="text-on-surface-variant px-1 font-sans">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-outline-light text-on-surface-variant hover:bg-surface-mid transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pengumuman;
