import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import SidebarMenu from './SidebarMenu';
import SendIcon from '../assets/img/send.svg';

const Section6 = () => {
  const { slug } = useParams();
  const [guestId, setGuestId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchGuest();
    fetchMessages();
  }, [slug]);

  const fetchGuest = async () => {
    try {
      const res = await axios.get(`/api/invitations/${slug}`);
      if (res.data && typeof res.data === 'object' && res.data.id) {
        setGuestId(res.data.id);
      }
    } catch (err) {
      console.error('❌ Gagal ambil data tamu:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/messages');
      setMessages(res.data || []);
    } catch (err) {
      console.error('❌ Gagal ambil pesan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestId || !message.trim()) return;

    try {
      await axios.post('/api/messages', {
        invitation_id: guestId,
        message: message.trim(),
      });
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error('❌ Gagal kirim pesan:', err);
    }
  };

  const groupMessagesByDate = () => {
    const grouped = {};
    messages.forEach((msg) => {
      if (!msg.created_at) return;

      const dateObj = new Date(msg.created_at);
      if (isNaN(dateObj.getTime())) return;

      const dateKey = dateObj.toISOString().split('T')[0]; // e.g. "2025-07-15"
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  const formatFullDate = (isoDateStr) => {
    const dateObj = new Date(isoDateStr);
    if (isNaN(dateObj.getTime())) return "Tanggal tidak valid";

    return dateObj.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const groupedMessages = groupMessagesByDate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="section6" className="bg-black text-white max-w-md p-5 md:p-12 mt-4 mx-auto">
       {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-white/40 p-6">
        <h1 className="text-6xl font-spicyrice leading-none">
          Kirim Kata <br />
          <span className="text-2xl font-dmsans">&</span> Kirim Doa
        </h1>
        <p className="text-sm font-dmsans mt-2 text-[#8D8D93]">
          Silakan sampaikan pesan, kesan, dan/atau harapan untuk kami~
        </p>

        {/* List Pesan */}
        <div className="space-y-8 my-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600">
          {isLoading ? (
            <p className="text-sm text-gray-400 text-center">Memuat pesan...</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center">Belum ada pesan.</p>
          ) : (
            Object.entries(groupedMessages).map(([date, msgList]) => (
              <div key={date}>
                <div className="text-center text-sm text-gray-400 my-2">
                  {formatFullDate(date)}
                </div>
                {msgList.map((msg) => (
                  <div key={msg.id} className="mb-3 p-3 bg-[#1C1C1E] rounded-xl">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{msg.guest_name} · {msg.rsvp_status || 'Tidak diketahui'}</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-sm text-gray-100 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Form Kirim Pesan */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center bg-gray-800 rounded-full px-3">
            <input
              type="text"
              className="w-full bg-transparent p-2 text-white placeholder-gray-400 focus:outline-none"
              placeholder={guestId ? "Tuliskan saja di sini..." : "Tamu tidak ditemukan"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!guestId}
            />
            <button
              type="submit"
              disabled={!guestId || !message.trim()}
              className="ml-2 w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center disabled:opacity-50"
            >
              <img src={SendIcon} alt="Kirim" className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Section6;