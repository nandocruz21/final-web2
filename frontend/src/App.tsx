import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
// import CekRapor from './pages/public/CekRapor'; // Placeholder
// import AdminLogin from './pages/admin/Login'; // Placeholder
// import AdminDashboard from './pages/admin/Dashboard'; // Placeholder

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/cek-rapor" element={<CekRapor />} /> */}

        {/* Admin Auth */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

        {/* Admin Protected Routes */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
