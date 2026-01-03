import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import img1 from "../../assets/green field sunrise.avif";
import img2 from "../../assets/fresh vegetables market.webp";
import img3 from "../../assets/sustainable farming.webp";
import img4 from "../../assets/smiling farmer portrait.webp";
import img5 from "../../assets/healthy green salad.avif";

const slides = [
  {
    title: "Welcome to Krishi Farm",
    subtitle: "Your trusted source for fresh, organic, and local produce.",
    img: img1,
  },
  {
    title: "From Our Fields to Your Table",
    subtitle: "We grow with care to bring you the healthiest harvest.",
    img: img2,
  },
  {
    title: "Sustainably Grown, Naturally Fresh",
    subtitle: "Supporting farmers and protecting our planet.",
    img: img3,
  },
  {
    title: "Empowering Local Farmers",
    subtitle: "Together, we cultivate progress and prosperity.",
    img: img4,
  },
  {
    title: "Eat Green, Live Clean",
    subtitle: "Choose farm-fresh products for a healthier tomorrow.",
    img: img5,
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex items-center justify-start h-full w-full"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* green gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 via-green-800/50 to-transparent"></div>

              {activeIndex === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 max-w-2xl px-8 md:px-20"
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-green-400">
                      {slide.title}
                    </span>
                  </h1>
                  <p className="mt-4 text-gray-200 text-lg md:text-xl font-medium drop-shadow-md">
                    {slide.subtitle}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 bg-gradient-to-r from-[#2E8B57] to-[#7ed957] hover:from-[#3ca063] hover:to-[#99e27a] text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                  >
                    Shop Fresh Products
                  </motion.button>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Arrow */}
      <div className="absolute bottom-5 w-full flex justify-center">
        <span
          className="animate-bounce text-white text-3xl cursor-pointer"
          onClick={() =>
            document
              .getElementById("nextSection")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          ⌄
        </span>
      </div>
    </section>
  );
};

export default HeroSlider;
