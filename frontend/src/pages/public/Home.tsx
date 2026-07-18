import React, { useEffect, useState } from 'react';
import { Users, BookOpen, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QuranScene from '../../components/QuranScene';
import api from '../../services/api';

const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/home').then(res => {
      setData(res.data);
    }).catch(err => {
      console.error("Error fetching home data:", err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

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

          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

            {/* --- KIRI: Teks Hero --- */}
            <div className="space-y-6" style={{ animation: 'fadeUp 0.8s ease-out forwards' }}>
              {/* Label kecil bergaya butik */}
              <div className="label-small text-gold flex items-center gap-2">
                <div className="w-8 h-px bg-gold" />
                Sistem Informasi Manajemen
              </div>

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
                <Link to="/profil" className="btn-gold">
                  Daftar Baru
                </Link>
              </div>

              {/* Statistik kecil di bawah tombol */}
              {loading ? (
                <div className="flex gap-8 pt-4 border-t border-outline-light animate-pulse">
                  <div>
                    <div className="h-8 w-16 bg-slate-200/50 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-200/50 rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 w-16 bg-slate-200/50 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-200/50 rounded"></div>
                  </div>
                  <div>
                    <div className="h-8 w-16 bg-slate-200/50 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-slate-200/50 rounded"></div>
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

            {/* --- KANAN: Al-Quran 3D Melayang (Three.js) --- */}
            <div className="relative flex items-center justify-center h-[480px] w-full">
              {/* Cahaya ambient di bawah buku */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-6 bg-gold/20 rounded-full blur-2xl animate-floatShadow" />

              {/* Komponen Three.js 3D */}
              <QuranScene />

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
                    <div className="w-12 h-12 rounded-full bg-slate-200/60 mx-auto mb-3"></div>
                    <div className="h-8 w-16 bg-slate-200/60 rounded mx-auto mb-2"></div>
                    <div className="h-3 w-24 bg-slate-200/60 rounded mx-auto"></div>
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
        <section className="py-20 bg-surface-low px-6 md:px-12">
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
                      <div key={`skel-${loopIdx}-${idx}`} className="group relative overflow-hidden rounded-md w-64 md:w-80 aspect-[4/3] flex-shrink-0 border border-outline-light bg-slate-200/60 animate-pulse">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                [0, 1, 2].map((idx) => (
                  <div key={`skel-testimoni-${idx}`} className="card-marble p-7 flex flex-col animate-pulse">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-4 h-4 bg-slate-200/60 rounded-full"></div>
                      ))}
                    </div>
                    <div className="space-y-3 flex-grow mb-8">
                      <div className="h-3 w-full bg-slate-200/60 rounded"></div>
                      <div className="h-3 w-5/6 bg-slate-200/60 rounded"></div>
                      <div className="h-3 w-4/6 bg-slate-200/60 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-outline-light">
                      <div className="w-10 h-10 rounded-full bg-slate-200/60"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-24 bg-slate-200/60 rounded"></div>
                        <div className="h-2 w-16 bg-slate-200/60 rounded"></div>
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
                  <div key={idx} className="card-marble p-7 flex flex-col hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
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
          </div>
        </section>

        {/* ================================================ */}
        {/* SECTION PENGUMUMAN TERBARU                       */}
        {/* ================================================ */}
        {data?.info && (
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
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Home;
