import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SidebarMenu from './SidebarMenu';
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../assets/img/slide1.jpg";
import slide2 from "../assets/img/slide2.jpg";
import slide3 from "../assets/img/slide3.jpg";
import slide4 from "../assets/img/slide4.jpg";

const Section4 = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const slides = [
    {
      episode: "EPISODE 1",
      title: "Impresi di Satu Divisi",
      desc: "Feb 2023 berkenalan, Andra di mata Nadya cuma mase graphic designer yang kurang friendly. Di mata Andra, Nadya copywriter yang sangat friendly.",
      image: slide1,
    },
    {
      episode: "EPISODE 2",
      title: "Yogyakarta & Surakarta",
      desc: "Di akhir 2023, dua kota dalam dua hari, Nadya & Andra jalan-jalan bareng teman lainnya. Dari sini, Andra termotivasi untuk mengungkap rasa sukanya pada Nadya. ",
      image: slide2,
    },
    {
      episode: "EPISODE 3",
      title: "Melesat Tepat di 2024",
      desc: "Pasca dua kota, berjam-jam telponan malam, berkali-kali rasa heran atas cocok yang ditemukan, dan pertemuan keluarga besar, pada 21 Desember 2024 kami bertunangan.",
      image: slide3,
    },
    {
      episode: "EPISODE 4",
      title: "2025 untuk Selamanya",
      desc: "Lewat ratusan dialog, ada doa dan tujuan pernikahan yang ingin kami wujudkan. Didasari niat baik untuk Sang Pencipta, 30 Agustus 2025 kami yakin untuk menikah.",
      image: slide4,
    },
  ];

  return (
    <div id="section4" className="bg-black text-white py-12 px-4 max-w-md mx-auto">
       {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay untuk menutup sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Judul */}
      <h2 className="text-3xl font-bold mb-6 font-dmsans">
        Kisah Kasih Kami
      </h2>

      {/* Carousel */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1.25}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#111] rounded-xl overflow-hidden shadow-md w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] mx-auto">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[134px] object-cover"
              />
              <div className="mt-3 px-3 pb-4 font-dmsans">
                <p className="text-xs font-semibold text-[#8D8D93]">{slide.episode}</p>
                <h3 className="text-sm font-semibold mt-1">{slide.title}</h3>
                <p className="text-xs text-[#8D8D93] mt-1">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Kalender dan Jadwal */}
      <div className="border border-white/40 rounded-2xl mt-10 overflow-hidden">
        <div className="p-4">
          <h1 className="text-6xl font-spicyrice leading-none">
            Hari <span className="font-dmsans text-2xl align-middle">Kami</span>
            <br /> Menikah
          </h1>

          {/* Kalender */}
          <div className="bg-[#0F0E83] text-white px-4 py-4 rounded-t-2xl mt-4">
            <h1 className="text-base font-dmsans font-bold">Agustus 2025</h1>
            <div className="grid grid-cols-7 gap-3 mt-2 text-center items-center font-dmsans">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum"].map((day, i) => (
                <div key={i}>
                  <p className="text-sm text-[#8D8D93]">{day}</p>
                  <p className="text-[17px] font-bold">{24 + i}</p>
                </div>
              ))}
              <div className="bg-red-600 text-white p-1 rounded-md">
                <p className="text-sm">Sab</p>
                <p className="text-[17px] font-bold">30</p>
              </div>
            </div>
          </div>

          {/* Jadwal Akad dan Resepsi */}
          <div className="bg-[#1C1C1E] px-4 py-4 rounded-b-2xl">
            {/* Akad */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="font-spicyrice text-2xl">Akad</h1>
                <p className="font-dmsans text-sm text-[#8D8D93]">
                  Hanya dihadiri oleh <br /> keluarga & kerabat
                </p>
              </div>
              <div className="text-end font-dmsans text-sm text-[#8D8D93]">
                <p>08.00 WIB <br /><span className="text-xs">s/d</span> 10.00 WIB</p>
              </div>
            </div>

            <div className="my-2 h-[1px] bg-white/20" />

            {/* Resepsi */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="font-spicyrice text-2xl">Resepsi</h1>
                <p className="font-dmsans text-sm text-[#8D8D93]">
                  Usai ijab, mari semua <br /> bersukacita bersama
                </p>
              </div>
              <div className="text-end font-dmsans text-sm text-[#8D8D93]">
                <p>11.00 WIB <br /><span className="text-xs">s/d</span> 13.30 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="bg-[#0F0E83] px-4 py-4 rounded-b-2xl">
          <div className="flex items-center justify-center gap-4">
            <button className="bg-white text-black font-bold px-6 py-2 rounded-xl">
              Lihat Lokasi
            </button>
            <a
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NzNrb3I1YjhtZGoyaTF2MXRodWUzcWVkZmUgbWF1ZWxhbmFlbWFkQG0&tmsrc=mauelanaemad%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-6 py-2 rounded-xl text-white text-center"
            >
              + Reminder
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;