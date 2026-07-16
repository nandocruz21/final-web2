import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { Search } from 'lucide-react';

interface RaporItem {
  id: number;
  student_id: number;
  nama_santri: string;
  capaian_hafalan: string;
  catatan_pengajar: string;
  kehadiran: string;
  tanggal: string;
}

const RaporList: React.FC = () => {
  const [rapor, setRapor] = useState<RaporItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRapor();
  }, []);

  const fetchRapor = async () => {
    try {
      const res = await api.get('/admin/rapor');
      if (res.data.status === 'success') {
        setRapor(res.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data rapor", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRapor = rapor.filter(r => 
    r.nama_santri.toLowerCase().includes(search.toLowerCase()) || 
    r.capaian_hafalan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold font-serif text-slate-900">Riwayat Rapor Hafalan</h1>
          
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari santri atau surah..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Nama Santri</th>
                  <th className="px-6 py-4">Capaian Hafalan</th>
                  <th className="px-6 py-4">Catatan Pengajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-10">Memuat data...</td></tr>
                ) : filteredRapor.length > 0 ? (
                  filteredRapor.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{item.nama_santri}</td>
                      <td className="px-6 py-4 font-medium text-emerald-700">{item.capaian_hafalan}</td>
                      <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate" title={item.catatan_pengajar}>
                        {item.catatan_pengajar || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-slate-500">
                      {search ? 'Tidak ada riwayat yang cocok dengan pencarian.' : 'Belum ada riwayat pembaruan rapor.'}
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

export default RaporList;
