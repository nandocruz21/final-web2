import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

const SantriList: React.FC = () => {
  const [santri, setSantri] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSantri = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/santri');
      if (response.data.status === 'success') {
        setSantri(response.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data santri", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSantri();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await api.delete(`/admin/santri/${id}`);
        if (response.data.status === 'success') {
          fetchSantri(); // Refresh list
        }
      } catch (error) {
        console.error("Gagal menghapus santri", error);
        alert("Gagal menghapus santri");
      }
    }
  };

  const handleDownloadPdf = async (id: number, nama: string) => {
    try {
      // Create an anchor element to trigger download
      const response = await api.get(`/admin/santri/${id}/report-pdf`, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan_santri_${nama}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Gagal mengunduh PDF", error);
      alert("Gagal mengunduh PDF");
    }
  };

  const filteredSantri = santri.filter(s => 
    s.nama_lengkap.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold font-serif text-slate-900">Data Santri</h1>
          <Link 
            to="/admin/santri/tambah" 
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={18} /> Tambah Santri
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari nama santri..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-slate-500">Memuat data...</div>
            ) : (
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Foto</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Alamat</th>
                    <th className="px-6 py-4">Hafalan</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSantri.length > 0 ? (
                    filteredSantri.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <img 
                            src={item.foto === 'default.png' ? '/placeholder-user.jpg' : `http://localhost:8000/uploads/${item.foto}`} 
                            alt={item.nama_lengkap} 
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{item.nama_lengkap}</td>
                        <td className="px-6 py-4 truncate max-w-[150px]">{item.alamat}</td>
                        <td className="px-6 py-4 text-emerald-700 font-medium">{item.capaian_hafalan}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                             item.kehadiran === 'hadir' ? 'bg-emerald-100 text-emerald-700' :
                             item.kehadiran === 'sakit' ? 'bg-amber-100 text-amber-700' :
                             item.kehadiran === 'izin' ? 'bg-blue-100 text-blue-700' :
                             'bg-red-100 text-red-700'
                           }`}>
                             {item.kehadiran.charAt(0).toUpperCase() + item.kehadiran.slice(1)}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleDownloadPdf(item.id, item.nama_lengkap)}
                              className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                              title="Unduh Laporan PDF"
                            >
                              <Download size={16} />
                            </button>
                            <Link 
                              to={`/admin/santri/edit/${item.id}`}
                              className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                        Tidak ada data santri ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SantriList;
