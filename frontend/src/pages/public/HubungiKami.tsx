import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

/**
 * Halaman Hubungi Kami (Kontak)
 * Berisi informasi alamat, peta, dan formulir kontak interaktif
 * untuk memudahkan wali santri atau pengunjung berkomunikasi dengan TPQ.
 */
const HubungiKami: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      {/* Banner Halaman */}
      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="label-small mb-3" style={{ color: '#a37c35' }}>Kontak</p>
          <h1 className="font-serif text-5xl font-bold mb-3" style={{ color: '#ffffff' }}>Hubungi Kami</h1>
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Punya pertanyaan atau butuh informasi lebih lanjut? Jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Informasi Kontak */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div>
              <p className="label-small text-gold mb-5">Informasi Kontak</p>
              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin size={20} />,
                    label: 'Alamat Lengkap',
                    value: 'Jl. Sultan Hasanuddin, Kel. Letwaru, RT.009, Kec. Kota Masohi, Kab. Maluku Tengah, 97511',
                  },
                  {
                    icon: <Phone size={20} />,
                    label: 'Telepon / WhatsApp',
                    value: '+62 812 3456 7890 (Senin – Sabtu, 08:00–17:00)',
                  },
                  {
                    icon: <Mail size={20} />,
                    label: 'Email',
                    value: 'info@msantri.sch.id',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary/10 text-primary rounded-md flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-on-surface text-sm">{item.label}</h4>
                      <p className="text-on-surface-variant font-sans text-sm mt-0.5 leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peta Lokasi */}
            <div className="rounded-md h-44 w-full relative overflow-hidden border border-outline-light">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                alt="Peta Lokasi"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 77, 52, 0.2)' }}>
                <button className="bg-white text-primary font-sans font-semibold px-4 py-2 rounded-sm text-sm shadow-md hover:bg-surface-low transition-colors">
                  Buka di Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* Formulir Kontak */}
          <div className="w-full lg:w-7/12">
            <div className="card-marble p-8 h-full">
              <p className="label-small text-gold mb-2">Kirim Pesan</p>
              <h3 className="font-serif text-2xl text-on-surface mb-1">Ada yang bisa kami bantu?</h3>
              <p className="text-on-surface-variant font-sans text-sm mb-7">Kami akan merespon pesan Anda secepatnya.</p>

              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="label-small text-on-surface-variant mb-2 block">Nama Lengkap</label>
                    {/* Input bergaya garis bawah emas dari design system */}
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                    />
                  </div>
                  <div>
                    <label className="label-small text-on-surface-variant mb-2 block">Nomor Telepon</label>
                    <input
                      type="text"
                      placeholder="0812xxxx"
                      className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-small text-on-surface-variant mb-2 block">Subjek Pesan</label>
                  <input
                    type="text"
                    placeholder="Tentang apa pesan Anda?"
                    className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>

                <div>
                  <label className="label-small text-on-surface-variant mb-2 block">Pesan Anda</label>
                  <textarea
                    rows={5}
                    placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
                    className="w-full bg-surface-low border border-outline-light rounded-sm px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-on-surface-variant/40 mt-2"
                  />
                </div>

                <button
                  type="button"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HubungiKami;
