import React from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#104b3a] text-white pt-16 pb-6 px-6 md:px-12 w-full mt-auto relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Column 1 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-2">Miftahul Jannah</h3>
            <p className="text-emerald-100 italic">"Mari memperindah bacaan Al-Quran"</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Alamat Lengkap</h4>
            <p className="text-emerald-50 leading-relaxed text-sm">
              Jl. Sultan Hasanuddin, Kel. Letwaru, RT.009<br/>
              Kec. Kota Masohi, Kabupaten Maluku Tengah<br/>
              Kode Pos 97511
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xl font-bold mb-6">Tautan Cepat</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-emerald-50 hover:text-white transition flex items-center gap-2 text-sm">
                <ChevronRight size={16} className="text-emerald-400" /> Beranda Utama
              </Link>
            </li>
            <li>
              <Link to="/cek-rapor" className="text-emerald-50 hover:text-white transition flex items-center gap-2 text-sm">
                <ChevronRight size={16} className="text-emerald-400" /> Cek Progres Santri
              </Link>
            </li>
            <li>
              <Link to="/jadwal" className="text-emerald-50 hover:text-white transition flex items-center gap-2 text-sm">
                <ChevronRight size={16} className="text-emerald-400" /> Jadwal Pengajian
              </Link>
            </li>
            <li>
              <Link to="/pengumuman" className="text-emerald-50 hover:text-white transition flex items-center gap-2 text-sm">
                <ChevronRight size={16} className="text-emerald-400" /> Papan Informasi
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xl font-bold mb-6">Kontak & Informasi</h4>
          <p className="text-emerald-50 leading-relaxed text-sm mb-6">
            Hubungi kami via WhatsApp untuk pendaftaran santri baru atau jika ada pertanyaan seputar kegiatan TPQ.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-emerald-500/50 flex items-center justify-center hover:bg-emerald-800 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-emerald-500/50 flex items-center justify-center hover:bg-emerald-800 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-emerald-500/50 flex items-center justify-center hover:bg-emerald-800 transition">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-emerald-500/50 flex items-center justify-center hover:bg-emerald-800 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-emerald-800 pt-6 text-center">
        <p className="text-emerald-300 text-sm">
          Copyright &copy; 2026 TPQ Miftahul Jannah. All Rights Reserved.
        </p>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </footer>
  );
};

export default Footer;
