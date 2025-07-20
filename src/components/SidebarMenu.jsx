import React from 'react';
import close from '../assets/img/menuclose.svg';

function SidebarMenu({ isOpen, onClose }) {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      onClose(); // Tutup sidebar setelah klik
    }
  };

  return (
    <div className={`fixed top-0 right-0 w-full h-full bg-[#0F0E83] text-white p-6 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="my-10 flex justify-between items-center mb-6">
        <h2 className="text-2xl font-dmsans font-bold">Menu</h2>
        <button onClick={onClose} className="text-white text-xl">
          <img src={close} alt="menuclose" />
        </button>
      </div>
      <h1 className="text-[70px] font-spicyrice leading-none mt-16 mb-6">RAYA RAYU ASMARA</h1>
      <ul className="space-y-4 text-sm font-dmsans">
        <div className='border-b border-white/50'/>
        <li onClick={() => handleScroll('section1')} className="border-b border-white/50 pb-2 cursor-pointer">Home</li>
        <li onClick={() => handleScroll('section4')} className="border-b border-white/50 pb-2 cursor-pointer">Kisah Kasih Kami</li>
        <li onClick={() => handleScroll('section5')} className="border-b border-white/50 pb-2 cursor-pointer">Mari Reservasi!</li>
        <li onClick={() => handleScroll('section6')} className="border-b border-white/50 pb-2 cursor-pointer">Kirim Kata & Doa</li>
        <li onClick={() => handleScroll('section7')} className="border-b border-white/50 pb-2 cursor-pointer">Arsip Romansa Kami</li>
      </ul>
      <div className="absolute flex items-center justify-center gap-3 bottom-6 text-xs opacity-80">
        <p>Digital Invitation by</p>
        <span className="bg-white/30 text-white rounded-full px-3 py-1 text-xs font-bold inline-block">
          Raya__Rayu
        </span>
      </div>
    </div>
  );
}

export default SidebarMenu;