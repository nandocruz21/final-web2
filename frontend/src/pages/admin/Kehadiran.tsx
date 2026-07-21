import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface Santri {
  id: number;
  nama_lengkap: string;
  kehadiran: 'hadir' | 'izin' | 'sakit' | 'alpha';
  capaian_hafalan: string;
}

const Kehadiran: React.FC = () => {
  const [santri, setSantri] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSantri();
  }, []);

  const fetchSantri = async () => {
    try {
      const res = await api.get('/admin/santri');
      if (res.data.status === 'success') {
        setSantri(res.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data santri", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await api.post(`/admin/santri/${id}/status`, { status });
      if (res.data.status === 'success') {
        setSantri(prev => prev.map(s => s.id === id ? { ...s, kehadiran: status as any } : s));
      }
    } catch (error) {
      console.error("Gagal update status", error);
      alert("Gagal menyimpan kehadiran.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredSantri = santri.filter(s => 
    s.nama_lengkap.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="label-small text-gold mb-1">Presensi Santri</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Absensi Kehadiran Santri</h1>
          </div>
          
          <div className="relative w-full md:w-72 font-sans">
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant/60" />
            <input 
              type="text" 
              spellCheck={false}
              placeholder="Cari nama santri..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
            />
          </div>
        </div>

        <div className="card-marble overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface">
              <thead className="bg-surface-low text-on-surface-variant font-semibold border-b border-outline-light">
                <tr>
                  <th className="px-6 py-4 w-1/3">Nama Santri</th>
                  <th className="px-6 py-4 w-1/4">Capaian Terakhir</th>
                  <th className="px-6 py-4 text-center">Status Kehadiran Hari Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-light/60">
                {loading ? (
                  <tr><td colSpan={3} className="text-center py-12 text-on-surface-variant">Memuat data santri...</td></tr>
                ) : filteredSantri.length > 0 ? (
                  filteredSantri.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-on-surface">{item.nama_lengkap}</td>
                      <td className="px-6 py-4 text-primary font-medium truncate max-w-[200px]">{item.capaian_hafalan || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'hadir')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                              item.kehadiran === 'hadir' 
                                ? 'bg-primary text-white shadow-sm border border-primary-dark' 
                                : 'bg-surface-low text-on-surface hover:bg-primary/10 hover:text-primary border border-outline-light/60'
                            }`}
                          >
                            <CheckCircle2 size={16} /> Hadir
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'izin')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                              item.kehadiran === 'izin' 
                                ? 'bg-blue-600 text-white shadow-sm border border-blue-700' 
                                : 'bg-surface-low text-on-surface hover:bg-blue-50 hover:text-blue-600 border border-outline-light/60'
                            }`}
                          >
                            <Clock size={16} /> Izin
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'sakit')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                              item.kehadiran === 'sakit' 
                                ? 'bg-amber-600 text-white shadow-sm border border-amber-700' 
                                : 'bg-surface-low text-on-surface hover:bg-amber-50 hover:text-amber-600 border border-outline-light/60'
                            }`}
                          >
                            <AlertCircle size={16} /> Sakit
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'alpha')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                              item.kehadiran === 'alpha' 
                                ? 'bg-red-600 text-white shadow-sm border border-red-700' 
                                : 'bg-surface-low text-on-surface hover:bg-red-50 hover:text-red-600 border border-outline-light/60'
                            }`}
                          >
                            <XCircle size={16} /> Alpa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-on-surface-variant font-sans">
                      Tidak ada santri yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Kehadiran;
