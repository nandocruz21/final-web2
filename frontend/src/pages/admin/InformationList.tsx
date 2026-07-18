import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, LayoutGrid, Type, AlignLeft, Edit } from 'lucide-react';
import api from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const InformationList: React.FC = () => {
  const [informasi, setInformasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    kategori: 'PENGUMUMAN',
    judul_info: '',
    isi_info: ''
  });

  const fetchData = () => {
    setLoading(true);
    api.get('/admin/informasi')
      .then(res => setInformasi(res.data))
      .catch(err => console.error("Error fetching information:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const request = editId 
      ? api.put(`/admin/informasi/${editId}`, formData)
      : api.post('/admin/informasi', formData);
      
    request
      .then(() => {
        setIsModalOpen(false);
        setEditId(null);
        setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '' });
        fetchData();
      })
      .catch(err => {
        console.error("Error saving information:", err);
        alert("Gagal menyimpan pengumuman.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleEdit = (item: any) => {
    setFormData({
      kategori: item.kategori,
      judul_info: item.judul_info,
      isi_info: item.isi_info
    });
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      api.delete(`/admin/informasi/${id}`)
        .then(() => fetchData())
        .catch(err => {
          console.error("Error deleting information:", err);
          alert("Gagal menghapus pengumuman.");
        });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800 mb-1">Kelola Pengumuman</h1>
          <p className="text-slate-500 font-sans text-sm">Tambahkan dan kelola pengumuman untuk halaman publik.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Plus size={18} /> Tambah Pengumuman
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold w-16 text-center">No</th>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Judul Pengumuman</th>
                <th className="px-6 py-4 font-semibold text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading data...</td>
                </tr>
              ) : informasi.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                      <LayoutGrid size={24} className="text-slate-300" />
                    </div>
                    Belum ada data pengumuman.
                  </td>
                </tr>
              ) : (
                informasi.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-center text-slate-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDate(item.tanggal_posting || item.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{item.judul_info}</div>
                      <div className="text-slate-500 text-xs mt-1 truncate max-w-xs md:max-w-md">
                        {item.isi_info}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 p-2 rounded-lg transition-colors"
                          title="Edit Pengumuman"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Hapus Pengumuman"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah/Edit Pengumuman */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-fadeUp overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-serif font-bold text-xl text-slate-800">
                {editId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
              </h2>
              <button onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                  setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '' });
                }} 
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LayoutGrid size={18} className="text-slate-400" />
                    </div>
                    <select 
                      required
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-sans text-sm bg-white"
                    >
                      <option value="PENGUMUMAN">Pengumuman Umum</option>
                      <option value="AKADEMIK">Akademik</option>
                      <option value="ADMINISTRASI">Administrasi</option>
                      <option value="KEGIATAN">Kegiatan</option>
                      <option value="PRESTASI">Prestasi</option>
                    </select>
                  </div>
                </div>

                {/* Judul */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Pengumuman</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Type size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.judul_info}
                      onChange={(e) => setFormData({...formData, judul_info: e.target.value})}
                      placeholder="Contoh: Libur Semester Ganjil..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-sans text-sm"
                    />
                  </div>
                </div>

                {/* Isi */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Pengumuman</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <AlignLeft size={18} className="text-slate-400" />
                    </div>
                    <textarea 
                      required
                      rows={4}
                      value={formData.isi_info}
                      onChange={(e) => setFormData({...formData, isi_info: e.target.value})}
                      placeholder="Tuliskan isi pesan atau informasi secara detail..."
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-sans text-sm resize-y"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                    setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '' });
                  }}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default InformationList;
