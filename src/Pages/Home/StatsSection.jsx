import React from "react";
import { Users, Package, Truck, Award } from "lucide-react";

const stats = [
  { id: 1, label: "Farmers", value: "120+", icon: <Users className="w-8 h-8 text-green-600" /> },
  { id: 2, label: "Products", value: "500+", icon: <Package className="w-8 h-8 text-yellow-500" /> },
  { id: 3, label: "Deliveries", value: "1000+", icon: <Truck className="w-8 h-8 text-blue-500" /> },
  { id: 4, label: "Awards", value: "15+", icon: <Award className="w-8 h-8 text-red-500" /> },
];

const StatsSection = () => {
  return (
    <section className="py-16  bg-base-100 transition-colors">
      <div className="max-w-7xl mx-auto   text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-green-300 mb-12">
          Our Impact <span className="text-secondary">in Numbers</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center  transition-all hover:shadow-xl"
            >
              <div className="bg-green-100 dark:bg-green-700 p-4 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary dark:text-lime-300">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
