import React, { useState } from 'react';
import nadia from '../assets/img/Nadya.jpg';
import andra from '../assets/img/Andra.jpg';
import plus from '../assets/img/plus.svg';
import closeIcon from '../assets/img/close.svg';

const PersonCard = ({ name, title, image, showDetail, setShowDetail, detailContent }) => (
  <div className="relative rounded-xl overflow-hidden w-40 sm:w-44 h-60 sm:h-64">
    <img src={image} alt={name} className="w-full h-full object-cover" />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0F0E83] via-transparent to-transparent opacity-90">
      <div className="absolute top-3 right-3 z-20">
        <button onClick={() => setShowDetail(!showDetail)}>
          <img src={showDetail ? closeIcon : plus} alt="Toggle Detail" />
        </button>
      </div>

      <div className="absolute bottom-3 left-3 text-white">
        {!showDetail ? (
          <>
            <h1 className="text-2xl font-spicyrice leading-none">{name}</h1>
            <p className="text-sm font-dmsans mt-1">{title}</p>
          </>
        ) : (
          <div className="absolute bg-[#0F0E83] h-72 w-44 -top-64 -left-3 p-5 rounded-xl shadow-lg text-white z-30">
            {detailContent}
          </div>
        )}
      </div>
    </div>
  </div>
);

const Section2 = () => {
  const [showDetail1, setShowDetail1] = useState(false);
  const [showDetail2, setShowDetail2] = useState(false);

  return (
    <div className="bg-black text-white max-w-md p-5 md:p-12">
      <div className="pt-5">
        <h1 className="text-3xl font-spicyrice text-justify">
          Dua Pekerja Dunia Kreatif Merayakan Pernikahan!
        </h1>
        <p className="mt-2 text-sm font-dmsans text-[#8D8D93]">
          Ditulis dan disutradarai oleh Sang Pencipta, inilah dua lakon utama dari cerita menuju selamanya:
        </p>

        <div className="flex justify-center gap-5 mt-6">
          <PersonCard
            name="Nadya A. Faatihah"
            title="Copywriter"
            image={nadia}
            showDetail={showDetail1}
            setShowDetail={setShowDetail1}
            detailContent={
              <div className="relative text-white font-dmsans space-y-2">
                <button
                  onClick={() => setShowDetail1(false)}
                  className="absolute top-3 right-0"
                >
                  <img src={closeIcon} alt="Close" />
                </button>
                <div className='absolute top-12'>
                  <p className="text-sm text-white/70">Putra pertama dari</p>
                  <p className="text-md font-bold leading-tight">
                    Bpk. Sudarsono & Ibu Ea Siti Julaeha
                  </p>
                  <h1 className="text-2xl font-spicyrice mt-6 leading-tight">Nadya <br />
                    A. Faatihah.</h1>
                  <p className="text-xs text-white/60">Copywriter</p>
                </div>
              </div>
            }
          />
          <PersonCard
            name="Andra Gembara P."
            title="Graphic Designer"
            image={andra}
            showDetail={showDetail2}
            setShowDetail={setShowDetail2}
            detailContent={
              <div className="relative text-white font-dmsans space-y-2">
                <button
                  onClick={() => setShowDetail2(false)}
                  className="absolute top-3 right-0"
                >
                  <img src={closeIcon} alt="Close" />
                </button>
                <div className='absolute top-12'>
                  <p className="text-sm text-white/70">Putra pertama dari</p>
                  <p className="text-md font-bold leading-tight">
                    Bpk. Mudasir & Ibu Siti Maysarah
                  </p>
                  <h1 className="text-2xl font-spicyrice mt-12 leading-tight">Andra Gembara P.</h1>
                  <p className="text-xs text-white/60">Graphic Designer</p>
                </div>
              </div>
            }
          />
        </div>

        {/* Quotes */}
        <div className="border border-white border-opacity-40 p-4 rounded-2xl mt-16 mb-12">
          <h1 className="text-2xl font-spicyrice">Sinopsis:</h1>
          <p className="-mt-2 mb-2 opacity-40">_____________________________________</p>
          <p className="text-sm font-dmsans">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan
            Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <p className="-mt-2 mb-2 opacity-40">_____________________________________</p>
          <p className="text-base font-dmsans">(QS. Ar-Rum: 21)</p>
        </div>
      </div>
    </div>
  );
};
export default Section2;