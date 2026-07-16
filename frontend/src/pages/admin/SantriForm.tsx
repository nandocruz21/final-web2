import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { ArrowLeft, Save } from 'lucide-react';

const SantriForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    nama_ortu: '',
    no_wa_ortu: '',
    capaian_hafalan: '',
    catatan_pengajar: ''
  });
  const [foto, setFoto] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit) {
      api.get(`/admin/santri/${id}`)
        .then(res => {
          if (res.data.status === 'success') {
            const santri = res.data.data;
            setFormData({
              nama_lengkap: santri.nama_lengkap || '',
              tempat_lahir: santri.tempat_lahir || '',
              tanggal_lahir: santri.tanggal_lahir || '',
              alamat: santri.alamat || '',
              nama_ortu: santri.nama_ortu || '',
              no_wa_ortu: santri.no_wa_ortu || '',
              capaian_hafalan: santri.capaian_hafalan || '',
              catatan_pengajar: santri.catatan_pengajar || ''
            });
          }
        })
        .catch(err => {
          console.error("Gagal mengambil data", err);
          alert("Data tidak ditemukan");
          navigate('/admin/santri');
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (foto) {
        data.append('foto', foto);
      }

      if (isEdit) {
        // Karena form-data dan method PUT agak tricky di Laravel, kita pakai trik _method
        data.append('_method', 'PUT');
        await api.post(`/admin/santri/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Data berhasil diperbarui!');
      } else {
        await api.post('/admin/santri', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Data berhasil ditambahkan!');
      }
      
      navigate('/admin/santri');
    } catch (error: any) {
      console.error("Gagal menyimpan", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/admin/santri')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold font-serif text-slate-900">
            {isEdit ? 'Edit Data Santri' : 'Tambah Santri Baru'}
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap *</label>
                  <input required type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Lahir *</label>
                  <input required type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir *</label>
                  <input required type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap *</label>
                  <textarea required rows={3} name="alamat" value={formData.alamat} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Orang Tua/Wali *</label>
                  <input required type="text" name="nama_ortu" value={formData.nama_ortu} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">No. WhatsApp Wali *</label>
                  <input required type="text" name="no_wa_ortu" value={formData.no_wa_ortu} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Contoh: 081234567890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Capaian Hafalan Terkini *</label>
                  <input required type="text" name="capaian_hafalan" value={formData.capaian_hafalan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Contoh: Juz 30 - An-Naba" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload Foto {!isEdit && '*'}</label>
                  <input type="file" required={!isEdit} accept="image/*" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-emerald-100 file:text-emerald-700 file:text-sm file:font-semibold hover:file:bg-emerald-200" />
                  <p className="text-xs text-slate-500 mt-1">Format: JPG, PNG. Maksimal 2MB.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-1">Catatan Pengajar *</label>
              <textarea required rows={3} name="catatan_pengajar" value={formData.catatan_pengajar} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Tuliskan catatan khusus atau pesan untuk wali santri..."></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                <Save size={18} /> {loading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SantriForm;
