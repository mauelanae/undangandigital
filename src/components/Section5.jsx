import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import bg from '../assets/img/BG_Countdown.jpg';
import SidebarMenu from './SidebarMenu';
import closeIcon from '../assets/img/closex.svg';

const Section5 = () => {
  const { slug } = useParams();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const weddingDate = new Date('2025-08-30T09:00:00');

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [attendance, setAttendance] = useState('Belum Konfirmasi');
  const [jumlahHadir, setJumlahHadir] = useState(1);
  const [qrcode, setQrcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ confirm: false, qr: false });
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const res = await axios.get(`/api/invitations/${slug}`);
        const status = res.data.rsvp_status?.toLowerCase();
        setAttendance(status === 'hadir' ? 'Hadir' : status === 'tidak hadir' ? 'Tidak Hadir' : 'Belum Konfirmasi');
        setJumlahHadir(res.data.jumlah_real || 1);
        setQrcode(res.data.qrcode || '');
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setDataReady(true);
      }
    };

    if (slug) fetchGuestData();

    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) return clearInterval(interval);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [slug]);

  const handleKonfirmasiHadir = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(`/api/invitations/${slug}/kehadiran`, {
        rsvp_status: 'Hadir',
        jumlah_real: jumlahHadir,
      });
      setAttendance('Hadir');
      setQrcode(res.data.qrcode);
      setPopup({ confirm: false });
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan kehadiran.");
    } finally {
      setLoading(false);
    }
  };

  const handleTidakHadir = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/invitations/${slug}/kehadiran`, {
        hadir: 'Tidak Hadir',
        jumlah_real: 0,
      });
      setAttendance('Tidak Hadir');
      setQrcode('');
      alert("Terima kasih atas konfirmasinya.");

      // Scroll ke section doa
      setTimeout(() => {
        const doaSection = document.getElementById('doa');
        if (doaSection) doaSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan kehadiran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="section5" className="bg-black text-white max-w-md p-5 md:p-12 mx-auto">
       {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Countdown */}
      <div className="relative rounded-xl overflow-hidden border border-white/40 shadow-lg">
        <img src={bg} alt="Countdown Background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute top-10 inset-x-0 flex justify-center gap-4">
          {['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => {
            const val = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
            return (
              <div key={label} className="text-center">
                <div className="text-[45px] font-bold">{String(val).padStart(2, '0')}</div>
                <p className="text-sm">{label}</p>
              </div>
            );
          })}
        </div>
        <div className="absolute top-[390px] px-6 w-full">
          {attendance === 'Hadir' ? (
            <p className="text-[27px] font-semibold leading-tight">
              Sampai jumpa di <br /><strong>Raya Rayu Asmara!</strong>
            </p>
          ) : (
            <p className="text-xl font-semibold leading-tight">
              Kami ingin kamu hadir <br /> dalam perayaan ini. <br /> Mari reservasi?
            </p>
          )}
        </div>
      </div>

      {/* Konfirmasi */}
      {dataReady ? (
        attendance === 'Hadir' ? (
          <div className="bg-[#0F0E83] px-4 py-5 rounded-xl border border-white/30">
            <div className="flex gap-3">
              <button
                className="flex-1 bg-white text-[#0F0E83] font-bold py-2 px-8 rounded-xl"
                onClick={() => setPopup({ ...popup, qr: true })}
              >
                Lihat QR Code
              </button>
              <button
                className="flex-1 border border-white text-white py-2 -px-1 rounded-xl"
                onClick={() => setPopup({ ...popup, confirm: true })}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0F0E83] px-4 py-4 rounded-xl border border-white/30 flex justify-center gap-3">
            <button
              className="bg-white text-black font-semibold px-6 py-2 rounded-xl"
              onClick={() => setPopup({ ...popup, confirm: true })}
            >
              Ya, Hadir
            </button>
            <button
              className="border border-white px-6 py-2 rounded-xl"
              onClick={handleTidakHadir}
            >
              Tidak Hadir
            </button>
          </div>
        )
      ) : (
        <div className="text-center py-4">Memuat data...</div>
      )}

      {/* Popup Konfirmasi Hadir */}
      {popup.confirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#0F0E83] text-white p-6 rounded-2xl w-[90%] max-w-sm relative">
            <button className="absolute top-3 right-4" onClick={() => setPopup({ ...popup, confirm: false })}>×</button>
            <p className="mb-4 font-semibold">Bersama siapa kamu akan hadir?</p>
            <div className="flex gap-3 mb-4">
              {[1, 2].map(jumlah => (
                <button
                  key={jumlah}
                  className={`flex-1 p-4 rounded-xl border ${jumlahHadir === jumlah ? 'bg-white text-[#0F0E83]' : 'bg-[#1C1B99]'}`}
                  onClick={() => setJumlahHadir(jumlah)}
                >
                  <p className="text-sm">Datang</p>
                  <strong>{jumlah === 1 ? 'Sendiri' : 'Berdua'}</strong>
                </button>
              ))}
            </div>
            <button
              className="bg-white text-[#0F0E83] font-bold w-full py-2 rounded-xl"
              onClick={handleKonfirmasiHadir}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      {/* Popup QR Code */}
      {popup.qr && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-[#0F0E83] text-white p-6 rounded-2xl w-[90%] max-w-sm relative">
            <div className="flex justify-between mb-4">
              <p className="text-sm font-bold leading-tight">
                Tunjukkan QR Code ini pada<br />staf di meja penerima tamu
              </p>
              <button onClick={() => setPopup({ ...popup, qr: false })}>
                <img src={closeIcon} alt="Tutup" className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl flex justify-center items-center">
              {qrcode ? (
                <img src={qrcode} alt="QR Code" className="w-48 h-48 object-contain" />
              ) : (
                <p className="text-gray-400 italic text-sm">QR Code tidak tersedia</p>
              )}
            </div>
            <div className="mt-4 bg-white rounded-xl text-[#0F0E83] text-sm px-4 py-2 flex justify-between items-center">
              <div>
                <p className="text-xs">QR Code hanya berlaku untuk</p>
                <p className="font-bold">{jumlahHadir} Orang</p>
              </div>
              <div className="w-6 h-6 bg-[#E0E7FF] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0F0E83]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                      1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                      0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section5;