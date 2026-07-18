import React, { useEffect, useState, useCallback } from 'react';
import { Volume2, Users, CreditCard, Award, Calendar, ChevronRight, Search, Filter, Book, Info, X, AlertTriangle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

/**
 * Halaman Papan Pengumuman
 * Menampilkan daftar berita, informasi akademik, dan kegiatan TPQ.
 * Dilengkapi dengan fitur filter kategori dan pencarian live.
 */
const Pengumuman: React.FC = () => {
  const [pengumuman, setPengumuman] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [selectedPengumuman, setSelectedPengumuman] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchPengumuman = useCallback(() => {
    setLoading(true);
    let url = `/pengumuman?kategori=${selectedKategori}&page=${page}`;
    if (searchQuery) url += `&q=${searchQuery}`;

    api.get(url)
      .then(res => {
        setPengumuman(res.data.data || []);
        if (res.data.current_page) {
          setPagination({
            current_page: res.data.current_page,
            last_page: res.data.last_page
          });
        } else {
           // Fallback in case backend doesn't paginate correctly
           setPagination({ current_page: 1, last_page: 1 });
        }
      })
      .catch(err => console.error("Error fetching pengumuman:", err))
      .finally(() => setLoading(false));
  }, [searchQuery, selectedKategori, page]);

  // Live Search (Debounce) effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPengumuman();
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery, selectedKategori, page, fetchPengumuman]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getKategoriIcon = (kategori: string) => {
    switch (kategori?.toUpperCase()) {
      case 'AKADEMIK': return <Book size={18} />;
      case 'ADMINISTRASI': return <CreditCard size={18} />;
      case 'KEGIATAN': return <Users size={18} />;
      case 'PRESTASI': return <Award size={18} />;
      default: return <Volume2 size={18} />;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12 relative overflow-hidden">
        {/* Ornamen Latar */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="label-small mb-3 text-gold tracking-widest uppercase">Informasi &amp; Berita</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">Papan Pengumuman</h1>
          <p className="font-sans text-sm md:text-base max-w-xl text-white/70 leading-relaxed">
            Dapatkan informasi terkini, jadwal akademik, serta berbagai pembaruan penting mengenai kegiatan di TPQ.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex-grow w-full">

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
          <form onSubmit={handleSearch} className="relative flex-grow w-full card-marble border-outline-light group focus-within:border-primary/50 transition-colors">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // Reset page on search
              }}
              placeholder="Ketik kata kunci pengumuman..."
              className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-sm font-sans focus:outline-none text-on-surface placeholder:text-on-surface-variant/50"
            />
          </form>
          
          <div className="flex w-full md:w-auto shrink-0 relative card-marble border-outline-light hover:border-primary/30 transition-colors">
             <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
             <select 
               value={selectedKategori}
               onChange={(e) => {
                 setSelectedKategori(e.target.value);
                 setPage(1); // Reset page on filter change
               }}
               className="w-full bg-transparent border-none py-3.5 pl-12 pr-10 text-sm font-sans text-on-surface focus:outline-none appearance-none cursor-pointer"
             >
               <option value="Semua Kategori">Semua Kategori</option>
               <option value="PENGUMUMAN">Pengumuman Umum</option>
               <option value="AKADEMIK">Akademik</option>
               <option value="ADMINISTRASI">Administrasi</option>
               <option value="KEGIATAN">Kegiatan</option>
               <option value="PRESTASI">Prestasi</option>
             </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                <ChevronRight size={16} className="rotate-90" />
             </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-marble p-6 min-h-[220px] flex flex-col justify-between">
                <div className="animate-pulse">
                  <div className="flex gap-3 mb-5">
                    <div className="h-6 w-24 bg-slate-200/60 rounded-full"></div>
                    <div className="h-6 w-20 bg-slate-200/60 rounded-full"></div>
                  </div>
                  <div className="h-7 w-5/6 bg-slate-200/60 rounded-md mb-4"></div>
                  <div className="h-4 w-full bg-slate-200/60 rounded-md mb-2"></div>
                  <div className="h-4 w-2/3 bg-slate-200/60 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : pengumuman.length === 0 ? (
          <div className="text-center py-20 card-marble border-dashed flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-5">
              <Info size={36} className="text-primary/40" />
            </div>
            <p className="font-serif text-xl text-on-surface mb-2">Tidak Ada Pengumuman</p>
            <p className="text-on-surface-variant font-sans text-sm">Coba gunakan kata kunci atau kategori yang berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pengumuman.map((item) => (
              <div 
                key={item.id} 
                className="card-marble p-6 flex flex-col group hover:shadow-xl hover:-translate-y-1 hover:border-gold/50 transition-all duration-300 cursor-pointer min-h-[240px]"
                onClick={() => setSelectedPengumuman(item)}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-primary/5 group-hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold font-sans flex items-center gap-1.5 tracking-wider uppercase transition-colors">
                    {getKategoriIcon(item.kategori)} {item.kategori || 'Info'}
                  </span>
                  <span className="text-on-surface-variant/70 text-xs font-sans flex items-center gap-1.5 font-medium">
                    <Calendar size={13} /> {formatDate(item.tanggal_posting || item.created_at)}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.judul_info}
                </h3>
                
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {item.isi_info}
                </p>
                
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                  <span className="text-gold font-sans font-semibold text-xs tracking-wide uppercase flex items-center gap-1.5 group-hover:gap-2 transition-all">
                    Baca Detail <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && pagination.last_page > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => {
                setPage(Math.max(1, page - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-outline-light text-on-surface hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:hover:border-outline-light disabled:hover:text-on-surface disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <span className="text-sm font-sans font-medium text-on-surface-variant bg-white px-4 py-2 rounded-full shadow-sm border border-outline-light">
              Halaman {pagination.current_page} dari {pagination.last_page}
            </span>
            <button
              onClick={() => {
                setPage(Math.min(pagination.last_page, page + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={page === pagination.last_page}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-outline-light text-on-surface hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:hover:border-outline-light disabled:hover:text-on-surface disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </main>

      {/* ================================================ */}
      {/* MODAL PENGUMUMAN (Glassmorphism)                 */}
      {/* ================================================ */}
      {selectedPengumuman && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={() => setSelectedPengumuman(null)}
          />
          
          {/* Modal Content */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-fadeUp border border-white/50">
            
            {/* Header Modal */}
            <div className="px-8 py-7 border-b border-slate-100 flex items-start justify-between bg-gradient-to-br from-slate-50 to-white">
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold font-sans flex items-center gap-1.5 uppercase tracking-wider">
                    {getKategoriIcon(selectedPengumuman.kategori)} {selectedPengumuman.kategori || 'Info'}
                  </span>
                  <span className="text-slate-500 text-sm font-sans flex items-center gap-1.5 font-medium">
                    <Calendar size={14} /> {formatDate(selectedPengumuman.tanggal_posting || selectedPengumuman.created_at)}
                  </span>
                </div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-slate-800 leading-tight">
                  {selectedPengumuman.judul_info}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedPengumuman(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-500 transition-colors shrink-0 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Body Modal */}
            <div className="p-8 overflow-y-auto custom-scrollbar bg-white flex-grow">
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-sans leading-relaxed whitespace-pre-wrap">
                {selectedPengumuman.isi_info}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedPengumuman(null)}
                className="btn-primary shadow-md hover:shadow-lg transition-all"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Pengumuman;
