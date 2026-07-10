import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Target, Flag, BookOpen, HeartHandshake } from 'lucide-react';

const ProfilTpq: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="flex-grow w-full">
        {/* Hero Section */}
        <div className="bg-emerald-900 py-20 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6 relative z-10">Profil TPQ MSANTRI</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg relative z-10">
            Mengenal lebih dekat visi, misi, dan sejarah perjalanan kami dalam mencetak generasi cinta Al-Qur'an.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Sejarah */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="w-full md:w-1/2">
              <div className="aspect-video rounded-3xl bg-slate-200 overflow-hidden shadow-lg border border-slate-200">
                {/* Image Placeholder */}
                <img src="https://images.unsplash.com/photo-1584515979956-d416f5c88b77?q=80&w=2070&auto=format&fit=crop" alt="TPQ MSANTRI" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Sejarah Kami</h2>
              <h3 className="text-3xl font-bold font-serif text-slate-800 mb-6">Berdiri Sejak 2010</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                TPQ MSANTRI didirikan dengan niat tulus untuk membumikan Al-Qur'an di tengah masyarakat modern. Berawal dari sekelompok kecil pengajian di masjid setempat, antusiasme masyarakat yang tinggi mendorong kami untuk meresmikannya menjadi lembaga pendidikan Al-Qur'an yang terstruktur.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Kini, kami telah membimbing lebih dari ribuan santri, dengan metode pembelajaran yang adaptif, menyenangkan, namun tetap berpegang teguh pada tajwid dan kaidah keilmuan yang sahih.
              </p>
            </div>
          </div>

          {/* Visi Misi */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-4">Visi</h3>
              <p className="text-slate-700 leading-relaxed text-lg italic">
                "Menjadi lembaga pendidikan Al-Qur'an terdepan yang melahirkan generasi berakhlak mulia, cerdas spiritual, dan berwawasan global."
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200">
              <div className="w-14 h-14 bg-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-6">
                <Flag size={28} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-4">Misi</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <BookOpen className="text-emerald-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Menyelenggarakan pendidikan tahsin dan tahfidz dengan metode yang terstandarisasi.</span>
                </li>
                <li className="flex gap-4">
                  <HeartHandshake className="text-emerald-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Membangun karakter santri yang berakhlakul karimah dalam kehidupan sehari-hari.</span>
                </li>
                <li className="flex gap-4">
                  <Target className="text-emerald-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-600">Mengembangkan minat dan bakat Islami santri melalui kegiatan ekstrakurikuler.</span>
                </li>
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
