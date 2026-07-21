import React, { useState, useEffect } from 'react';
import { Search, User, FileText, ChevronRight, X, Calendar, BookOpen, AlertCircle, Download } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

/**
 * Halaman Cek Rapor Santri
 * Memungkinkan pengguna untuk mencari santri berdasarkan nama
 * dan melihat ringkasan rapor/progres hafalan mereka.
 */
const CekRapor: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSantri, setSelectedSantri] = useState<any>(null);
  const [riwayatRapor, setRiwayatRapor] = useState<any[]>([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);

  // Live Search Effect (mencari saat user mengetik)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setLoading(true);
      api.get('/cek-rapor')
        .then(res => {
          const semuaSantri = res.data.santri || [];
          setResults(semuaSantri.slice(0, 5));
          setSearched(true);
          setLoading(false);
        })
        .catch(() => setLoading(false)); 
      
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      setSearched(true);
      api.get(`/cek-rapor?q=${searchQuery}`)
        .then(res => {
          setResults(res.data.santri || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /**
   * Menangani pengiriman form (ketika di-enter atau klik tombol)
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  /**
   * Mengambil riwayat rapor untuk santri yang dipilih dan membuka modal
   */
  const handleLihatRapor = (santri: any) => {
    setSelectedSantri(santri);
    setIsModalOpen(true);
    setLoadingRiwayat(true);
    
    api.get(`/riwayat/${santri.id}`)
      .then(res => {
        setRiwayatRapor(res.data || []);
      })
      .catch(err => {
        console.error("Gagal mengambil riwayat", err);
        setRiwayatRapor([]);
      })
      .finally(() => {
        setLoadingRiwayat(false);
      });
  };

  const handleDownloadPdf = (id: number, nama: string) => {
    api.get(`/cetak-rapor/${id}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `laporan_santri_${nama}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error("Gagal mengunduh PDF", error);
        alert("Gagal mengunduh rapor. Silakan coba lagi.");
      });
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-4xl mx-auto animate-fadeUp">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Progres Belajar</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Cek Rapor Santri</h1>
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Masukkan nama lengkap santri untuk melihat catatan hafalan dan progres belajar secara detail.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">

        {/* Kotak Pencarian */}
        <div className="card-marble p-2 flex items-center mb-12 border-outline-light animate-fadeUp" style={{ animationDelay: '100ms' }}>
          <form onSubmit={handleSearch} className="flex w-full items-center gap-2">
            <div className="pl-4 text-on-surface-variant">
              <Search size={22} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik nama santri di sini..."
              className="w-full bg-transparent border-none py-3 px-3 text-base font-sans focus:outline-none text-on-surface placeholder:text-on-surface-variant/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-sm whitespace-nowrap disabled:opacity-70"
            >
              {loading ? 'Mencari...' : 'Cari Data'}
            </button>
          </form>
        </div>

        {/* Hasil Pencarian */}
        {searched && (
          <div className="animate-fadeUp" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-sans text-sm text-on-surface-variant">
                {loading ? 'Mencari data...' : 'Ditemukan:'}
                {!loading && <span className="font-semibold text-primary ml-1">{results.length} Santri</span>}
              </p>
              {loading && (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              )}
            </div>

            {loading ? (
              <div className="text-center py-16 card-marble border-dashed flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="font-serif text-lg text-on-surface animate-pulse">Menelusuri Data Santri...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16 card-marble border-dashed">
                <User size={48} className="mx-auto text-outline-light mb-4" />
                <p className="font-serif text-lg text-on-surface mb-1">Santri Tidak Ditemukan</p>
                <p className="text-on-surface-variant font-sans text-sm">Coba gunakan kata kunci atau nama yang berbeda.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((santri) => (
                  <div key={santri.id} onClick={() => handleLihatRapor(santri)} className="card-marble p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-gold/40 transition-all">
                    <div className="flex items-center gap-4">
                      {/* Avatar inisial */}
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-serif font-bold text-lg">
                        {santri.nama_lengkap.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-on-surface group-hover:text-primary transition-colors">
                          {santri.nama_lengkap}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-on-surface-variant font-sans mt-0.5">
                          <span className="flex items-center gap-1"><FileText size={12} /> {santri.alamat || 'Tidak ada data alamat'}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-gold text-sm flex items-center gap-2 whitespace-nowrap">
                      Lihat Rapor <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Panduan jika belum search */}
        {!searched && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={36} className="text-primary/30" />
            </div>
            <p className="font-serif text-xl text-on-surface mb-2">Cari Santri Anda</p>
            <p className="text-on-surface-variant font-sans text-sm">Masukkan nama lengkap santri di kolom pencarian di atas.</p>
          </div>
        )}
      </main>

      {/* ================================================ */}
      {/* MODAL RIWAYAT RAPOR (Glassmorphism)              */}
      {/* ================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-fadeUp border border-slate-100">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center font-serif font-bold text-2xl shadow-inner">
                  {selectedSantri?.nama_lengkap?.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl text-slate-800 leading-tight">
                    {selectedSantri?.nama_lengkap}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDownloadPdf(selectedSantri.id, selectedSantri.nama_lengkap)}
                  className="px-3 py-1.5 flex items-center gap-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-semibold"
                >
                  <Download size={14} /> Unduh PDF
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body Modal (Daftar Riwayat) */}
            <div className="p-6 overflow-y-auto bg-slate-50/50 flex-grow">
              {loadingRiwayat ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-slate-500 text-sm font-medium animate-pulse">Mengambil data rapor...</p>
                </div>
              ) : riwayatRapor.length > 0 ? (
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {riwayatRapor.map((item, index) => (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                        <BookOpen size={16} />
                      </div>
                      
                      {/* Card Content */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group-hover:border-primary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <Calendar size={12} />
                            {item.tanggal_riwayat || item.created_at?.substring(0, 10)}
                          </span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            item.kehadiran === 'hadir' ? 'bg-emerald-100 text-emerald-700' :
                            item.kehadiran === 'sakit' ? 'bg-blue-100 text-blue-700' :
                            item.kehadiran === 'izin' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.kehadiran || 'hadir'}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">{item.capaian_hafalan}</h4>
                        {item.catatan_pengajar && (
                          <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                            <AlertCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
                            <p className="leading-relaxed">{item.catatan_pengajar}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={24} className="text-slate-400" />
                  </div>
                  <p className="font-serif text-lg text-slate-700 mb-1">Belum Ada Riwayat</p>
                  <p className="text-slate-500 font-sans text-sm">Santri ini belum memiliki catatan penyetoran hafalan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default CekRapor;
