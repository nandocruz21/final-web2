import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { santriService } from '../../services/santriService';
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
    if (id) {
      santriService.getById(id)
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

      if (id) {
        // Method spoofing untuk Laravel karena PHP tidak membaca multipart/form-data pada request PUT murni
        data.append('_method', 'PUT');
        await santriService.update(id, data);
        alert('Data santri berhasil diperbarui!');
      } else {
        await santriService.create(data);
        alert('Data santri berhasil ditambahkan!');
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
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/admin/santri')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-outline-light rounded-full hover:bg-surface-low transition-colors text-on-surface-variant shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="label-small text-gold mb-0.5">Formulir Santri</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">
              {isEdit ? 'Edit Data Santri' : 'Tambah Santri Baru'}
            </h1>
          </div>
        </div>

        <div className="card-marble p-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri */}
              <div className="space-y-4 font-sans">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Nama Lengkap *</label>
                  <input required type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" placeholder="Masukkan nama lengkap santri" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Tempat Lahir *</label>
                  <input required type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" placeholder="Kota tempat lahir" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Tanggal Lahir *</label>
                  <input required type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Alamat Lengkap *</label>
                  <textarea required rows={3} name="alamat" value={formData.alamat} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none" placeholder="Alamat tinggal santri"></textarea>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4 font-sans">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Nama Orang Tua/Wali *</label>
                  <input required type="text" name="nama_ortu" value={formData.nama_ortu} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" placeholder="Nama ayah / ibu / wali" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">No. WhatsApp Wali *</label>
                  <input required type="text" name="no_wa_ortu" value={formData.no_wa_ortu} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" placeholder="Contoh: 081234567890" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Capaian Hafalan Terkini *</label>
                  <input required type="text" name="capaian_hafalan" value={formData.capaian_hafalan} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all" placeholder="Contoh: Juz 30 - An-Naba" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Upload Foto {!isEdit && '*'}</label>
                  <input type="file" required={!isEdit} accept="image/*" onChange={handleFileChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary file:text-sm file:font-semibold hover:file:bg-primary/20 transition-all" />
                  <p className="text-xs text-on-surface-variant mt-1">Format: JPG, PNG. Maksimal 2MB.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-light font-sans">
              <label className="block text-sm font-semibold text-on-surface mb-1">Catatan Pengajar *</label>
              <textarea required rows={3} name="catatan_pengajar" value={formData.catatan_pengajar} onChange={handleChange} className="w-full bg-surface-low border border-outline-light rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none" placeholder="Tuliskan catatan khusus atau pesan untuk wali santri..."></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
