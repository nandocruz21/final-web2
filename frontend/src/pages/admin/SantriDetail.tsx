import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { santriService } from '../../services/santriService';
import { ArrowLeft, User, Phone, MapPin, Calendar, FileText, Activity } from 'lucide-react';

const SantriDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [santri, setSantri] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      santriService.getById(id)
        .then(res => {
          if (res.data.status === 'success') {
            setSantri(res.data.data);
          }
        })
        .catch(err => {
          console.error("Gagal mengambil data", err);
          alert("Data tidak ditemukan");
          navigate('/admin/santri');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 md:p-8 flex-1 flex items-center justify-center">
          <p className="text-on-surface-variant animate-pulse">Memuat data profil...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!santri) return null;

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/admin/santri')}
            className="w-10 h-10 flex items-center justify-center bg-white border border-outline-light rounded-full hover:bg-surface-low transition-colors text-on-surface-variant shadow-sm"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="label-small text-gold mb-1">Profil Santri</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Detail Data</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kolom Kiri: Foto dan Info Singkat */}
          <div className="card-marble p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-gold/30 shadow-md bg-primary/10 text-primary flex items-center justify-center font-bold text-5xl overflow-hidden mb-4 relative">
              {(santri.nama_lengkap || 'U').charAt(0).toUpperCase()}
              {santri.foto && santri.foto !== 'default.png' && (
                <img 
                  src={`http://localhost:8000/uploads/${santri.foto}`} 
                  alt={santri.nama_lengkap} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
            </div>
            <h2 className="text-xl font-bold font-serif text-primary mb-1">{santri.nama_lengkap}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${
              santri.kehadiran === 'hadir' ? 'bg-primary/10 text-primary' :
              santri.kehadiran === 'sakit' ? 'bg-amber-100 text-amber-800' :
              santri.kehadiran === 'izin' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-700'
            }`}>
              {santri.kehadiran ? santri.kehadiran.charAt(0).toUpperCase() + santri.kehadiran.slice(1) : 'Hadir'}
            </span>
            <div className="w-full h-px bg-outline-light/60 my-2"></div>
            <div className="text-sm font-semibold text-primary mt-2">Capaian Hafalan Terkini</div>
            <p className="text-on-surface-variant font-medium">{santri.capaian_hafalan || '-'}</p>
          </div>

          {/* Kolom Kanan: Detail Lengkap */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="card-marble p-6">
              <h3 className="text-lg font-bold font-serif text-on-surface mb-4 border-b border-outline-light pb-2 flex items-center gap-2">
                <User size={18} className="text-gold" /> Informasi Pribadi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 font-semibold">Nama Lengkap</div>
                  <div className="text-sm font-medium text-on-surface">{santri.nama_lengkap}</div>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 font-semibold flex items-center gap-1"><Calendar size={14} /> TTL</div>
                  <div className="text-sm font-medium text-on-surface">{santri.tempat_lahir}, {santri.tanggal_lahir}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-xs text-on-surface-variant mb-1 font-semibold flex items-center gap-1"><MapPin size={14} /> Alamat Lengkap</div>
                  <div className="text-sm font-medium text-on-surface">{santri.alamat}</div>
                </div>
              </div>
            </div>

            <div className="card-marble p-6">
              <h3 className="text-lg font-bold font-serif text-on-surface mb-4 border-b border-outline-light pb-2 flex items-center gap-2">
                <Phone size={18} className="text-gold" /> Informasi Wali
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 font-semibold">Nama Orang Tua / Wali</div>
                  <div className="text-sm font-medium text-on-surface">{santri.nama_ortu || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 font-semibold">Nomor WhatsApp</div>
                  <div className="text-sm font-medium text-on-surface">{santri.no_wa_ortu || '-'}</div>
                </div>
              </div>
            </div>

            <div className="card-marble p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-bold font-serif text-primary mb-2 flex items-center gap-2">
                <FileText size={18} /> Catatan Pengajar
              </h3>
              <p className="text-sm font-medium text-on-surface-variant italic">
                "{santri.catatan_pengajar || 'Belum ada catatan untuk santri ini.'}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SantriDetail;
