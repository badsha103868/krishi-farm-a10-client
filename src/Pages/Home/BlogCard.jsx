import React from "react";

const BlogCard = ({ blog }) => {
  const { title, image, summary, date } = blog;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-2 text-green-700">{title}</h2>
        <p className="text-gray-700 mb-4 flex-1">{summary}</p>
        <div className="mt-auto">
          <p className="text-sm text-gray-500 mb-3">{new Date(date).toLocaleDateString()}</p>
          <button className="btn btn-primary w-full">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
