import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-16 bg-base-100 dark:bg-green-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary dark:text-lime-200 mb-6">
          <span className="text-primary">Subscribe</span> to Our Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-200 mb-8">
          Stay updated with the latest products, offers, and farming tips.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full md:flex-1 dark:bg-gray-800 dark:text-gray-200"
          />
          <button
            type="submit"
            className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full w-full md:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
