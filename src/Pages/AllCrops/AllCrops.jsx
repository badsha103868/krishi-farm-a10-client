import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import AllCrop from "./AllCrop";
import Loading from "../Loading/Loading";
import { MdErrorOutline } from "react-icons/md";

const AllCrops = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const { crops, total, page, limit } = data;

  // 🔍 Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setLoading(true);
    setTimeout(() => setLoading(false), 300);

    navigate(
      `/allCrops?search=${value}&sort=${sort}&page=1`
    ); // reset page to 1
  };

  // 🔃 Sort handler
  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
    navigate(
      `/allCrops?search=${search}&sort=${value}&page=1`
    );
  };

  // ⬅️➡️ Pagination handler
  const handlePageChange = (newPage) => {
    navigate(
      `/allCrops?search=${search}&sort=${sort}&page=${newPage}`
    );
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-5 mt-5">
        Our <span className="text-secondary">All Crops</span>
      </h2>

      {/* Search + Total + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="search"
          placeholder="Search by name, type, location"
          value={search}
          onChange={handleSearch}
          className="input input-bordered w-full md:w-64"
        />

        {/* Total Crops */}
        <p className="font-semibold text-lg text-center md:text-base-content">
          Total Crops Found: <span className="text-primary">{total}</span>
        </p>

        <select
          onChange={handleSort}
          className="select select-bordered w-full md:w-48"
          value={sort}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Crops Grid */}
      {crops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((crop) => (
            <AllCrop key={crop._id} crop={crop} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20">
          <MdErrorOutline className="text-6xl text-red-500 mb-4" />
          <p className="text-2xl md:text-3xl text-red-500 text-center">
            No Result Found
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1
                  ? "bg-primary text-white"
                  : "bg-base-200 text-base-content"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCrops;
