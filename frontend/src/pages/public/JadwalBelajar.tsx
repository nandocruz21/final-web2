import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, Clock, BookOpen } from 'lucide-react';

const JadwalBelajar: React.FC = () => {
  const jadwal = [
    {
      hari: 'Senin - Kamis',
      waktu: '15:30 - 17:30',
      kegiatan: ['Pembukaan & Doa', "Tahsin Al-Qur'an", 'Hafalan Surat Pendek', 'Doa Penutup']
    },
    {
      hari: "Jum'at",
      waktu: '15:30 - 17:00',
      kegiatan: ['Ekstrakurikuler Keagamaan', 'Praktek Ibadah', 'Kisah Nabi & Rasul']
    },
    {
      hari: 'Sabtu',
      waktu: '08:00 - 10:00',
      kegiatan: ["Muraja'ah Gabungan", 'Evaluasi Hafalan', 'Kuis & Games Islami']
    },
    {
      hari: 'Minggu',
      waktu: 'Libur',
      kegiatan: ['Waktu Luang Bersama Keluarga']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-700 rounded-full mb-6">
            <Calendar size={32} />
          </div>
          <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Jadwal Belajar</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Berikut adalah rutinitas dan jadwal kegiatan belajar mengajar harian santri di lingkungan MSANTRI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {jadwal.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.hari}</h3>
              <div className="flex items-center gap-2 text-emerald-700 font-medium mb-6 bg-emerald-50 w-fit px-4 py-1.5 rounded-full text-sm">
                <Clock size={16} />
                {item.waktu}
              </div>
              
              <ul className="space-y-4">
                {item.kegiatan.map((kegiatan, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <BookOpen size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{kegiatan}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JadwalBelajar;
