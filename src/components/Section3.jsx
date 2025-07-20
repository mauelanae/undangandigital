import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../assets/img/Cover_Video_Envelope.jpg";
import slide2 from "../assets/img/Cover_Video_Shared_Forever.jpg";
import icontv from "../assets/img/icontv.svg";
import tv from "../assets/img/tvplus.svg";
import icon_user from "../assets/img/icon_user.svg";

const slides = [
  {
    img: slide1,
    title: "RAYA RAYU ASMARA",
    subtitle: "Teaser · Romance · Adventure",
    button: "Play Now",
    tag: "Screening Soon",
  },
  {
    img: slide2,
    title: "KISAH DUA HATI",
    subtitle: "Short Movie · Kids & Family · Non-fiction",
    button: "Play Now",
    tag: "Now Playing",
  },
  {
    img: slide1,
    title: "CERITA DIBALIK CERITA",
    subtitle: "Documentary · Comedy · Slice of Life",
    button: "Play Now",
    tag: "Coming Soon",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Navbar tetap di atas */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between pt-8 px-4">
        <img src={tv} alt="TV" />
        <img src={icon_user} alt="User" />
      </div>

      <Swiper
        modules={[Pagination,]}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((data, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full relative flex items-center justify-center"
              style={{
                backgroundImage: `url(${data.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradasi hitam agar teks lebih terbaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-0" />

              {/* Konten utama */}
              <div className="absolute inset-5 flex flex-col justify-end items-center text-center p-6 md:p-12 z-10 pb-12">
                <div className="mb-3 px-4 py-1 bg-white text-black rounded-full text-sm">
                  {data.tag}
                </div>
                <h1 className="text-4xl md:text-6xl font-spicyrice">{data.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <img src={icontv} alt="TV Icon" className="w-6 h-6 md:w-8 md:h-8" />
                  <p className="text-sm md:text-base font-dmsans">{data.subtitle}</p>
                </div>
                <button className="bg-white text-black mt-4 px-6 py-2 md:px-8 md:py-3 rounded-xl text-sm md:text-lg font-semibold font-dmsans">
                  {data.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}