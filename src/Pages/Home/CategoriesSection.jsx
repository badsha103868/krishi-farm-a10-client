import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";

const DynamicCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://krishi-farm-a10-server.vercel.app/cropCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="text-primary">Browse by</span>{" "}
          <span className="text-secondary">Categories</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate(`/allCrops?type=${category}&page=1`)}
              className="btn btn-outline btn-primary btn-sm"
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
