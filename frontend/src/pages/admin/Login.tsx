import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call your API here and redirect on success
    // window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Left Side - Image/Illustration (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-emerald-800 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)" }}></div>
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors mb-12">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="font-serif font-bold text-3xl mb-2 tracking-wide">MSANTRI</div>
          <div className="text-emerald-200 text-sm uppercase tracking-widest">Sistem Informasi Santri</div>
        </div>

        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl lg:text-5xl font-bold font-serif leading-tight mb-6">
            Kelola data pendidikan dengan lebih mudah dan cepat.
          </h1>
          <p className="text-emerald-100 max-w-md text-lg">
            Akses dashboard khusus pengajar dan staf untuk memantau progres, mengisi rapor, dan melihat absensi santri.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-600/30 rounded-tl-full blur-3xl"></div>
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
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl transition-colors flex justify-center items-center gap-2 mt-4"
            >
              Masuk ke Dashboard <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-12 text-center lg:text-left text-sm text-slate-500">
            &copy; {new Date().getFullYear()} MSANTRI School Management System.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
