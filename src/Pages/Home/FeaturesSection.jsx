import React from "react";
import { Leaf, Sun, Zap, Heart } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Organic Products",
    desc: "Fresh and 100% organic fruits, vegetables, and seeds directly from local farms.",
    icon: <Leaf className="w-8 h-8 text-green-600" />,
  },
  {
    id: 2,
    title: "Sustainable Farming",
    desc: "We support eco-friendly practices that protect the environment and community.",
    icon: <Sun className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 3,
    title: "Fast Delivery",
    desc: "Receive your orders quickly and safely, right to your doorstep.",
    icon: <Zap className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 4,
    title: "Trusted by Customers",
    desc: "Our customers love our fresh products and reliable services.",
    icon: <Heart className="w-8 h-8 text-red-500" />,
  },
  // নতুন card add
  {
    id: 5,
    title: "24/7 Support",
    desc: "Our team is always ready to help you with your queries and orders.",
    icon: <Sun className="w-8 h-8 text-indigo-500" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-base-100 dark:bg-gray-900 transition-colors">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-secondary dark:text-green-300 mb-12">
        Why Choose <span className="text-primary dark:text-lime-400">Krishi Farm</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  ">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 text-center flex flex-col items-center"
          >
            <div className="bg-green-100 dark:bg-green-700 p-4 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-primary dark:text-lime-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
