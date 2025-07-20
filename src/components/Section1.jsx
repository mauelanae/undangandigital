import React, { useEffect, useState } from 'react';
import SidebarMenu from './SidebarMenu';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import icon1 from '../assets/img/burger_bar.svg';
import love from '../assets/img/love_fire.svg';
import image1 from '../assets/img/BG_Cover.jpg';

function Section1() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState('Tamu Undangan');

  useEffect(() => {
    if (slug) {
      axios.get(`/api/invitations/${slug}`)
        .then(res => setName(res.data.name || 'Tamu Undangan'))
        .catch(() => setName('Tamu Undangan'));
    }
  }, [slug]);

  return (
    <div id="section1" className="relative bg-black text-white max-w-md p-5 md:p-12">
      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="pt-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Halo,</p>
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
          {/* Tombol Burger */}
          <button onClick={() => setSidebarOpen(true)}>
            <img src={icon1} alt="Menu" />
          </button>
        </div>

        {/* Card */}
        <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg mt-8 border border-white/40">
          <div className="relative">
            <img src={image1} alt="Background" className="w-full h-auto" />
            <div className="absolute top-7 flex flex-col justify-center px-4 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold font-spicyrice leading-tight">
                Nadya<br />& Andra
              </h1>
              <p className="mt-48 sm:mt-40 text-sm sm:text-base leading-snug">
                Lewat undangan ini, kami ingin kamu<br /> menjadi bagian dari:
              </p>
              <h2 className="text-[60px] font-spicyrice font-extrabold text-justify leading-none tracking-wide">
                RAYA RAYU ASMARA
              </h2>
            </div>
          </div>

          {/* Lokasi & Tanggal */}
          <div className="bg-[#0F0E83] text-white px-4 py-4 rounded-b-2xl">
            <div className="flex items-center gap-4">
              <img src={love} alt="love" className="w-12" />
              <div className="flex-1">
                <p className="text-sm text-white opacity-50">Bandung</p>
                <p className="text-md font-bold leading-tight">30 Agustus 2025</p>
                <p className="text-sm text-white opacity-50">Ballroom Kartika Sari</p>
              </div>
              <button
                onClick={() => {
                  const section = document.getElementById("section5");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-white text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-indigo-100"
              >
                Reservasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;