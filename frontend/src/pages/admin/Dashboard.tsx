import React, { useEffect, useState } from 'react';
import { Users, BookOpen, MapPin, Search, Bell, Settings, LogOut, FileText, CheckSquare, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    total_santri: 0,
    kelas_aktif: 12,
    hadir_hari_ini: 0,
    rapor_diperbarui: 0,
    recent_updates: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
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
      <div className="p-6 md:p-8 flex-1">
        <h1 className="text-2xl font-bold font-serif text-slate-900 mb-6">Ringkasan Aktivitas</h1>
        
        {loading ? (
          <div className="text-center py-10 text-slate-500">Memuat data...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Users size={24} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Santri</p>
                  <h3 className="text-2xl font-bold text-slate-900">{data.total_santri}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><BookOpen size={24} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Kelas Aktif</p>
                  <h3 className="text-2xl font-bold text-slate-900">{data.kelas_aktif}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><CheckSquare size={24} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Hadir Hari Ini</p>
                  <h3 className="text-2xl font-bold text-slate-900">{data.hadir_hari_ini}</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><FileText size={24} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Rapor Diperbarui</p>
                  <h3 className="text-2xl font-bold text-slate-900">{data.rapor_diperbarui}</h3>
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Pembaruan Hafalan Terbaru</h3>
                <button className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-6 py-3">Nama Santri</th>
                      <th className="px-6 py-3">Surah / Juz</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.recent_updates.length > 0 ? (
                      data.recent_updates.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-800">{item.nama_santri}</td>
                          <td className="px-6 py-4">{item.capaian_hafalan}</td>
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
                          <td className="px-6 py-4 text-slate-400">{item.waktu}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Belum ada riwayat pembaruan</td>
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
