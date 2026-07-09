import React, { useState } from 'react';
import { Search, User, FileText, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

const CekRapor: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    // Simulate API call for now or use actual if available
    api.get(`/cek-rapor?q=${searchQuery}`)
      .then(res => {
        setResults(res.data.santri || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error searching:", err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">


        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Cek Rapor Santri</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Masukkan nama lengkap atau nomor induk santri untuk melihat catatan hafalan dan rapor progres belajar secara detail.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center mb-12">
          <form onSubmit={handleSearch} className="flex w-full items-center">
            <div className="pl-4 text-slate-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ketik nama santri..."
              className="w-full bg-transparent border-none py-4 px-4 text-lg focus:outline-none focus:ring-0 text-slate-700"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-xl font-bold transition-colors disabled:opacity-70 whitespace-nowrap shrink-0"
            >
              {loading ? 'Mencari...' : 'Cari Data'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {searched && (
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Hasil Pencarian: <span className="text-emerald-700">{results.length} Santri</span> ditemukan
            </h3>

            {results.length === 0 && !loading ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                <User size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Santri tidak ditemukan. Coba gunakan kata kunci lain.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {results.map((santri) => (
                  <div key={santri.id_santri} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md hover:border-emerald-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                        {santri.nama_lengkap.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {santri.nama_lengkap}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><FileText size={14} /> NIS: {santri.nis || '-'}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {santri.alamat || 'Tidak ada data'}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-slate-50 text-emerald-700 border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                      Lihat Rapor <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CekRapor;
