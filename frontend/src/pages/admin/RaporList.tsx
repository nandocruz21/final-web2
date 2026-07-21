import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { raporService } from '../../services/raporService';
import { santriService } from '../../services/santriService';
import { Search, Plus, Trash2, Edit, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

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
  
  // Filter & Pagination State
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
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
  }, [page, dateFilter, search]);

  useEffect(() => {
    fetchSantri();
  }, []);

  const fetchRapor = async () => {
    setLoading(true);
    try {
      const res = await raporService.getAll(page, dateFilter, search);
      if (res.data.status === 'success') {
        setRapor(res.data.data.data);
        setTotalPages(res.data.data.last_page);
      }
    } catch (error) {
      console.error("Gagal mengambil data rapor", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSantri = async () => {
    try {
      const res = await santriService.getAll();
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
      ? raporService.update(editId, formData)
      : raporService.create(formData);
      
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
      raporService.delete(id)
        .then(() => fetchRapor())
        .catch(err => {
          console.error("Error deleting rapor:", err);
          alert("Gagal menghapus rapor.");
        });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value);
    setPage(1);
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="label-small text-gold mb-1">Capaian & Evaluasi</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Riwayat Rapor Hafalan</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Filter Tanggal */}
            <div className="relative w-full md:w-48">
              <Calendar size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant/60" />
              <input 
                type="date" 
                value={dateFilter}
                onChange={handleDateChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold font-sans text-on-surface"
              />
            </div>

            {/* Pencarian */}
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-on-surface-variant/60" />
              <input 
                type="text" 
                spellCheck={false}
                placeholder="Cari nama santri..." 
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold font-sans"
              />
            </div>
            
            <button 
              onClick={() => {
                setEditId(null);
                setFormData({ student_id: '', capaian_hafalan: '', catatan_pengajar: '', kehadiran: 'hadir' });
                setIsModalOpen(true);
              }}
              className="btn-primary flex items-center justify-center gap-2 shrink-0"
            >
              <Plus size={18} />
              Tambah Rapor
            </button>
          </div>
        </div>

        <div className="card-marble overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface font-sans">
              <thead className="bg-surface-low text-on-surface-variant font-semibold border-b border-outline-light">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Nama Santri</th>
                  <th className="px-6 py-4">Kehadiran</th>
                  <th className="px-6 py-4">Capaian Hafalan</th>
                  <th className="px-6 py-4">Catatan Pengajar</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-light/60">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-12 text-on-surface-variant">Memuat data rapor...</td></tr>
                ) : rapor.length > 0 ? (
                  rapor.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-on-surface-variant/80 font-medium">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">{item.nama_santri}</td>
                      <td className="px-6 py-4 text-xs font-semibold">
                        <span className={`px-3 py-1 rounded-full ${
                          item.kehadiran === 'hadir' ? 'bg-primary/10 text-primary border border-primary/20' :
                          item.kehadiran === 'sakit' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          item.kehadiran === 'izin' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {item.kehadiran ? item.kehadiran.charAt(0).toUpperCase() + item.kehadiran.slice(1) : 'Hadir'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">{item.capaian_hafalan}</td>
                      <td className="px-6 py-4 text-on-surface-variant italic max-w-xs truncate" title={item.catatan_pengajar}>
                        {item.catatan_pengajar || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 border border-blue-200 transition-colors"
                            title="Edit Rapor"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-700 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
                            title="Hapus Rapor"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-on-surface-variant font-sans">
                      {search || dateFilter ? 'Tidak ada riwayat yang cocok dengan pencarian.' : 'Belum ada riwayat pembaruan rapor.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-outline-light flex items-center justify-between bg-surface-low font-sans">
              <span className="text-xs text-on-surface-variant">
                Halaman <strong className="text-on-surface">{page}</strong> dari <strong className="text-on-surface">{totalPages}</strong>
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-outline-light bg-white text-on-surface hover:bg-surface-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-outline-light bg-white text-on-surface hover:bg-surface-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form Tambah/Edit Rapor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeUp">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-outline-light overflow-hidden">
            <div className="px-6 py-5 border-b border-outline-light flex justify-between items-center bg-surface-low">
              <div>
                <p className="label-small text-gold">Input Nilai</p>
                <h2 className="font-serif font-bold text-2xl text-on-surface">
                  {editId ? 'Edit Rapor Santri' : 'Tambah Rapor Santri'}
                </h2>
              </div>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                }} 
                className="text-on-surface-variant hover:text-error text-2xl font-bold leading-none"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 font-sans">
              <div className="space-y-4">
                
                {!editId && (
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1">Pilih Santri *</label>
                    <select 
                      required
                      value={formData.student_id}
                      onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                      className="w-full px-4 py-2.5 bg-surface-low border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    >
                      <option value="" disabled>-- Pilih Nama Santri --</option>
                      {santriList.map(s => (
                        <option key={s.id} value={s.id}>{s.nama_lengkap}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Status Kehadiran *</label>
                  <select 
                    required
                    value={formData.kehadiran}
                    onChange={(e) => setFormData({...formData, kehadiran: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-low border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="sakit">Sakit</option>
                    <option value="izin">Izin</option>
                    <option value="alpha">Alpha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Capaian Hafalan *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: An-Naba ayat 1-15"
                    value={formData.capaian_hafalan}
                    onChange={(e) => setFormData({...formData, capaian_hafalan: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-low border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Catatan Pengajar (Opsional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Contoh: Tajwid perlu diperbaiki di huruf dho"
                    value={formData.catatan_pengajar}
                    onChange={(e) => setFormData({...formData, catatan_pengajar: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface-low border border-outline-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-outline-light">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                  }}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-low transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-primary text-sm py-2.5 px-6 disabled:opacity-50"
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
