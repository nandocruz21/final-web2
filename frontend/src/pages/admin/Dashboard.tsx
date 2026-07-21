import React, { useEffect, useState } from 'react';
import { Users, FileText, CheckSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { dashboardService } from '../../services/dashboardService';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    total_santri: 0,
    hadir_hari_ini: 0,
    alpa_hari_ini: 0,
    recent_updates: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getStats()
      .then(res => {
        if (res.data.status === 'success') {
          setData(res.data.data);
        }
      })
      .catch(err => console.error("Gagal mengambil data dashboard", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="label-small text-gold mb-1">Ringkasan Aktivitas</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Dashboard Utama</h1>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-marble p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Stats Cards dengan Gaya Marble Emerald */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="card-marble p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-sans">Total Santri</p>
                  <h3 className="text-3xl font-bold font-serif text-on-surface mt-0.5">{data.total_santri}</h3>
                </div>
              </div>
              
              <div className="card-marble p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckSquare size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-sans">Hadir Hari Ini</p>
                  <h3 className="text-3xl font-bold font-serif text-on-surface mt-0.5">{data.hadir_hari_ini}</h3>
                </div>
              </div>

              <div className="card-marble p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-sans">Alpa Hari Ini</p>
                  <h3 className="text-3xl font-bold font-serif text-on-surface mt-0.5">{data.alpa_hari_ini}</h3>
                </div>
              </div>
            </div>

            {/* Recent Activity Table dengan card-marble */}
            <div className="card-marble overflow-hidden">
              <div className="px-6 py-5 border-b border-outline-light flex justify-between items-center bg-surface-low">
                <div>
                  <h3 className="font-serif font-bold text-lg text-on-surface">Pembaruan Hafalan Terbaru</h3>
                  <p className="text-xs text-on-surface-variant font-sans">Aktivitas terkini rapor santri</p>
                </div>
                <Link to="/admin/rapor" className="text-xs font-bold text-primary hover:text-primary-dark font-sans flex items-center gap-1">
                  Lihat Semua <ChevronRight size={14} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-on-surface font-sans">
                  <thead className="bg-surface-low text-on-surface-variant font-semibold border-b border-outline-light">
                    <tr>
                      <th className="px-6 py-3.5">Nama Santri</th>
                      <th className="px-6 py-3.5">Surah / Juz</th>
                      <th className="px-6 py-3.5">Status Kehadiran</th>
                      <th className="px-6 py-3.5">Waktu Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-light/60">
                    {data.recent_updates.length > 0 ? (
                      data.recent_updates.map((item, index) => (
                        <tr key={index} className="hover:bg-surface-low/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-on-surface">{item.nama_santri}</td>
                          <td className="px-6 py-4 text-primary font-medium">{item.capaian_hafalan}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold font-sans ${
                              item.kehadiran === 'hadir' ? 'bg-primary/10 text-primary border border-primary/20' :
                              item.kehadiran === 'sakit' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                              item.kehadiran === 'izin' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                              {item.kehadiran ? item.kehadiran.charAt(0).toUpperCase() + item.kehadiran.slice(1) : 'Hadir'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant/70 text-xs">{item.waktu}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-on-surface-variant font-sans">
                          Belum ada riwayat pembaruan hafalan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
