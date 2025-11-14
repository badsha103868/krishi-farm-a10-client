import React from "react";
import { ShoppingCart, ClipboardCheck, Sprout, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Fresh Products",
    desc: "Explore a wide range of organic vegetables, fruits, and seeds directly from local farms.",
    icon: <ShoppingCart className="w-10 h-10 text-green-600" />,
  },
  {
    id: 2,
    title: "Select & Place Order",
    desc: "Choose your favorite items and confirm your order with one click.",
    icon: <ClipboardCheck className="w-10 h-10 text-green-600" />,
  },
  {
    id: 3,
    title: "Farmers Harvest Fresh",
    desc: "Our local farmers pick and pack your order fresh on the same day.",
    icon: <Sprout className="w-10 h-10 text-green-600" />,
  },
  {
    id: 4,
    title: "Delivered to Your Doorstep",
    desc: "Get your farm-fresh items delivered to your home quickly and safely.",
    icon: <Truck className="w-10 h-10 text-green-600" />,
  },
];

const WorkSection = () => {
  return (
    <section className=" py-16 ">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-secondary mb-12">
        How <span className="text-primary">Krishi Farm</span> Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  ">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 text-center flex flex-col items-center"
          >
            <div className="bg-green-100 p-4 rounded-full mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-primary">
              {step.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
