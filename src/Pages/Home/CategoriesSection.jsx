import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const DynamicCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/crops")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(data.map((crop) => crop.type)),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
   return <Loading></Loading>
  }

  return (
    <section className="py-16 bg-base-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-secondary dark:text-green-300 mb-12">
         <span className="text-primary"> Browse by</span> Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-3 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-semibold hover:bg-green-200 dark:hover:bg-green-700 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicCategoriesSection;
