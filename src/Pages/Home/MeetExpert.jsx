import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const experts = [
  {
    id: 1,
    name: "Katherin Sullivan",
    specialization: "Organic Farming Specialist",
    image: "https://i.ibb.co.com/Xk4NqdXJ/premium-photo-1667520087787-58160c559d2a.jpg",
  },
  {
    id: 2,
    name: "Chris Donovan",
    specialization: "Soil & Crop Nutrition Expert",
    image: "https://i.ibb.co.com/21JZ7LmR/Soil-Crop-Nutrition-Expert.jpg",
  },
  {
    id: 3,
    name: "Alees Hardson",
    specialization: "Sustainable Agriculture Consultant",
    image: "https://i.ibb.co.com/B21B14q0/Sustainable-Agriculture-Consultant.jpg",
  },
  {
    id: 4,
    name: "Hailey Simpson",
    specialization: "Hydroponic Farming Advisor",
    image: "https://i.ibb.co.com/1fVNzYsS/Hydroponic-Farming-Advisor.jpg",
  },
];

const MeetOurExperts = () => {
  return (
    <section className="py-12">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
        Meet Our <span className="text-secondary">Agriculture Experts</span>
      </h2>

      {/* Desktop View (Grid) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8  md:px-12">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-[#EAF7EC] rounded-2xl shadow-md p-4 text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className=" mx-auto mb-4 overflow-hidden rounded-xl shadow-sm">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-green-800">
              {expert.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {expert.specialization}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile View (Swiper Slider) */}
      <div className="md:hidden px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1.2}
          loop={true}
        >
          {experts.map((expert) => (
            <SwiperSlide key={expert.id}>
              <div className="bg-[#EAF7EC] rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition-all duration-300">
                <div className=" mx-auto mb-3 overflow-hidden rounded-xl  shadow-sm">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-semibold text-green-800">
                  {expert.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {expert.specialization}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MeetOurExperts;
