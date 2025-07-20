import React, { useState } from 'react';
import gift from '../assets/img/gift.svg';
import love_fire2 from '../assets/img/love_fire2.svg';
import bca from '../assets/img/bca.svg';

const Section7 = () => {
  const [showDetail, setShowDetail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("2831210852");
    alert("Nomor rekening disalin!");
  };

  return (
    <div className='bg-black text-white max-w-md p-5 md:p-12 mt-4'>
      <div className='relative max-w-md bg-[#0F0E83] min-h-[221px] p-6 rounded-2xl'>
        {/* Header */}
        <div className='absolute top-6 left-6 flex items-center gap-2 text-sm font-dmsans'>
          <img src={love_fire2} alt="Love Fire Icon" className="w-5 h-5" />
          <h1 className='font-medium'>Titip Gift (Opsional)</h1>
        </div>

        {/* Content */}
        <div className='flex justify-center items-center h-full'>
          {!showDetail ? (
            <button onClick={() => setShowDetail(true)} className='mt-10'>
              <img src={gift} alt="Open Gift Detail" />
            </button>
          ) : (
            <div className='text-white w-full text-left mt-10 relative'>
              {/* Logo BCA muncul di kanan atas setelah diklik */}
              <div className='absolute top-0 right-0'>
                <img src={bca} alt="BCA Logo" className='w-12' />
              </div>

              <p className='text-sm font-dmsans text-white/60 mb-2'>No. Rekening</p>
              <h2 className='text-2xl font-semibold tracking-wide mb-2'>2831210852</h2>
              <p className='text-sm font-dmsans text-white/60'>Atas Nama</p>
              <div className='flex items-center justify-between mt-1'>
                <p className='font-dmsans'>Nadya A. Faatiha</p>
                <button
                  onClick={handleCopy}
                  className='text-sm bg-white text-[#0F0E83] px-4 py-1 rounded-full font-dmsans font-medium hover:opacity-90'
                >
                  Copy
                </button>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className='mt-4 text-xs underline text-white/60 hover:text-white'
              >
                Sembunyikan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section7;