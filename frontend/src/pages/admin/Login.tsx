import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (tokenResponse: any) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('http://localhost:8000/api/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: tokenResponse.access_token
        })
      });

      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Gagal login dengan akun Google.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      // API call requires full URL or relying on axios base url, but we'll import api
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex font-sans text-on-surface">
      {/* Left Side - Image/Illustration (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#004d34] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Pola ornamen SVG yang elegan */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpolygon points='30,5 55,30 30,55 5,30'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}>
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-dim hover:text-gold transition-colors mb-12 text-sm font-sans font-medium group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
          </Link>
          <div className="font-serif font-bold text-4xl mb-1 text-white">MSANTRI</div>
          <div className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold">Sistem Informasi Manajemen</div>
        </div>

        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl lg:text-5xl font-bold font-serif leading-tight mb-6 text-white">
            Kelola TPQ dengan <span className="text-gold italic">lebih mudah</span> dan cepat.
          </h1>
          <p className="text-white/70 max-w-md text-sm leading-relaxed font-sans">
            Akses Dasbor Admin khusus pengelola dan pengajar untuk memantau progres hafalan, mengisi rapor, dan mengatur jadwal kegiatan santri secara *real-time*.
          </p>
        </div>
        
        {/* Decorative elements (Cahaya emas di sudut bawah) */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden font-serif font-bold text-2xl text-emerald-800 mb-2">MSANTRI</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Selamat Datang</h2>
            <p className="text-slate-500">Silakan masuk menggunakan akun pengelola Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200">
                {errorMsg}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email atau Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@msantri.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors">Lupa Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500/20" />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">Ingat Saya</label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2 mt-4 ${
                loading ? 'bg-emerald-600 cursor-not-allowed' : 'bg-emerald-800 hover:bg-emerald-900'
              }`}
            >
              {loading ? 'Memproses...' : (
                <>Masuk ke Dashboard <ArrowRight size={18} /></>
              )}
            </button>
            
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Atau masuk dengan</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLoginButton 
                onSuccess={handleGoogleSuccess} 
                onError={(err: any) => setErrorMsg(err || 'Gagal terhubung dengan akun Google.')}
              />
            </div>
          </form>
          
          <div className="mt-12 text-center lg:text-left text-sm text-slate-500">
            &copy; {new Date().getFullYear()} MSANTRI School Management System.
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom button component to use the useGoogleLogin hook for access_token
const GoogleLoginButton = ({ onSuccess, onError }: { onSuccess: Function, onError: Function }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse),
    onError: () => onError('Login failed'),
  });

  return (
    <button 
      type="button"
      onClick={() => login()}
      className="flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-xl w-full hover:bg-slate-50 transition-colors"
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};

export default Login;
