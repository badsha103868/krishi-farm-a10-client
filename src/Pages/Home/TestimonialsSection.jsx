import React from 'react';

 const testimonials = [
{
name: 'Ahmed Hossain',
farm: 'Rajshahi, Rice Farm',
message: 'Through KrishiFarm, I was able to find direct buyers for my rice. Selling has become much easier.',
avatar: 'https://i.ibb.co.com/zhXmLy9D/Farmers-Say.webp',
},
{
name: 'Salma Parvin',
farm: 'Narsingdi, Tomato Farm',
message: 'I was able to connect directly with buyers for my tomatoes. Thank you KrishiFarm!',
avatar: 'https://i.ibb.co.com/FbkgZ6XT/tomato-farmer.jpg',
},
{
name: 'Md. Rafiq',
farm: 'Bogura, Vegetable Farm',
message: 'With guidance from KrishiFarm, I have increased my crop production.',
avatar: 'https://i.ibb.co.com/N24bfyxk/veg-farmer.webp',
},
];

const TestimonialsSection = () => {
  return (
    <section className=" py-12">
<div >
<h2 className="text-3xl font-bold text-center text-primary mb-10">What Our <span className='text-secondary'>Farmers Say</span></h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{testimonials.map((t, index) => (
<div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
<img
src={t.avatar}
alt={t.name}
className="w-30 h-30 rounded-full mx-auto mb-4 object-cover border-2 border-green-400"
/>
<h3 className="text-lg font-semibold text-green-900">{t.name}</h3>
<p className="text-sm text-primary opacity-90">{t.farm}</p>
<p className="mt-3 text-gray-700 text-sm italic">"{t.message}"</p>
</div>
))}
</div>
</div>
</section>
  );
};

export default TestimonialsSection;