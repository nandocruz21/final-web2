import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';
import { Printer, Calendar, Users, CheckSquare, BookOpen, FileText } from 'lucide-react';

const Laporan: React.FC = () => {
  const [data, setData] = useState({
    total_santri: 0,
    kelas_aktif: 0,
    hadir_hari_ini: 0,
    rapor_diperbarui: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => {
        if (res.data.status === 'success') {
          setData(res.data.data);
        }
      })
      .catch(err => console.error("Gagal mengambil data laporan", err))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-2xl font-bold font-serif text-slate-900">Laporan Statistik</h1>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <Printer size={18} /> Cetak Laporan
          </button>
        </div>

        {/* Print Area */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 print:border-none print:shadow-none print:p-0">
          <div className="text-center mb-8 border-b border-slate-200 pb-6 print:border-b-2 print:border-black">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Laporan Harian MSANTRI</h2>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Calendar size={18} />
              <span>{today}</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-slate-500 print:hidden">Memuat data laporan...</div>
          ) : (
            <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
              <div className="border border-slate-200 rounded-xl p-6 text-center print:border-slate-400">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 print:bg-transparent print:text-black">
                  <Users size={28} />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{data.total_santri}</h3>
                <p className="text-slate-500 font-medium">Total Santri Terdaftar</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 text-center print:border-slate-400">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 print:bg-transparent print:text-black">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{data.kelas_aktif}</h3>
                <p className="text-slate-500 font-medium">Kelas / Halaqoh Aktif</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 text-center print:border-slate-400">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 print:bg-transparent print:text-black">
                  <CheckSquare size={28} />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{data.hadir_hari_ini}</h3>
                <p className="text-slate-500 font-medium">Santri Hadir Hari Ini</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 text-center print:border-slate-400">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 print:bg-transparent print:text-black">
                  <FileText size={28} />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-1">{data.rapor_diperbarui}</h3>
                <p className="text-slate-500 font-medium">Total Aktivitas Rapor</p>
              </div>
            </div>
          )}

          <div className="mt-16 hidden print:block text-right">
            <div className="inline-block text-center">
              <p className="mb-16">Mengetahui,<br/>Kepala Pengelola</p>
              <p className="font-bold border-b border-slate-400 inline-block px-4">Ust. Ahmad Hidayat</p>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body { background: white; }
            nav, header, aside, .print\\:hidden { display: none !important; }
            main { margin: 0 !important; padding: 0 !important; }
            @page { margin: 2cm; }
          }
        `}} />
      </div>
    </AdminLayout>
  );
};

export default Laporan;
