import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import Section7 from './components/Section7';
import Footer from './components/Footer';
import ig from './assets/img/ig.png';

// Komponen undangan lengkap
const FullInvitation = () => {
  const { slug } = useParams();

  return (
    <div className="w-full max-w-md bg-black text-white">
      <Section1 slug={slug} />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 slug={slug} />
      <Section6 slug={slug} />
      <Section7 />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
      <Routes>
        {/* Halaman awal */}
        <Route
          path="/"
          element={
            <div className="text-white p-10 text-center">
              Silakan buka undangan melalui link yang diberikan.
            </div>
          }
        />

        {/* Route undangan berdasarkan slug */}
        <Route path="/inv/:slug" element={<FullInvitation />} />

        {/* Halaman tidak ditemukan */}
        <Route
          path="*"
          element={
            <div className="text-white p-10 text-center">
              Halaman tidak ditemukan.
            </div>
          }
        />
      </Routes>

      {/* Footer tetap di bawah */}
      <div className="w-full max-w-md bg-[#0F0E83] p-6 mt-10 rounded-t-xl">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#8D8D93] font-dmsans leading-relaxed">
            A project by © 2025 <span className="font-bold">Raya Rayu</span><br />
            Developed by Euriko Studio
          </p>
          <img src={ig} alt="instagram" className="w-6 h-6 object-contain" />
        </div>
      </div>
    </div>
  );
}

export default App;