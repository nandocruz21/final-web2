import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { publicService } from '../../services/publicService';

/**
 * Halaman Hubungi Kami (Kontak)
 * Berisi informasi alamat, peta, dan formulir kontak interaktif
 * untuk memudahkan wali santri atau pengunjung berkomunikasi dengan TPQ.
 */
const HubungiKami: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.subject || !formData.content) {
      alert('Mohon lengkapi semua kolom formulir.');
      return;
    }
    
    setLoading(true);
    try {
      // 1. Simpan ke database melalui API
      await publicService.submitContactMessage(formData);
      
      // 2. Tampilkan pesan sukses
      // Pesan WA sekarang dikirim melalui backend menggunakan Fonnte
      
      // Reset form
      setFormData({ name: '', phone: '', subject: '', content: '' });
      
      // Beritahu user
      alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
      
    } catch (error) {
      console.error('Gagal mengirim pesan:', error);
      alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      <Header />

      {/* Banner Halaman */}
      <div style={{ backgroundColor: '#004d34' }} className="py-14 px-6 md:px-12">
        <div className="max-w-6xl mx-auto animate-fadeUp">
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
          <div className="w-full lg:w-5/12 space-y-8 animate-fadeUp" style={{ animationDelay: '100ms' }}>
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
                    value: '+62 812 48678494 (Senin – Sabtu, 08:00–17:00)',
                  },
                  {
                    icon: <Mail size={20} />,
                    label: 'Email',
                    value: 'syahruddin.arsyad21@gmail.com',
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.20182955385!2d128.96476301094128!3d-3.300159741130591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6b99b53585e77f%3A0xdc14410626bcd21e!2sTPQ%20MIFTAHUL%20JANNAH!5e0!3m2!1sid!2sid!4v1784446613372!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi TPQ"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

          {/* Formulir Kontak */}
          <div className="w-full lg:w-7/12 animate-fadeUp" style={{ animationDelay: '200ms' }}>
            <div className="card-marble p-8 h-full">
              <p className="label-small text-gold mb-2">Kirim Pesan</p>
              <h3 className="font-serif text-2xl text-on-surface mb-1">Ada yang bisa kami bantu?</h3>
              <p className="text-on-surface-variant font-sans text-sm mb-7">Kami akan merespon pesan Anda secepatnya.</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="label-small text-on-surface-variant mb-2 block">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                    />
                  </div>
                  <div>
                    <label className="label-small text-on-surface-variant mb-2 block">Nomor Telepon</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="0812xxxx"
                      className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-small text-on-surface-variant mb-2 block">Subjek Pesan</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    placeholder="Tentang apa pesan Anda?"
                    className="w-full bg-transparent border-0 border-b-2 border-outline-light py-2.5 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>

                <div>
                  <label className="label-small text-on-surface-variant mb-2 block">Pesan Anda</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
                    className="w-full bg-surface-low border border-outline-light rounded-sm px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-on-surface-variant/40 mt-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                  {loading ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
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
