import React, { useEffect, useState } from 'react';
import { Volume2, Users, CreditCard, Award, Calendar, ChevronRight, Search, Filter, Book, Info } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

/**
 * Halaman Papan Pengumuman
 * Menampilkan daftar berita, informasi akademik, dan kegiatan TPQ.
 * Dilengkapi dengan fitur filter kategori dan pencarian.
 */
const Pengumuman: React.FC = () => {
  const [pengumuman, setPengumuman] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua Kategori');
  const [selectedPengumuman, setSelectedPengumuman] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchPengumuman = () => {
    setLoading(true);
    let url = `/pengumuman?kategori=${selectedKategori}&page=${page}`;
    if (searchQuery) url += `&q=${searchQuery}`;

    api.get(url)
      .then(res => {
        setPengumuman(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page
        });
      })
      .catch(err => console.error("Error fetching pengumuman:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPengumuman();
  }, [selectedKategori, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPengumuman();
  };

  const getKategoriIcon = (kategori: string) => {
    switch (kategori?.toUpperCase()) {
      case 'AKADEMIK': return <Book size={18} />;
      case 'ADMINISTRASI': return <CreditCard size={18} />;
      case 'KEGIATAN': return <Users size={18} />;
      case 'PRESTASI': return <Award size={18} />;
      default: return <Info size={18} />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Informasi &amp; Berita</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Papan Pengumuman</h1>
          <p className="font-sans text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Informasi terbaru dan pembaruan penting mengenai kegiatan akademik dan administrasi TPQ.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex-grow w-full">

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <form onSubmit={handleSearch} className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengumuman..."
              className="w-full bg-white border border-outline-light rounded-sm py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button type="submit" className="hidden">Cari</button>
          </form>
          <div className="flex gap-3">
            <select 
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="bg-white border border-outline-light rounded-sm py-3 px-4 text-sm font-sans text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Semua Kategori</option>
              <option value="PENGUMUMAN">Pengumuman Umum</option>
              <option value="AKADEMIK">Akademik</option>
              <option value="ADMINISTRASI">Administrasi</option>
              <option value="KEGIATAN">Kegiatan</option>
              <option value="PRESTASI">Prestasi</option>
            </select>
            <button onClick={fetchPengumuman} className="btn-primary flex items-center gap-2 text-sm">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-marble p-6 animate-pulse min-h-[200px]">
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-20 bg-slate-300 rounded-full"></div>
                  <div className="h-6 w-24 bg-slate-300 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-slate-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-slate-300 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-slate-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : pengumuman.length === 0 ? (
          <div className="text-center py-16 card-marble border-dashed">
            <Info size={48} className="mx-auto text-outline-light mb-4" />
            <p className="font-serif text-lg text-on-surface mb-1">Tidak Ada Pengumuman</p>
            <p className="text-on-surface-variant font-sans text-sm">Belum ada informasi yang dipublikasikan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pengumuman.map((item) => (
              <div key={item.id} className="card-marble p-6 flex flex-col group hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 min-h-[220px]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold font-sans flex items-center gap-1.5 uppercase">
                    {getKategoriIcon(item.kategori)} {item.kategori || 'Info'}
                  </span>
                  <span className="text-on-surface-variant text-xs font-sans flex items-center gap-1">
                    <Calendar size={12} /> {formatDate(item.tanggal_posting || item.created_at)}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">
                  {item.judul_info}
                </h3>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-6 flex-grow">
                  {item.isi_info?.length > 120 ? item.isi_info.substring(0, 120) + '...' : item.isi_info}
                </p>
                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedPengumuman(item)}
                    className="text-gold font-sans font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Baca Selengkapnya <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && pagination.last_page > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center rounded-sm border border-outline-light text-on-surface-variant hover:bg-surface-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            <span className="text-sm font-sans text-on-surface-variant">
              Halaman {pagination.current_page} dari {pagination.last_page}
            </span>
            <button
              onClick={() => setPage(Math.min(pagination.last_page, page + 1))}
              disabled={page === pagination.last_page}
              className="w-10 h-10 flex items-center justify-center rounded-sm border border-outline-light text-on-surface-variant hover:bg-surface-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}

      </main>

      {/* Modal Detail Pengumuman */}
      {selectedPengumuman && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeUp">
          <div className="bg-surface rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-outline-light flex justify-between items-start bg-surface-mid">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold font-sans flex items-center gap-1.5 uppercase">
                    {getKategoriIcon(selectedPengumuman.kategori)} {selectedPengumuman.kategori || 'Info'}
                  </span>
                  <span className="text-on-surface-variant text-sm font-sans flex items-center gap-1.5">
                    <Calendar size={14} /> {formatDate(selectedPengumuman.tanggal_posting || selectedPengumuman.created_at)}
                  </span>
                </div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-on-surface leading-tight pr-8">
                  {selectedPengumuman.judul_info}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedPengumuman(null)} 
                className="text-on-surface-variant hover:text-on-surface bg-surface hover:bg-outline-light w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
              >
                &times;
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-slate max-w-none text-on-surface-variant font-sans leading-relaxed whitespace-pre-wrap">
                {selectedPengumuman.isi_info}
              </div>
            </div>

            <div className="px-8 py-5 border-t border-outline-light bg-surface-mid flex justify-end">
              <button 
                onClick={() => setSelectedPengumuman(null)}
                className="btn-primary"
              >
                Tutup
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
