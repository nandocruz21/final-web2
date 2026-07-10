import React from 'react';
import { Users, BookOpen, MapPin, Search, Bell, Settings, LogOut, FileText, CheckSquare, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-emerald-100 hidden md:flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6">
          <div className="font-serif font-bold text-2xl text-white tracking-wide mb-1">MSANTRI</div>
          <div className="text-emerald-400 text-xs uppercase tracking-widest">Panel Pengelola</div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <a href="#" className="flex items-center gap-3 bg-emerald-800/50 text-white px-4 py-3 rounded-xl font-medium transition-colors">
            <Home size={20} /> Dashboard Utama
          </a>
          <a href="#" className="flex items-center gap-3 text-emerald-200 hover:bg-emerald-800/30 hover:text-white px-4 py-3 rounded-xl font-medium transition-colors">
            <Users size={20} /> Data Santri
          </a>
          <a href="#" className="flex items-center gap-3 text-emerald-200 hover:bg-emerald-800/30 hover:text-white px-4 py-3 rounded-xl font-medium transition-colors">
            <BookOpen size={20} /> Rapor Hafalan
          </a>
          <a href="#" className="flex items-center gap-3 text-emerald-200 hover:bg-emerald-800/30 hover:text-white px-4 py-3 rounded-xl font-medium transition-colors">
            <CheckSquare size={20} /> Kehadiran
          </a>
          <a href="#" className="flex items-center gap-3 text-emerald-200 hover:bg-emerald-800/30 hover:text-white px-4 py-3 rounded-xl font-medium transition-colors">
            <FileText size={20} /> Laporan
          </a>
        </nav>
        
        <div className="p-4 mt-auto">
          <Link to="/" className="flex items-center justify-center gap-2 w-full bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm">
            <LogOut size={16} /> Keluar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="font-semibold text-lg md:hidden">MSANTRI</div>
          <div className="hidden md:flex relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari santri atau laporan..." 
              className="bg-slate-100 border-none rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-700"><Bell size={20} /></button>
            <button className="text-slate-400 hover:text-slate-700"><Settings size={20} /></button>
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8 flex-1">
          <h1 className="text-2xl font-bold font-serif text-slate-900 mb-6">Ringkasan Aktivitas</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Users size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Santri</p>
                <h3 className="text-2xl font-bold text-slate-900">245</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><BookOpen size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Kelas Aktif</p>
                <h3 className="text-2xl font-bold text-slate-900">12</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><CheckSquare size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Hadir Hari Ini</p>
                <h3 className="text-2xl font-bold text-slate-900">198</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><FileText size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Rapor Diperbarui</p>
                <h3 className="text-2xl font-bold text-slate-900">45</h3>
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
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">Ahmad Fauzan</td>
                    <td className="px-6 py-4">Juz 30 - An-Naba</td>
                    <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">Lancar</span></td>
                    <td className="px-6 py-4 text-slate-400">10 mnt lalu</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">Siti Aisyah</td>
                    <td className="px-6 py-4">Juz 29 - Al-Mulk</td>
                    <td className="px-6 py-4"><span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">Perlu Ulang</span></td>
                    <td className="px-6 py-4 text-slate-400">1 jam lalu</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">Budi Santoso</td>
                    <td className="px-6 py-4">Juz 30 - Al-Mutaffifin</td>
                    <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">Lancar</span></td>
                    <td className="px-6 py-4 text-slate-400">2 jam lalu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
