import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Mail, MailOpen, Trash2, Search, CheckCircle2, X } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    api.get('/admin/pesan')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = (id: number) => {
    api.post(`/admin/pesan/${id}/baca`)
      .then(() => {
        setMessages(messages.map(m => m.id === id ? { ...m, is_read: 1 } : m));
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    api.delete(`/admin/pesan/${id}`)
      .then(() => {
        setMessages(messages.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      })
      .catch(err => console.error(err));
  };

  const openMessage = (msg: any) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      handleMarkAsRead(msg.id);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 flex-1 animate-fadeUp">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="label-small text-gold mb-1">Komunikasi Publik</p>
            <h1 className="text-3xl font-bold font-serif text-on-surface">Pesan Masuk</h1>
          </div>
          <div className="relative w-full md:w-64 font-sans">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
            <input 
              type="text" 
              spellCheck={false}
              placeholder="Cari pengirim atau subjek..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-outline-light rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
            />
          </div>
        </div>

        <div className="card-marble overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-surface-low border-b border-outline-light text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  <th className="p-4 w-12 text-center">Status</th>
                  <th className="p-4">Pengirim</th>
                  <th className="p-4">Subjek</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4 w-28 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-outline-light/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">Memuat pesan...</td>
                  </tr>
                ) : filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">Belum ada pesan masuk.</td>
                  </tr>
                ) : (
                  filteredMessages.map((msg) => (
                    <tr 
                      key={msg.id} 
                      className={`hover:bg-surface-low/50 transition-colors cursor-pointer ${!msg.is_read ? 'bg-primary/5 font-semibold' : ''}`}
                      onClick={() => openMessage(msg)}
                    >
                      <td className="p-4 text-center">
                        {!msg.is_read ? (
                          <Mail className="inline-block text-primary" size={18} />
                        ) : (
                          <MailOpen className="inline-block text-on-surface-variant/50" size={18} />
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-on-surface font-bold">{msg.name}</div>
                        <div className="text-on-surface-variant text-xs font-normal">{msg.phone}</div>
                      </td>
                      <td className="p-4 text-on-surface">{msg.subject}</td>
                      <td className="p-4 text-on-surface-variant font-normal">
                        {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                          className="w-8 h-8 rounded-md bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 flex items-center justify-center transition-colors mx-auto"
                          title="Hapus Pesan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail Pesan */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeUp">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMessage(null)} />
            <div className="bg-white rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl border border-outline-light overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 border-b border-outline-light flex items-center justify-between bg-surface-low">
                <div>
                  <p className="label-small text-gold">Detail Pesan</p>
                  <h3 className="font-serif font-bold text-2xl text-on-surface flex items-center gap-2">
                    <MailOpen size={20} className="text-primary" /> {selectedMessage.subject}
                  </h3>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-on-surface-variant hover:text-error text-2xl font-bold leading-none">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto font-sans">
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-outline-light">
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">Pengirim</p>
                    <p className="font-bold text-on-surface text-base">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">Kontak WhatsApp</p>
                    <p className="font-bold text-primary text-base">{selectedMessage.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Waktu Diterima</p>
                    <p className="font-medium text-on-surface-variant text-xs">
                      {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-3">Isi Pesan</p>
                  <div className="bg-surface-low p-5 rounded-xl text-on-surface whitespace-pre-wrap leading-relaxed text-sm border border-outline-light/80">
                    {selectedMessage.content}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-outline-light bg-surface-low flex justify-between items-center font-sans">
                <button 
                  onClick={() => {
                    window.open(`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`, '_blank');
                  }}
                  className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
                >
                  <CheckCircle2 size={16} /> Balas via WhatsApp
                </button>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-5 py-2 bg-white border border-outline-light text-on-surface-variant rounded-lg text-sm font-semibold hover:bg-surface-low transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MessageList;
