import React, { useEffect, useState } from 'react';
import { Users, BookOpen, CheckCircle2, Clock, ChevronRight, Star, X, Calendar, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QuranScene from '../../components/QuranScene';
import api from '../../services/api';

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State untuk form testimoni
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTestimoni, setFormTestimoni] = useState({ nama_wali: '', rating: 5, isi_testimoni: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchHomeData = () => {
    setLoading(true);
    api.get('/home').then(res => {
      setData(res.data);
    }).catch(err => {
      console.error("Error fetching home data:", err);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleTestimoniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    api.post('/testimoni', formTestimoni).then(() => {
      setSubmitSuccess(true);
      fetchHomeData(); // Refresh data
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormTestimoni({ nama_wali: '', rating: 5, isi_testimoni: '' });
      }, 2000);
    }).catch(err => {
      console.error("Error submitting testimoni", err);
      alert("Terjadi kesalahan saat mengirim testimoni.");
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <main className="flex-grow">

        {/* ================================================ */}
        {/* HERO SECTION — Al-Quran 3D Melayang              */}
        {/* ================================================ */}
        <section className="relative overflow-hidden bg-surface min-h-screen flex items-center">

          {/* Lingkaran cahaya hijau di belakang (efek ambient) */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          {/* Partikel bintang berkilau */}
          {[
            { top: '15%', left: '10%', delay: '0s', size: 8 },
            { top: '30%', left: '85%', delay: '0.8s', size: 6 },
            { top: '70%', left: '5%', delay: '1.5s', size: 10 },
            { top: '80%', left: '75%', delay: '0.4s', size: 7 },
            { top: '50%', left: '95%', delay: '2s', size: 5 },
            { top: '10%', left: '60%', delay: '1.2s', size: 9 },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute pointer-events-none animate-shimmer"
              style={{ top: star.top, left: star.left, animationDelay: star.delay }}
            >
              <svg width={star.size} height={star.size} viewBox="0 0 10 10" fill="#a37c35">
                <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
              </svg>
            </div>
          ))}

          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-0 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

            {/* --- KIRI: Teks Hero --- */}
            <div className="space-y-6" style={{ animation: 'fadeUp 0.8s ease-out forwards' }}>
              {/* Label kecil bergaya butik */}

              {/* Judul utama — Playfair Display */}
              <h2 className="font-serif text-5xl md:text-6xl leading-tight text-on-surface">
                TPQ{' '}
                <span className="text-gold-gradient">Miftahul</span>
                <br />Jannah
              </h2>

              {/* Deskripsi */}
              <p className="text-on-surface-variant font-sans text-lg leading-relaxed max-w-md">
                Tempat Pengajian Al-Quran modern untuk mencetak generasi Qur'ani yang cemerlang. Pantau hafalan anak Anda secara real-time.
              </p>

              {/* Tombol CTA */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/cek-rapor" className="btn-primary">
                  Cek Progres Santri
                </Link>
              </div>

              {/* Statistik kecil di bawah tombol */}
              {loading ? (
                <div className="flex gap-8 pt-4 border-t border-outline-light animate-pulse">
                  <div>
                    <div className="h-8 w-16 bg-slate-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-300 rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 w-16 bg-slate-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-300 rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 w-16 bg-slate-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-300 rounded"></div>
                  </div>
                </div>
              ) : (
                data && (
                  <div className="flex gap-8 pt-4 border-t border-outline-light">
                    <div>
                      <p className="font-serif text-2xl font-bold text-primary">{data.totalSantri ?? 0}+</p>
                      <p className="text-xs text-on-surface-variant font-sans">Santri Aktif</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-primary">{data.totalPengajar ?? 0}+</p>
                      <p className="text-xs text-on-surface-variant font-sans">Pengajar</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-primary">{data.totalPembaruanRapor ?? 0}+</p>
                      <p className="text-xs text-on-surface-variant font-sans">Rapor Diperbarui</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* --- KANAN: Gambar Al-Quran 3D Melayang --- */}
            <div className="relative flex items-center justify-center h-[480px] w-full" style={{ perspective: '1000px' }}>
              {/* Bayangan realistis di lantai bawah buku */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 h-8 bg-black/25 rounded-[100%] blur-md animate-floatShadow" />

              {/* Gambar 3D (Pastikan file disimpan di folder public/quran-3d.png) */}
              <img 
                src="/quran-3d.png" 
                alt="Al-Quran 3D" 
                className="w-full max-w-[280px] md:max-w-[340px] h-auto object-contain animate-float drop-shadow-2xl relative z-10"
              />

              {/* Partikel bintang emas di sekitar buku */}
              {[
                { top: '12%', left: '8%', delay: '0s', dur: '3s' },
                { top: '65%', left: '82%', delay: '1s', dur: '2.5s' },
                { top: '10%', left: '78%', delay: '0.5s', dur: '3.5s' },
                { top: '78%', left: '18%', delay: '1.5s', dur: '2.8s' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/50 animate-shimmer pointer-events-none"
                  style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
                />
              ))}
            </div>
          </div>

          {/* Ornamen garis melengkung di bawah hero */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 C360,0 1080,80 1440,40 L1440,60 L0,60 Z" fill="#f6f3f2"/>
            </svg>
          </div>
        </section>

        {/* ================================================ */}
        {/* SECTION STATISTIK                                */}
        {/* ================================================ */}
        <section className="bg-surface-low py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {loading ? (
                [0, 1, 2, 3].map((idx) => (
                  <div key={`skel-stat-${idx}`} className="card-marble p-6 text-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-slate-300 mx-auto mb-3"></div>
                    <div className="h-8 w-16 bg-slate-300 rounded mx-auto mb-2"></div>
                    <div className="h-3 w-24 bg-slate-300 rounded mx-auto"></div>
                  </div>
                ))
              ) : (
                [
                  { icon: <Users size={22} className="text-primary" />, label: 'Total Santri', value: data?.totalSantri ?? '—' },
                  { icon: <BookOpen size={22} className="text-primary" />, label: 'Pengajar', value: data?.totalPengajar ?? '—' },
                  { icon: <CheckCircle2 size={22} className="text-primary" />, label: 'Pembaruan Rapor', value: data?.totalPembaruanRapor ?? '—' },
                  { icon: <Clock size={22} className="text-primary" />, label: 'Jam Belajar/Minggu', value: '12 Jam' },
                ].map((stat, i) => (
                  <div key={i} className="card-marble p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      {stat.icon}
                    </div>
                    <p className="font-serif text-3xl font-bold text-on-surface mb-1">{stat.value}</p>
                    <p className="text-xs text-on-surface-variant font-sans uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ================================================ */}
        {/* SECTION FITUR / KEUNGGULAN                       */}
        {/* ================================================ */}
        <section className="py-20 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
            {/* Judul section */}
            <div className="text-center mb-14">
              <p className="label-small text-gold mb-3">Keunggulan Kami</p>
              <h3 className="font-serif text-4xl text-on-surface mb-4">Mengapa Memilih MSANTRI?</h3>
              {/* Ornamen pemisah emas */}
              <div className="divider-gold max-w-xs mx-auto">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#a37c35" className="flex-shrink-0">
                  <polygon points="5,0 10,5 5,10 0,5" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '📊',
                  title: 'Pantau Hafalan Real-Time',
                  desc: 'Lihat perkembangan hafalan anak Anda kapan saja dan di mana saja langsung dari genggaman.',
                },
                {
                  icon: '📅',
                  title: 'Jadwal Terstruktur',
                  desc: 'Jadwal belajar yang terorganisir dengan baik untuk memastikan konsistensi hafalan setiap santri.',
                },
                {
                  icon: '🏆',
                  title: 'Laporan Prestasi',
                  desc: 'Rapor digital lengkap untuk setiap santri, mudah diakses oleh wali kapan saja dibutuhkan.',
                },
              ].map((item, i) => (
                <div key={i} className="card-marble p-8 group hover:border-gold/50 transition-all duration-300">
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h4 className="font-serif text-xl text-on-surface mb-3">{item.title}</h4>
                  <p className="text-on-surface-variant font-sans text-sm leading-relaxed">{item.desc}</p>
                  <div className="mt-5 w-8 h-0.5 bg-gold group-hover:w-16 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ================================================ */}
        {/* SECTION GALERI KEGIATAN (Marquee)                */}
        {/* ================================================ */}
        <section className="py-20 bg-surface px-6 md:px-12">
          <div className="max-w-7xl mx-auto mb-10 text-center">
            <p className="label-small text-gold mb-3">Dokumentasi</p>
            <h3 className="font-serif text-4xl text-on-surface mb-4">Galeri Kegiatan Santri</h3>
            <div className="divider-gold max-w-xs mx-auto">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#a37c35" className="flex-shrink-0">
                <polygon points="5,0 10,5 5,10 0,5" />
              </svg>
            </div>
          </div>

          {/* Galeri bergerak otomatis ke kiri */}
          <div className="overflow-hidden w-full relative">
            <div className="flex animate-marquee gap-4 w-max">
              {[0, 1].map((loopIdx) => (
                <React.Fragment key={loopIdx}>
                  {loading ? (
                    [0, 1, 2, 3, 4].map((idx) => (
                      <div key={`skel-${loopIdx}-${idx}`} className="group relative overflow-hidden rounded-md w-64 md:w-80 aspect-[4/3] flex-shrink-0 border border-outline-light bg-slate-300 animate-pulse">
                      </div>
                    ))
                  ) : data?.galeri && data.galeri.length > 0 ? (
                    data.galeri.map((item: any, index: number) => (
                      <div key={`${loopIdx}-${index}`} className="group relative overflow-hidden rounded-md w-64 md:w-80 aspect-[4/3] flex-shrink-0 border border-outline-light">
                        <img src={`http://localhost:8000/storage/galeri/${item.nama_file}`} alt={item.keterangan || 'Galeri'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-white text-sm font-sans">{item.keterangan}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      '/WhatsApp Image 2026-03-16 at 23.15.08.jpeg',
                      '/WhatsApp Image 2026-03-16 at 23.17.16.jpeg',
                      '/WhatsApp Image 2026-03-16 at 23.28.55.jpeg',
                      '/WhatsApp Image 2026-03-16 at 23.29.16.jpeg',
                      '/WhatsApp Image 2026-03-16 at 23.18.23.jpeg',
                    ].map((src, idx) => (
                      <div key={`${loopIdx}-${idx}`} className="group relative overflow-hidden rounded-md w-64 md:w-80 aspect-[4/3] flex-shrink-0 border border-outline-light">
                        <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    ))
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================ */}
        {/* SECTION TESTIMONI WALI SANTRI                     */}
        {/* ================================================ */}
        <section className="py-20 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-small text-gold mb-3">Kepercayaan Mereka</p>
              <h3 className="font-serif text-4xl text-on-surface mb-4">Kata Wali Santri</h3>
              <div className="divider-gold max-w-xs mx-auto">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#a37c35" className="flex-shrink-0">
                  <polygon points="5,0 10,5 5,10 0,5" />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {loading ? (
                [0, 1, 2].map((idx) => (
                  <div key={`skel-testimoni-${idx}`} className="card-marble w-full md:w-[350px] p-7 flex flex-col animate-pulse">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-4 h-4 bg-slate-300 rounded-full"></div>
                      ))}
                    </div>
                    <div className="space-y-3 flex-grow mb-8">
                      <div className="h-3 w-full bg-slate-300 rounded"></div>
                      <div className="h-3 w-5/6 bg-slate-300 rounded"></div>
                      <div className="h-3 w-4/6 bg-slate-300 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-outline-light">
                      <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-24 bg-slate-300 rounded"></div>
                        <div className="h-2 w-16 bg-slate-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                (data?.testimoni && data.testimoni.length > 0
                  ? data.testimoni.slice(0, 3)
                  : [
                      { nama_wali: 'Bpk. Ahmad', isi_testimoni: 'Alhamdulillah sejak menggunakan MSANTRI, saya jadi lebih mudah memantau hafalan anak meskipun sedang bekerja.', inisial: 'A', rating: 5 },
                      { nama_wali: 'Ibu Siti', isi_testimoni: 'Fiturnya sangat membantu. Jadwal mengaji anak selalu up-to-date dan pengajarnya sangat profesional!', inisial: 'S', rating: 5 },
                      { nama_wali: 'Bpk. Budi', isi_testimoni: 'Sangat inovatif! Dulu susah tau anak sudah sampai surat apa, sekarang tinggal buka HP semua kelihatan jelas.', inisial: 'B', rating: 5 },
                    ]
                ).map((item: any, idx: number) => (
                  <div key={idx} className="card-marble w-full md:w-[350px] p-7 flex flex-col hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                    {/* Tanda kutip pembuka */}
                    <div className="text-gold font-serif text-5xl leading-none mb-2 opacity-40">"</div>
                    {/* Bintang rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" fill="#a37c35" className="w-4 h-4">
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                        </svg>
                      ))}
                    </div>
                    {/* Isi testimoni */}
                    <p className="text-on-surface-variant font-sans text-sm leading-relaxed italic flex-grow mb-6">
                      {item.isi_testimoni}
                    </p>
                    {/* Profil pengirim */}
                    <div className="flex items-center gap-3 pt-4 border-t border-outline-light">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm font-sans">
                        {item.inisial || item.nama_wali?.charAt(0) || 'W'}
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-on-surface text-sm">{item.nama_wali}</h4>
                        <p className="text-xs text-gold font-sans">Wali Santri</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Tombol Tambah Testimoni */}
            <div className="text-center mt-12">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#a37c35] hover:bg-[#8a682c] text-white px-8 py-3 rounded-full font-sans font-semibold transition-all duration-300 shadow-lg shadow-[#a37c35]/40 hover:shadow-[#a37c35]/60 hover:-translate-y-1 flex items-center gap-2 mx-auto"
              >
                Tulis Pengalaman Anda
              </button>
            </div>
          </div>
        </section>

        {/* ================================================ */}
        {/* SECTION PENGUMUMAN TERBARU                       */}
        {/* ================================================ */}
        {(data?.info || (data?.urgentInfo && data.urgentInfo.length > 0)) && (
          <section className="py-12 bg-surface-low px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="label-small text-gold mb-1">Terbaru</p>
                  <h3 className="font-serif text-3xl text-on-surface">Pengumuman</h3>
                </div>
                <Link to="/pengumuman" className="flex items-center gap-1 text-sm text-primary font-sans font-medium hover:text-primary-dark transition-colors group">
                  Lihat Semua <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Banner Pengumuman Darurat */}
              {data?.urgentInfo && data.urgentInfo.length > 0 && (
                <div className="mb-6 flex flex-col gap-4">
                  {data.urgentInfo.map((item: any) => (
                    <Link to="/pengumuman" key={item.id} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-white shadow-xl shadow-red-900/20 border border-red-500 p-6 md:p-8 cursor-pointer group animate-fadeUp block">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 animate-pulse">
                          <AlertTriangle size={32} className="text-white" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-red-900/50 text-white px-3 py-1 rounded-full text-[10px] font-bold font-sans uppercase tracking-widest border border-red-400/30">
                              🚨 Info Darurat
                            </span>
                          </div>
                          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 group-hover:text-gold transition-colors">{item.judul_info}</h2>
                          <p className="font-sans text-red-100 text-sm md:text-base line-clamp-2">{item.isi_info}</p>
                        </div>
                        <div className="shrink-0 mt-4 md:mt-0">
                          <span className="bg-white text-red-700 group-hover:bg-gold group-hover:text-white px-6 py-2.5 md:py-3 rounded-full font-sans font-bold text-sm shadow-lg transition-colors flex items-center gap-2">
                            Lihat Detail <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pengumuman Biasa */}
              {data?.info && (
                <div className="card-marble p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-gold/30 transition-all">
                  <div className="flex-1">
                    <span className="label-small text-gold mb-2 block">{data.info.kategori || 'Umum'}</span>
                    <h4 className="font-serif text-xl text-on-surface mb-2">{data.info.judul_info}</h4>
                    <p className="text-on-surface-variant font-sans text-sm line-clamp-2">{data.info.isi_info}</p>
                  </div>
                  <Link to="/pengumuman" className="btn-primary text-sm whitespace-nowrap">
                    Baca Selengkapnya
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* MODAL FORM TESTIMONI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl text-primary font-bold mb-2">Bagikan Pengalaman Anda</h3>
                <p className="text-sm text-on-surface-variant font-sans">Ulasan Anda sangat berarti bagi perkembangan MSANTRI.</p>
              </div>

              {submitSuccess ? (
                <div className="bg-primary/10 text-primary p-6 rounded-lg text-center font-sans">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Terima Kasih!</h4>
                  <p className="text-sm">Ulasan Anda berhasil dikirim dan sudah tampil di halaman utama.</p>
                </div>
              ) : (
                <form onSubmit={handleTestimoniSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1 font-sans">Nama Wali Santri</label>
                    <input 
                      type="text" 
                      required
                      className="w-full border border-outline-light rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all font-sans"
                      placeholder="Masukkan nama Anda"
                      value={formTestimoni.nama_wali}
                      onChange={e => setFormTestimoni({...formTestimoni, nama_wali: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2 font-sans">Penilaian Anda</label>
                    <div className="flex gap-2 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormTestimoni({...formTestimoni, rating: star})}
                          className={`transition-colors ${star <= formTestimoni.rating ? 'text-gold' : 'text-outline-light hover:text-gold/50'}`}
                        >
                          <Star size={32} fill={star <= formTestimoni.rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1 font-sans">Isi Ulasan</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full border border-outline-light rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all font-sans resize-none"
                      placeholder="Ceritakan pengalaman Anda menggunakan MSANTRI..."
                      value={formTestimoni.isi_testimoni}
                      onChange={e => setFormTestimoni({...formTestimoni, isi_testimoni: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#003d29] text-white rounded-lg py-3 font-semibold font-sans transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
