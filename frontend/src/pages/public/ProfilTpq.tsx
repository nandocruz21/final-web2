import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Target, Flag, BookOpen, HeartHandshake } from 'lucide-react';
/**
 * Halaman Profil TPQ
 * Menampilkan informasi sejarah, visi, dan misi
 * dari TPQ MSANTRI dengan tata letak visual yang menarik.
 */
const ProfilTpq: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      {/* Banner Halaman */}
      <div style={{ backgroundColor: '#004d34' }} className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpolygon points='30,5 55,30 30,55 5,30'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10">
          <p className="label-small mb-4" style={{ color: '#a37c35' }}>Tentang Kami</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5" style={{ color: '#ffffff' }}>Profil TPQ MSANTRI</h1>
          <p className="font-sans max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Mengenal lebih dekat visi, misi, dan sejarah perjalanan kami dalam mencetak generasi cinta Al-Qur'an.
          </p>
        </div>
      </div>

      <main className="flex-grow w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Bagian Sejarah */}
          <div className="flex flex-col md:flex-row gap-14 items-center mb-24">
            <div className="w-full md:w-1/2">
              <div className="aspect-video rounded-md overflow-hidden border border-outline-light shadow-md">
                <img
                  src="/profil.jpeg"
                  alt="TPQ MSANTRI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="label-small text-gold mb-3">Sejarah Kami</p>
              <h3 className="font-serif text-3xl text-on-surface mb-5">Berdiri Sejak 2010</h3>
              {/* Ornamen pemisah emas */}
              <div className="divider-gold mb-6 max-w-xs">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="#a37c35" className="flex-shrink-0">
                  <polygon points="4,0 8,4 4,8 0,4" />
                </svg>
              </div>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-4">
                TPQ MSANTRI didirikan dengan niat tulus untuk membumikan Al-Qur'an di tengah masyarakat modern. Berawal dari sekelompok kecil pengajian di masjid setempat, antusiasme masyarakat yang tinggi mendorong kami untuk meresmikannya menjadi lembaga pendidikan Al-Qur'an yang terstruktur.
              </p>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                Kini, kami telah membimbing lebih dari ribuan santri, dengan metode pembelajaran yang adaptif, menyenangkan, namun tetap berpegang teguh pada tajwid dan kaidah keilmuan yang sahih.
              </p>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">

            {/* Visi */}
            <div className="card-marble p-10 border-l-4 border-l-gold">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-md flex items-center justify-center mb-5">
                <Target size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-4">Visi</h3>
              <p className="text-on-surface-variant font-sans text-sm leading-relaxed italic">
                "Menjadi lembaga pendidikan Al-Qur'an terdepan yang melahirkan generasi berakhlak mulia, cerdas spiritual, dan berwawasan global."
              </p>
            </div>

            {/* Misi */}
            <div className="card-marble p-10 border-l-4 border-l-primary">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-md flex items-center justify-center mb-5">
                <Flag size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-5">Misi</h3>
              <ul className="space-y-4">
                {[
                  { icon: <BookOpen size={16} />, text: 'Menyelenggarakan pendidikan tahsin dan tahfidz dengan metode yang terstandarisasi.' },
                  { icon: <HeartHandshake size={16} />, text: 'Membangun karakter santri yang berakhlakul karimah dalam kehidupan sehari-hari.' },
                  { icon: <Target size={16} />, text: 'Mengembangkan minat dan bakat Islami santri melalui kegiatan ekstrakurikuler.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-on-surface-variant font-sans text-sm">
                    <span className="text-primary mt-0.5 shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilTpq;
