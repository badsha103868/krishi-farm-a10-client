import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Later replace with API fetch from MongoDB
    const dummyBlogs = [
      {
        id: 1,
        title: "Organic Farming Benefits",
        image: "https://i.ibb.co.com/Z1YV9BwJ/Organic-Farming-Benefits.jpg",
        summary: "Discover why organic farming is better for health, environment, and soil.",
        date: "2025-11-10",
      },
      {
        id: 2,
        title: "5 Tips for Growing Tomatoes",
        image: "https://i.ibb.co.com/cX3cSjpX/5-Tips-for-Growing-Tomatoes.jpg",
        summary: "Learn simple tips to grow juicy, healthy tomatoes in your backyard.",
        date: "2025-11-08",
      },
      {
        id: 3,
        title: "Water Management in Agriculture",
        image: "https://i.ibb.co.com/qYsg8t10/Water-Management-in-Agriculture.jpg",
        summary: "Efficient water management techniques to save water and increase yield.",
        date: "2025-11-05",
      },
    ];
    setBlogs(dummyBlogs);
  }, []);

  return (
    <div className="my-10 ">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Krishi Farm <span className="text-secondary">Blogs</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
