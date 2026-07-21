import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, LayoutGrid, Type, AlignLeft, Edit, AlertTriangle } from 'lucide-react';
import { informationService } from '../../services/informationService';
import AdminLayout from '../../components/AdminLayout';

const InformationList: React.FC = () => {
  const [informasi, setInformasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [formData, setFormData] = useState({
    kategori: 'PENGUMUMAN',
    judul_info: '',
    isi_info: '',
    is_urgent: false
  });

  const fetchData = () => {
    setLoading(true);
    informationService.getAll(page)
      .then(res => {
        setInformasi(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page
        });
      })
      .catch(err => console.error("Error fetching information:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const request = editId 
      ? informationService.update(editId, formData)
      : informationService.create(formData);
      
    request
      .then(() => {
        setIsModalOpen(false);
        setEditId(null);
        setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '', is_urgent: false });
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
      isi_info: item.isi_info,
      is_urgent: item.is_urgent === 1 || item.is_urgent === true
    });
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      informationService.delete(id)
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
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="label-small text-gold mb-1">Publikasi Informasi</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Kelola Pengumuman</h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Tambah Pengumuman
          </button>
        </div>

        <div className="card-marble overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface font-sans">
              <thead className="bg-surface-low text-on-surface-variant font-semibold border-b border-outline-light">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">No</th>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Judul Pengumuman</th>
                  <th className="px-6 py-4 text-center w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-light/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">Memuat data pengumuman...</td>
                  </tr>
                ) : informasi.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant flex flex-col items-center">
                      <div className="w-16 h-16 bg-surface-low rounded-full flex items-center justify-center mb-3 text-gold">
                        <LayoutGrid size={24} />
                      </div>
                      Belum ada data pengumuman.
                    </td>
                  </tr>
                ) : (
                  informasi.map((item, index) => (
                    <tr key={item.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="px-6 py-4 text-center text-on-surface-variant font-medium">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <Calendar size={14} className="text-gold" />
                          {formatDate(item.tanggal_posting || item.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-on-surface flex items-center gap-2">
                          {item.judul_info}
                          {item.is_urgent ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase tracking-wider">
                              <AlertTriangle size={10} /> Darurat
                            </span>
                          ) : null}
                        </div>
                        <div className="text-on-surface-variant text-xs mt-1 truncate max-w-xs md:max-w-md">
                          {item.isi_info}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 border border-blue-200 transition-colors"
                            title="Edit Pengumuman"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-700 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
                            title="Hapus Pengumuman"
                          >
                            <Trash2 size={16} />
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

        {/* Pagination Controls */}
        {pagination.last_page > 1 && (
          <div className="flex justify-between items-center mt-6 font-sans">
            <div className="text-xs text-on-surface-variant">
              Halaman <strong className="text-on-surface">{pagination.current_page}</strong> dari <strong className="text-on-surface">{pagination.last_page}</strong>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-outline-light rounded-lg text-sm font-semibold text-on-surface bg-white hover:bg-surface-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sebelumnya
              </button>
              <button
                onClick={() => setPage(Math.min(pagination.last_page, page + 1))}
                disabled={page === pagination.last_page}
                className="px-4 py-2 border border-outline-light rounded-lg text-sm font-semibold text-on-surface bg-white hover:bg-surface-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form Tambah/Edit Pengumuman */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeUp">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-outline-light overflow-hidden">
            <div className="px-6 py-5 border-b border-outline-light flex justify-between items-center bg-surface-low">
              <div>
                <p className="label-small text-gold">Konten Publikasi</p>
                <h2 className="font-serif font-bold text-2xl text-on-surface">
                  {editId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
                </h2>
              </div>
              <button onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                  setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '', is_urgent: false });
                }} 
                className="text-on-surface-variant hover:text-error text-2xl font-bold leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 font-sans">
              <div className="space-y-4">
                
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Kategori *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
                      <LayoutGrid size={16} />
                    </div>
                    <select 
                      required
                      value={formData.kategori}
                      onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-low border border-outline-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-sm"
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
                  <label className="block text-sm font-semibold text-on-surface mb-1">Judul Pengumuman *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
                      <Type size={16} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={formData.judul_info}
                      onChange={(e) => setFormData({...formData, judul_info: e.target.value})}
                      placeholder="Contoh: Libur Semester Ganjil..."
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-low border border-outline-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Isi */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Isi Pengumuman *</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3.5 pointer-events-none text-on-surface-variant/60">
                      <AlignLeft size={16} />
                    </div>
                    <textarea 
                      required
                      rows={4}
                      value={formData.isi_info}
                      onChange={(e) => setFormData({...formData, isi_info: e.target.value})}
                      placeholder="Tuliskan isi pesan atau informasi secara detail..."
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-low border border-outline-light rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-sm resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Checkbox Darurat */}
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="is_urgent"
                    checked={formData.is_urgent}
                    onChange={(e) => setFormData({...formData, is_urgent: e.target.checked})}
                    className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500 cursor-pointer"
                  />
                  <label htmlFor="is_urgent" className="text-xs font-semibold text-red-900 cursor-pointer select-none flex items-center gap-2 w-full">
                    <AlertTriangle size={14} className="text-red-600" />
                    Tandai sebagai Pengumuman Darurat (Penting)
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-outline-light">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                    setFormData({ kategori: 'PENGUMUMAN', judul_info: '', isi_info: '', is_urgent: false });
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
