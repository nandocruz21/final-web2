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
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-800 mb-1">Pesan Masuk</h1>
          <p className="text-slate-500 font-sans text-sm">Kelola semua pesan dari pengunjung atau wali santri.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari pesan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold font-sans">
                <th className="p-4 w-12 text-center">Status</th>
                <th className="p-4">Pengirim</th>
                <th className="p-4">Subjek</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 w-32 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Memuat pesan...</td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Tidak ada pesan.</td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer ${!msg.is_read ? 'bg-primary/5 font-semibold' : ''}`}
                    onClick={() => openMessage(msg)}
                  >
                    <td className="p-4 text-center">
                      {!msg.is_read ? (
                        <Mail className="inline-block text-primary" size={18} />
                      ) : (
                        <MailOpen className="inline-block text-slate-400" size={18} />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-slate-800">{msg.name}</div>
                      <div className="text-slate-500 text-xs font-normal">{msg.phone}</div>
                    </td>
                    <td className="p-4 text-slate-700">{msg.subject}</td>
                    <td className="p-4 text-slate-500 font-normal">
                      {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors mx-auto"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedMessage(null)} />
          <div className="bg-white rounded-2xl w-full max-w-2xl relative z-10 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-serif font-bold text-xl text-slate-800 flex items-center gap-2">
                <MailOpen size={20} className="text-primary" /> Detail Pesan
              </h3>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Pengirim</p>
                  <p className="font-medium text-slate-800">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Kontak</p>
                  <p className="font-medium text-slate-800">{selectedMessage.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Subjek</p>
                  <p className="font-medium text-slate-800">{selectedMessage.subject}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Tanggal</p>
                  <p className="font-medium text-slate-800">
                    {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Isi Pesan</p>
                <div className="bg-slate-50 p-5 rounded-xl text-slate-700 whitespace-pre-wrap leading-relaxed text-sm border border-slate-100">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button 
                onClick={() => {
                  window.open(`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`, '_blank');
                }}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Balas via WhatsApp
              </button>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors"
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
