import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Users, Award, BookOpen, GraduationCap, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Statistik: React.FC = () => {
  const stats = [
    { label: 'Total Santri Aktif', value: '450+', icon: Users },
    { label: 'Jumlah Pengajar', value: '35', icon: BookOpen },
    { label: 'Kelas Berjalan', value: '24', icon: TrendingUp },
    { label: 'Alumni Lulusan', value: '1.200+', icon: GraduationCap },
    { label: 'Penghargaan Diraih', value: '48', icon: Award },
    { label: 'Kepuasan Wali Santri', value: '98%', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      {/* Banner Halaman */}
      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Data &amp; Pencapaian</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Statistik Lembaga</h1>
          <p className="font-sans text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Transparansi data dan perkembangan lembaga MSANTRI dari tahun ke tahun sebagai bentuk dedikasi kami dalam pendidikan Al-Qur'an.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">

        {/* Grid Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="card-marble p-8 flex items-center gap-6 group hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
                {/* Ikon dengan latar zamrud muda */}
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-md flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <IconComponent size={28} />
                </div>
                <div>
                  {/* Nilai statistik — Playfair Display */}
                  <p className="font-serif text-4xl font-bold text-on-surface mb-0.5">{stat.value}</p>
                  {/* Label — Manrope uppercase */}
                  <p className="label-small text-on-surface-variant">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ornamen pemisah */}
        <div className="divider-gold mb-20">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#a37c35" className="flex-shrink-0">
            <polygon points="5,0 10,5 5,10 0,5" />
          </svg>
        </div>

        {/* CTA Pendaftaran */}
        <div style={{ backgroundColor: '#004d34' }} className="rounded-md p-10 md:p-16 text-center relative overflow-hidden">
          {/* Cahaya ambient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="label-small text-gold mb-4">Bergabunglah Bersama Kami</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
              Mari Cetak Generasi Qur'ani!
            </h2>
            <p className="text-white/60 font-sans max-w-2xl mx-auto text-sm mb-8 leading-relaxed">
              Pendaftaran santri baru tahun ajaran ini masih dibuka. Daftarkan putra-putri Anda untuk menjadi generasi yang berakhlak mulia dan cinta Al-Qur'an.
            </p>
            <Link to="/hubungi" className="btn-gold inline-flex">
              Informasi Pendaftaran
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Statistik;
