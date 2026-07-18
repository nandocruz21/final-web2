import React, { useState, useEffect } from 'react';
import { Search, User, FileText, ChevronRight } from 'lucide-react';
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

  // Live Search Effect (mencari saat user mengetik)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
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
    }, 400); // 400ms delay agar tidak spam API

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /**
   * Menangani pengiriman form (ketika di-enter atau klik tombol)
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Progres Belajar</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Cek Rapor Santri</h1>
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Masukkan nama lengkap santri untuk melihat catatan hafalan dan progres belajar secara detail.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">

        {/* Kotak Pencarian */}
        <div className="card-marble p-2 flex items-center mb-12 border-outline-light">
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
          <div>
            <p className="font-sans text-sm text-on-surface-variant mb-5">
              Ditemukan:{' '}
              <span className="font-semibold text-primary">{results.length} Santri</span>
            </p>

            {results.length === 0 && !loading ? (
              <div className="text-center py-16 card-marble border-dashed">
                <User size={48} className="mx-auto text-outline-light mb-4" />
                <p className="font-serif text-lg text-on-surface mb-1">Santri Tidak Ditemukan</p>
                <p className="text-on-surface-variant font-sans text-sm">Coba gunakan kata kunci atau nama yang berbeda.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((santri) => (
                  <div key={santri.id} className="card-marble p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-gold/40 transition-all">
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
                          <span className="flex items-center gap-1"><FileText size={12} /> NIS: {santri.nis || '-'}</span>
                          <span>{santri.alamat || 'Tidak ada data'}</span>
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
            <p className="text-on-surface-variant font-sans text-sm">Masukkan nama lengkap atau NIS santri di kolom pencarian di atas.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CekRapor;
