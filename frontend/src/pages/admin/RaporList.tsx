import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { Search, Plus, Trash2, Edit } from 'lucide-react';

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
  const [santriList, setSantriList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    student_id: '',
    capaian_hafalan: '',
    catatan_pengajar: '',
    kehadiran: 'hadir'
  });

  useEffect(() => {
    fetchRapor();
    fetchSantri();
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

  const fetchSantri = async () => {
    try {
      const res = await api.get('/admin/santri');
      if (res.data.status === 'success') {
        setSantriList(res.data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data santri", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const request = editId 
      ? api.put(`/admin/rapor/${editId}`, formData)
      : api.post('/admin/rapor', formData);
      
    request
      .then(() => {
        setIsModalOpen(false);
        setEditId(null);
        setFormData({ student_id: '', capaian_hafalan: '', catatan_pengajar: '', kehadiran: 'hadir' });
        fetchRapor();
      })
      .catch(err => {
        console.error("Error saving rapor:", err);
        alert("Gagal menyimpan rapor.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleEdit = (item: RaporItem) => {
    setFormData({
      student_id: item.student_id.toString(),
      capaian_hafalan: item.capaian_hafalan,
      catatan_pengajar: item.catatan_pengajar || '',
      kehadiran: item.kehadiran || 'hadir'
    });
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus riwayat rapor ini?")) {
      api.delete(`/admin/rapor/${id}`)
        .then(() => fetchRapor())
        .catch(err => {
          console.error("Error deleting rapor:", err);
          alert("Gagal menghapus rapor.");
        });
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
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
            
            <button 
              onClick={() => {
                setEditId(null);
                setFormData({ student_id: '', capaian_hafalan: '', catatan_pengajar: '', kehadiran: 'hadir' });
                setIsModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium font-sans flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all w-full md:w-auto shrink-0"
            >
              <Plus size={20} />
              Tambah Rapor
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Nama Santri</th>
                  <th className="px-6 py-4">Kehadiran</th>
                  <th className="px-6 py-4">Capaian Hafalan</th>
                  <th className="px-6 py-4">Catatan Pengajar</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-10">Memuat data...</td></tr>
                ) : filteredRapor.length > 0 ? (
                  filteredRapor.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{item.nama_santri}</td>
                      <td className="px-6 py-4 uppercase text-xs font-semibold">
                        <span className={`px-2 py-1 rounded-md ${
                          item.kehadiran === 'hadir' ? 'bg-emerald-100 text-emerald-700' :
                          item.kehadiran === 'sakit' ? 'bg-blue-100 text-blue-700' :
                          item.kehadiran === 'izin' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.kehadiran}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-emerald-700">{item.capaian_hafalan}</td>
                      <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate" title={item.catatan_pengajar}>
                        {item.catatan_pengajar || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 p-2 rounded-lg transition-colors"
                            title="Edit Rapor"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Hapus Rapor"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500">
                      {search ? 'Tidak ada riwayat yang cocok dengan pencarian.' : 'Belum ada riwayat pembaruan rapor.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Tambah/Edit Rapor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-fadeUp overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-serif font-bold text-xl text-slate-800">
                {editId ? 'Edit Rapor Santri' : 'Tambah Rapor Santri'}
              </h2>
              <button onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                }} 
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                
                {!editId && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Santri</label>
                    <select 
                      required
                      value={formData.student_id}
                      onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="" disabled>-- Pilih Nama Santri --</option>
                      {santriList.map(s => (
                        <option key={s.id} value={s.id}>{s.nama_lengkap}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status Kehadiran</label>
                  <select 
                    required
                    value={formData.kehadiran}
                    onChange={(e) => setFormData({...formData, kehadiran: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="sakit">Sakit</option>
                    <option value="izin">Izin</option>
                    <option value="alpha">Alpha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Capaian Hafalan</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: An-Naba ayat 1-15"
                    value={formData.capaian_hafalan}
                    onChange={(e) => setFormData({...formData, capaian_hafalan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Catatan Pengajar (Opsional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Contoh: Tajwid perlu diperbaiki di huruf dho"
                    value={formData.catatan_pengajar}
                    onChange={(e) => setFormData({...formData, catatan_pengajar: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                  }}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Rapor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default RaporList;
