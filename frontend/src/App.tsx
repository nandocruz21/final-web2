import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/public/Home';
import Pengumuman from './pages/public/Pengumuman';
import CekRapor from './pages/public/CekRapor';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import SantriList from './pages/admin/SantriList';
import SantriForm from './pages/admin/SantriForm';
import JadwalBelajar from './pages/public/JadwalBelajar';
import Statistik from './pages/public/Statistik';
import ProfilTpq from './pages/public/ProfilTpq';
import HubungiKami from './pages/public/HubungiKami';

import RaporList from './pages/admin/RaporList';
import Kehadiran from './pages/admin/Kehadiran';
import InformationList from './pages/admin/InformationList';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/cek-rapor" element={<CekRapor />} />
        <Route path="/jadwal" element={<JadwalBelajar />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/profil" element={<ProfilTpq />} />
        <Route path="/hubungi" element={<HubungiKami />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/santri" element={<SantriList />} />
        <Route path="/admin/santri/tambah" element={<SantriForm />} />
        <Route path="/admin/santri/edit/:id" element={<SantriForm />} />
        <Route path="/admin/rapor" element={<RaporList />} />
        <Route path="/admin/kehadiran" element={<Kehadiran />} />
        <Route path="/admin/pengumuman" element={<InformationList />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
