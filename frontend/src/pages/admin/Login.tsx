import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { authService } from '../../services/authService';

/**
 * Halaman Login Pengelola (Admin)
 * Memungkinkan pengajar dan staf MSANTRI untuk masuk ke Dasbor 
 * menggunakan kredensial standar atau melalui akun Google (OAuth).
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await authService.login({
        username: email,
        password: password
      });

      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Gagal terhubung ke server. Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-surface flex font-sans text-on-surface">
      {/* Left Side - Image/Illustration (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#004d34] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Pola ornamen SVG yang elegan */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpolygon points='30,5 55,30 30,55 5,30'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}>
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-dim hover:text-gold transition-colors mb-6 text-sm font-sans font-medium group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
          </Link>
          <div className="font-serif font-bold text-3xl mb-1 text-white">MSANTRI</div>
          <div className="text-gold text-xs uppercase tracking-[0.2em] font-sans font-semibold">Sistem Informasi Manajemen</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold font-serif leading-tight mb-4 text-white">
            Kelola TPQ dengan <span className="text-gold italic">lebih mudah</span> dan cepat.
          </h1>
          <p className="text-white/70 max-w-sm text-sm leading-relaxed font-sans">
            Akses Dasbor Admin khusus pengelola dan pengajar untuk memantau progres hafalan, mengisi rapor, dan mengatur jadwal kegiatan santri secara *real-time*.
          </p>
        </div>
        
        {/* Decorative elements (Cahaya emas di sudut bawah) */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold/20 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative overflow-y-auto">
        {/* Ornamen latar belakang tipis */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-md w-full card-marble p-6 sm:px-8 sm:py-6 relative z-10 animate-fade-in-up">
          <div className="text-center lg:text-left mb-6">
            <div className="lg:hidden font-serif font-bold text-2xl text-primary mb-2">MSANTRI</div>
            <p className="label-small text-gold mb-1">Login Pengelola</p>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-on-surface mb-2">Selamat Datang</h2>
            <p className="text-on-surface-variant font-sans text-sm">Silakan masuk menggunakan akun admin Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
                {errorMsg}
              </div>
            )}
            <div>
              <label className="label-small text-on-surface-variant mb-1 block">Email atau Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-gold transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@msantri.com"
                  className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2 pl-9 pr-4 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40 [color-scheme:light] [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label-small text-on-surface-variant block">Password</label>
                <a href="#" className="text-xs font-medium text-gold hover:text-gold-dim transition-colors">Lupa Sandi?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-gold transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2 pl-9 pr-10 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40 [color-scheme:light] [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset]"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-on-surface-variant hover:text-gold transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center mt-3">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline-light text-primary focus:ring-primary/20 bg-transparent" />
              <label htmlFor="remember" className="ml-2 text-sm text-on-surface-variant font-sans">Ingat sesi saya</label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`btn-primary w-full flex justify-center items-center gap-2 mt-5 py-2.5 text-sm ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Memproses...' : (
                <>Masuk ke Dasbor <ArrowRight size={16} /></>
              )}
            </button>
            
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-outline-light"></div>
              <span className="flex-shrink-0 mx-4 text-on-surface-variant text-xs font-sans">Atau masuk dengan</span>
              <div className="flex-grow border-t border-outline-light"></div>
            </div>

            <div className="flex justify-center pb-1">
              <GoogleLoginButton 
                onSuccess={handleGoogleSuccess} 
                onError={(err: any) => setErrorMsg(err || 'Gagal terhubung dengan akun Google.')}
              />
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs font-sans text-on-surface-variant">
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
    onSuccess: (tokenResponse: any) => onSuccess(tokenResponse),
    onError: () => onError('Login failed'),
  });

  return (
    <button 
      type="button"
      onClick={() => login()}
      className="flex items-center justify-center gap-3 bg-surface-low border border-outline-light text-on-surface font-sans font-medium text-sm py-3 px-4 rounded-sm w-full hover:border-gold/40 hover:bg-gold/5 transition-colors group"
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
      Lanjutkan dengan Google
    </button>
  );
};

export default Login;
