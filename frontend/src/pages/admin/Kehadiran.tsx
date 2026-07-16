import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface Santri {
  id: number;
  nama_lengkap: string;
  kehadiran: 'hadir' | 'izin' | 'sakit' | 'alpa';
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
        // Update local state directly for fast UI
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
      <div className="p-6 md:p-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold font-serif text-slate-900">Absensi Kehadiran Santri</h1>
          
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama santri..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 w-1/3">Nama Santri</th>
                  <th className="px-6 py-4 w-1/4">Capaian Terakhir</th>
                  <th className="px-6 py-4 text-center">Status Hari Ini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={3} className="text-center py-10">Memuat data...</td></tr>
                ) : filteredSantri.length > 0 ? (
                  filteredSantri.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{item.nama_lengkap}</td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{item.capaian_hafalan}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'hadir')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                              item.kehadiran === 'hadir' 
                                ? 'bg-emerald-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                          >
                            <CheckCircle2 size={16} /> Hadir
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'izin')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                              item.kehadiran === 'izin' 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            <Clock size={16} /> Izin
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'sakit')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                              item.kehadiran === 'sakit' 
                                ? 'bg-amber-500 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                            }`}
                          >
                            <AlertCircle size={16} /> Sakit
                          </button>
                          
                          <button 
                            onClick={() => handleUpdateStatus(item.id, 'alpa')}
                            disabled={updatingId === item.id}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                              item.kehadiran === 'alpa' 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600'
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
                    <td colSpan={3} className="text-center py-10 text-slate-500">
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
