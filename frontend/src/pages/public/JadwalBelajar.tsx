import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const JadwalBelajar: React.FC = () => {
  const jadwal = [
    {
      hari: 'Senin – Kamis',
      waktu: '15:30 – 17:30',
      status: 'Reguler',
      kegiatan: ['Pembukaan & Doa Bersama', "Tahsin Al-Qur'an", 'Hafalan Surat Pendek', 'Doa Penutup'],
    },
    {
      hari: "Jum'at",
      waktu: '15:30 – 17:00',
      status: 'Keagamaan',
      kegiatan: ['Ekstrakurikuler Keagamaan', 'Praktek Ibadah', 'Kisah Nabi & Rasul'],
    },
    {
      hari: 'Sabtu',
      waktu: '08:00 – 10:00',
      status: 'Evaluasi',
      kegiatan: ["Muraja'ah Gabungan", 'Evaluasi Hafalan', 'Kuis & Games Islami'],
    },
    {
      hari: 'Ahad (Minggu)',
      waktu: 'Libur',
      status: 'Libur',
      kegiatan: ['Waktu Luang Bersama Keluarga'],
    },
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      {/* Banner Halaman */}
      <div className="bg-primary-dark py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="label-small text-gold mb-2">Rutinitas Harian</p>
          <h1 className="font-serif text-4xl text-white">Jadwal Belajar</h1>
          <p className="text-white/60 font-sans text-sm mt-2">
            Berikut adalah rutinitas dan jadwal kegiatan belajar mengajar harian santri di lingkungan MSANTRI.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">

        <div className="grid md:grid-cols-2 gap-6">
          {jadwal.map((item, index) => (
            <div key={index} className="card-marble p-7 relative overflow-hidden group hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">

              {/* Garis aksen di sisi kiri */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gold group-hover:h-full transition-all" />

              {/* Header kartu */}
              <div className="pl-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl text-on-surface">{item.hari}</h3>
                  <span className={`label-small px-2.5 py-1 rounded-full text-xs ${
                    item.status === 'Libur'
                      ? 'bg-surface-high text-on-surface-variant'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Waktu */}
                <div className="flex items-center gap-2 text-gold font-sans font-medium text-sm mb-5 bg-gold/5 border border-gold/20 w-fit px-3 py-1.5 rounded-full">
                  <Clock size={14} />
                  {item.waktu}
                </div>

                {/* Daftar kegiatan */}
                <ul className="space-y-3">
                  {item.kegiatan.map((kegiatan, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-on-surface-variant font-sans text-sm">
                      <BookOpen size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{kegiatan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan tambahan */}
        <div className="mt-10 card-marble p-6 border-gold/20 bg-gold/5">
          <div className="flex items-start gap-3">
            <Calendar size={20} className="text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans font-semibold text-on-surface text-sm mb-1">Catatan Penting</h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Jadwal dapat berubah sewaktu-waktu menyesuaikan hari besar atau kegiatan khusus. Perubahan jadwal akan diinformasikan melalui papan Pengumuman.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JadwalBelajar;
