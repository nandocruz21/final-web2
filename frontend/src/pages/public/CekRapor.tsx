import React, { useState } from 'react';
import { Search, User, FileText, ChevronRight, X, Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';
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

  /**
   * Menangani pengiriman form pencarian santri
   * Akan memanggil API backend untuk mencari data santri
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);
    api.get(`/cek-rapor?q=${searchQuery}`)
      .then(res => {
        setResults(res.data.santri || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12 relative overflow-hidden">
        {/* Dekorasi Cahaya Tipis */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Progres Belajar</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Cek Rapor Santri</h1>
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Masukkan nama lengkap santri untuk melihat catatan hafalan dan progres belajar secara detail.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full relative z-10 -mt-8">

        {/* Kotak Pencarian */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 p-2 flex items-center mb-12 border border-slate-100">
          <form onSubmit={handleSearch} className="flex w-full items-center gap-2">
            <div className="pl-4 text-slate-400">
              <Search size={22} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik nama santri di sini..."
              className="w-full bg-transparent border-none py-3 px-3 text-base font-sans focus:outline-none text-slate-700 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap disabled:opacity-70 transition-colors shadow-lg shadow-primary/20"
            >
              {loading ? 'Mencari...' : 'Cari Data'}
            </button>
          </form>
        </div>

        {/* Hasil Pencarian */}
        {searched && (
          <div className="animate-fadeUp">
            <p className="font-sans text-sm text-slate-500 mb-5">
              Ditemukan:{' '}
              <span className="font-semibold text-primary">{results.length} Santri</span>
            </p>

            {results.length === 0 && !loading ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                <User size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="font-serif text-lg text-slate-700 mb-1">Santri Tidak Ditemukan</p>
                <p className="text-slate-500 font-sans text-sm">Coba gunakan kata kunci atau nama yang berbeda.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((santri) => (
                  <div 
                    key={santri.id} 
                    onClick={() => handleLihatRapor(santri)}
                    className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer border border-slate-100 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar inisial */}
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                        {santri.nama_lengkap.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-slate-800 group-hover:text-primary transition-colors font-bold">
                          {santri.nama_lengkap}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-sans mt-1">
                          <span className="flex items-center gap-1"><FileText size={12} /> NIS: {santri.nis || '-'}</span>
                          <span>{santri.alamat || 'Tidak ada data alamat'}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gold border border-gold/30 hover:bg-gold/10 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors">
                      Lihat Rapor <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Panduan jika belum search */}
        {!searched && (
          <div className="text-center py-20 opacity-60">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-300" />
            </div>
            <p className="font-serif text-2xl text-slate-700 mb-2 font-bold">Cari Data Santri</p>
            <p className="text-slate-500 font-sans text-sm max-w-sm mx-auto">
              Silakan masukkan nama lengkap atau potongan nama santri di kolom pencarian di atas.
            </p>
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
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-fadeUp border border-slate-100">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-serif font-bold text-2xl shadow-inner">
                  {selectedSantri?.nama_lengkap?.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl text-slate-800 leading-tight">
                    {selectedSantri?.nama_lengkap}
                  </h2>
                  <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      NIS: {selectedSantri?.nis || '-'}
                    </span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body Modal (Daftar Riwayat) */}
            <div className="p-6 overflow-y-auto bg-slate-50/50 flex-grow">
              {loadingRiwayat ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
                  <p className="text-slate-500 text-sm font-medium animate-pulse">Mengambil data rapor...</p>
                </div>
              ) : riwayatRapor.length > 0 ? (
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {riwayatRapor.map((item, index) => (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                        <BookOpen size={16} />
                      </div>
                      
                      {/* Card Content */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group-hover:border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
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
