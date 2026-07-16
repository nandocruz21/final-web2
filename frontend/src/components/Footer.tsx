import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#004d34' }} className="text-white pt-16 pb-6 px-6 md:px-12 w-full mt-auto relative overflow-hidden">

      {/* Ornamen pola geometris halus di sudut */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 0L50 30L80 40L50 50L40 80L30 50L0 40L30 30L40 0Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10">

        {/* Kolom 1 — Brand */}
        <div className="space-y-5">
          <div>
            {/* Nama menggunakan Playfair Display */}
            <h3 className="font-serif text-3xl font-bold text-white mb-1">Miftahul Jannah</h3>
            {/* Tagline dengan aksen emas */}
            <p className="text-gold-dim italic font-sans text-sm">"Mari memperindah bacaan Al-Quran"</p>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-gold mb-3 uppercase tracking-widest text-xs">Alamat Lengkap</h4>
            <p className="text-white/70 text-sm leading-relaxed font-sans">
              Jl. Sultan Hasanuddin, Kel. Letwaru, RT.009<br />
              Kec. Kota Masohi, Kabupaten Maluku Tengah<br />
              Kode Pos 97511
            </p>
          </div>
        </div>

        {/* Kolom 2 — Tautan Cepat */}
        <div>
          <h4 className="font-sans font-semibold text-gold mb-5 uppercase tracking-widest text-xs">Tautan Cepat</h4>
          <ul className="space-y-3">
            {[
              { to: '/', label: 'Beranda Utama' },
              { to: '/cek-rapor', label: 'Cek Progres Santri' },
              { to: '/jadwal', label: 'Jadwal Pengajian' },
              { to: '/pengumuman', label: 'Papan Informasi' },
              { to: '/profil', label: 'Profil TPQ' },
            ].map(item => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-sans group"
                >
                  <ChevronRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 — Kontak */}
        <div>
          <h4 className="font-sans font-semibold text-gold mb-5 uppercase tracking-widest text-xs">Kontak & Sosial Media</h4>
          <p className="text-white/70 text-sm leading-relaxed font-sans mb-6">
            Hubungi kami via WhatsApp untuk pendaftaran santri baru atau pertanyaan seputar kegiatan TPQ.
          </p>
          {/* Ikon Sosial Media dengan border emas */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all duration-300">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all duration-300">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all duration-300">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="2" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all duration-300">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Garis pemisah dengan ornamen berlian emas di tengah */}
      <div className="max-w-7xl mx-auto mb-6 relative z-10">
        <div className="divider-gold">
          {/* Ornamen berlian kecil */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#a37c35" className="flex-shrink-0">
            <polygon points="6,0 12,6 6,12 0,6" />
          </svg>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <p className="text-white/40 text-xs font-sans tracking-wide">
          Copyright &copy; 2026 TPQ Miftahul Jannah · MSANTRI. All Rights Reserved.
        </p>
      </div>

      {/* Tombol WhatsApp melayang */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
        title="Chat WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
