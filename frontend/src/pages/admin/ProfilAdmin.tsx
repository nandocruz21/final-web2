import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Save, AlertCircle, Camera, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { authService } from '../../services/authService';

const ProfilAdmin: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fotoLoading, setFotoLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Ambil data admin saat ini
    authService.check()
      .then(res => {
        if (res.data.user) {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setAvatarUrl(res.data.user.avatar || null);
        }
      })
      .catch(err => console.error("Gagal mengambil data", err))
      .finally(() => setLoadingFetch(false));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password && password !== passwordConfirmation) {
      setError('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setLoading(true);
    authService.updateProfile({
      name,
      email,
      password: password || undefined
    })
      .then(res => {
        setMessage('Profil berhasil diperbarui!');
        setPassword('');
        setPasswordConfirmation('');
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || 'Gagal menyimpan profil.');
      })
      .finally(() => setLoading(false));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoLoading(true);
      
      const formData = new FormData();
      formData.append('foto', file);
      
      authService.updateFoto(formData)
        .then(res => {
          if (res.data.success) {
            setAvatarUrl(res.data.avatar);
            setMessage('Foto profil berhasil diperbarui!');
          }
        })
        .catch(err => {
          console.error(err);
          setError(err.response?.data?.message || 'Gagal mengunggah foto profil.');
        })
        .finally(() => {
          setFotoLoading(false);
          // Reset input file agar bisa memilih file yang sama lagi jika error
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto w-full animate-fadeUp">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-slate-800 mb-2">Pengaturan Profil</h1>
          <p className="text-slate-500 font-sans">Kelola informasi pribadi dan keamanan akun admin Anda.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative w-28 h-28 shrink-0">
                <div className="w-full h-full bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-4xl shadow-inner border-2 border-white overflow-hidden ring-4 ring-primary/5">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    name ? name.charAt(0).toUpperCase() : 'A'
                  )}
                </div>
                {fotoLoading && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1 mt-2">
                <h2 className="text-2xl font-bold text-slate-800 font-serif">{name || 'Administrator'}</h2>
                <p className="text-gold font-medium mb-4">Admin TPQ MSANTRI</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFotoChange} 
                  accept="image/*" 
                  capture="user" 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={fotoLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary hover:border-primary/30 transition-all shadow-sm active:scale-95 disabled:opacity-50 mt-3"
                >
                  <Camera size={16} />
                  {fotoLoading ? 'Mengunggah...' : 'Pilih Foto Profil'}
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
            
            {message && (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-start gap-3 border border-emerald-100 mb-6">
                <AlertCircle className="shrink-0 mt-0.5 text-emerald-500" size={18} />
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-100 mb-6">
                <AlertCircle className="shrink-0 mt-0.5 text-red-500" size={18} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {!message && !error && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100 mb-8">
                <AlertCircle className="shrink-0 mt-0.5 text-blue-500" size={18} />
                <p className="text-sm font-medium">Halaman ini digunakan untuk mengubah data login Anda. Pastikan menggunakan password yang kuat.</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 font-sans">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loadingFetch}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 font-sans">Alamat Email / Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loadingFetch}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-lg font-serif">Ganti Password</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 font-sans">Password Baru</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="Kosongkan jika tidak ingin diganti"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 font-sans">Konfirmasi Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="Ketik ulang password baru"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 flex justify-end">
              <button 
                type="submit"
                disabled={loading || loadingFetch}
                className="bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 font-semibold shadow-md shadow-primary/20 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <Save size={18} />
                )}
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilAdmin;
