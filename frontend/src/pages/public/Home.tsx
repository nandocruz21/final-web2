import React, { useEffect, useState } from 'react';
import { Search, Bell, FileText, Calendar, Users, Info, Phone, BookOpen, MapPin, Activity, Clock, CheckCircle2, PhoneCall } from 'lucide-react';
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
        <section className="bg-gradient-to-r from-[#eef8f2] to-[#f8fcf9] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-[#e3efe8]">
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
                <div className="text-amber-500 mb-3"><MapPin size={24} /></div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Pengajar</div>
                <div className="text-3xl font-bold text-slate-400 font-serif">{data?.totalPengajar || 0}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-emerald-700 mb-3"><Activity size={24} /></div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Pembaruan Rapor</div>
                <div className="text-3xl font-bold text-slate-400 font-serif">{data?.totalPembaruanRapor || 0}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Fitur Unggulan Section */}
        <section className="py-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Mengapa Memilih MSANTRI?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Kami menyediakan sistem informasi terbaik untuk memastikan transparansi dan kemudahan pemantauan hafalan santri.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Pantauan Real-Time</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Pantau perkembangan hafalan dan kehadiran anak langsung dari smartphone Anda kapan saja.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Jadwal Terstruktur</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Jadwal kegiatan mengaji yang tertata rapi dan mudah diakses untuk kedisiplinan santri.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Pengajar Berkompeten</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Dibimbing langsung oleh para pengajar yang ahli dan berpengalaman di bidangnya.</p>
            </div>
          </div>
        </section>

        {/* Galeri Kegiatan Section */}
        <section className="py-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Galeri Kegiatan Santri</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Sekilas potret keaktifan dan keceriaan santri saat belajar di TPQ kami.</p>
          </div>
          <div className="overflow-hidden w-full relative">
            <div className="flex animate-marquee gap-4 w-max hover:animation-play-state-paused">
              {[0, 1].map((loopIdx) => (
                <React.Fragment key={loopIdx}>
                  {data?.galeri && data.galeri.length > 0 ? (
                    data.galeri.map((item: any, index: number) => (
                      <div key={`${loopIdx}-${index}`} className="group relative overflow-hidden rounded-xl w-64 md:w-80 aspect-[4/3] shadow-sm cursor-pointer flex-shrink-0">
                        <img src={`http://localhost:8000/storage/galeri/${item.nama_file}`} alt={item.keterangan || 'Galeri'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-white text-sm font-medium">{item.keterangan}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Fallback jika API kosong
                    ['/WhatsApp Image 2026-03-16 at 23.15.08.jpeg', '/WhatsApp Image 2026-03-16 at 23.17.16.jpeg', '/WhatsApp Image 2026-03-16 at 23.28.55.jpeg', '/WhatsApp Image 2026-03-16 at 23.29.16.jpeg', '/69b938fe33a5a.jpeg'].map((src, idx) => (
                      <div key={`${loopIdx}-${idx}`} className="group relative overflow-hidden rounded-xl w-64 md:w-80 aspect-[4/3] shadow-sm cursor-pointer flex-shrink-0">
                        <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    ))
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section className="py-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-3">Kata Wali Santri</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Apa pendapat mereka tentang pengalaman belajar di MSANTRI?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.testimoni && data.testimoni.length > 0 ? (
              data.testimoni.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="flex text-amber-400 mb-4">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                    ))}
                  </div>
                  <p className="text-slate-600 italic text-sm flex-grow mb-6">"{item.isi_testimoni}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {item.inisial || item.nama_wali?.charAt(0) || 'W'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.nama_wali}</h4>
                      <p className="text-xs text-slate-500">Wali Santri</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback Testimoni
              [
                { nama: "Bpk. Ahmad", isi: "Alhamdulillah sejak menggunakan aplikasi ini, saya jadi lebih mudah memantau setoran hafalan anak saya meskipun sedang bekerja.", inisial: "A" },
                { nama: "Ibu Siti", isi: "Fiturnya sangat membantu. Jadwal mengaji anak selalu up-to-date dan pengajarnya sangat profesional. Pertahankan!", inisial: "S" },
                { nama: "Bpk. Budi", isi: "Sangat inovatif! Dulu susah tau anak sudah sampai surat apa, sekarang tinggal buka HP semua kelihatan jelas.", inisial: "B" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="flex text-amber-400 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                    ))}
                  </div>
                  <p className="text-slate-600 italic text-sm flex-grow mb-6">"{item.isi}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {item.inisial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.nama}</h4>
                      <p className="text-xs text-slate-500">Wali Santri</p>
                    </div>
                  </div>
                </div>
              ))
            )}
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
