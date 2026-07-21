import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Download } from 'lucide-react';
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
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="label-small text-gold mb-1">Pengelolaan Data</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Data Santri</h1>
          </div>
          <Link 
            to="/admin/santri/tambah" 
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Tambah Santri
          </Link>
        </div>

        <div className="card-marble overflow-hidden">
          <div className="p-4 border-b border-outline-light bg-surface-low flex items-center">
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant/60" />
              <input 
                type="text" 
                spellCheck={false}
                placeholder="Cari nama santri..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-outline-light rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold w-full font-sans transition-all"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-on-surface-variant font-sans">Memuat data santri...</div>
            ) : (
              <table className="w-full text-left text-sm text-on-surface font-sans">
                <thead className="bg-surface-low text-on-surface-variant font-semibold border-b border-outline-light">
                  <tr>
                    <th className="px-6 py-4">Foto</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Alamat</th>
                    <th className="px-6 py-4">Hafalan</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-light/60">
                  {filteredSantri.length > 0 ? (
                    filteredSantri.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-low/50 transition-colors">
                        <td className="px-6 py-4">
                          <img 
                            src={item.foto === 'default.png' ? '/placeholder-user.jpg' : `http://localhost:8000/uploads/${item.foto}`} 
                            alt={item.nama_lengkap} 
                            className="w-10 h-10 rounded-full object-cover border border-gold/30 shadow-sm"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-user.jpg' }}
                          />
                        </td>
                        <td className="px-6 py-4 font-bold text-on-surface">{item.nama_lengkap}</td>
                        <td className="px-6 py-4 truncate max-w-[150px] text-on-surface-variant">{item.alamat}</td>
                        <td className="px-6 py-4 text-primary font-semibold">{item.capaian_hafalan}</td>
                        <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                             item.kehadiran === 'hadir' ? 'bg-primary/10 text-primary border border-primary/20' :
                             item.kehadiran === 'sakit' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                             item.kehadiran === 'izin' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                             'bg-red-100 text-red-700 border border-red-200'
                           }`}>
                             {item.kehadiran ? item.kehadiran.charAt(0).toUpperCase() + item.kehadiran.slice(1) : 'Hadir'}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleDownloadPdf(item.id, item.nama_lengkap)}
                              className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 border border-purple-200 transition-colors"
                              title="Unduh Laporan PDF"
                            >
                              <Download size={16} />
                            </button>
                            <Link 
                              to={`/admin/santri/edit/${item.id}`}
                              className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 border border-blue-200 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-700 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
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
                      <td colSpan={6} className="px-6 py-10 text-center text-on-surface-variant font-sans">
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
