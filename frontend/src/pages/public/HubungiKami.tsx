import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const HubungiKami: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Punya pertanyaan atau butuh informasi lebih lanjut? Jangan ragu untuk menghubungi tim administrasi kami.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Informasi Kontak */}
          <div className="w-full lg:w-5/12 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Alamat Lengkap</h4>
                    <p className="text-slate-600 mt-1">Jl. Pendidikan No. 123, Komplek Islamic Center, Kec. Makassar, Kota Makassar, 90222</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Telepon / WhatsApp</h4>
                    <p className="text-slate-600 mt-1">+62 812 3456 7890</p>
                    <p className="text-slate-600">Senin - Sabtu (08:00 - 17:00)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email</h4>
                    <p className="text-slate-600 mt-1">info@msantri.sch.id</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Peta (Placeholder) */}
            <div className="bg-slate-200 rounded-2xl h-48 w-full relative overflow-hidden border border-slate-300">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Map Location" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                 <button className="bg-white px-4 py-2 rounded-lg font-bold text-sm shadow text-slate-700 hover:text-emerald-700 transition">Buka di Google Maps</button>
               </div>
            </div>
          </div>

          {/* Formulir Kontak */}
          <div className="w-full lg:w-7/12">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Kirim Pesan</h3>
              <p className="text-slate-500 mb-8">Kami akan merespon pesan Anda secepatnya.</p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                    <input type="text" placeholder="Masukkan nama" className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon</label>
                    <input type="text" placeholder="0812xxxx" className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subjek Pesan</label>
                  <input type="text" placeholder="Pilih subjek" className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pesan Anda</label>
                  <textarea rows={5} placeholder="Tuliskan pertanyaan atau pesan Anda di sini..." className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"></textarea>
                </div>

                <button type="button" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <Send size={18} /> Kirim Pesan Sekarang
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
