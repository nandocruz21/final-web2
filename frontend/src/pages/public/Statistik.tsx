import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Users, Award, BookOpen, GraduationCap, TrendingUp, Heart } from 'lucide-react';

const Statistik: React.FC = () => {
  const stats = [
    { label: 'Total Santri Aktif', value: '450+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Jumlah Pengajar', value: '35', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Kelas Berjalan', value: '24', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Alumni Lulusan', value: '1,200+', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Penghargaan', value: '48', icon: Award, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Kepuasan Wali Santri', value: '98%', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-700 rounded-full mb-6">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Statistik & Pencapaian</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Transparansi data dan perkembangan lembaga MSANTRI dari tahun ke tahun sebagai bentuk dedikasi kami dalam pendidikan Al-Qur'an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                  <IconComponent size={32} />
                </div>
                <div>
                  <div className="text-4xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-emerald-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Mari Bergabung Bersama Kami!</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg mb-10">
              Pendaftaran santri baru tahun ajaran ini masih dibuka. Daftarkan putra-putri Anda untuk menjadi generasi Qur'ani yang berakhlak mulia.
            </p>
            <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              Informasi Pendaftaran
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Statistik;
