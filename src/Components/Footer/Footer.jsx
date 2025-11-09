import React from 'react';
import fbImg from '../../assets/fb.png'
import twitterImg from '../../assets/twitter.png'
import linkedInImg from '../../assets/linkedIn.png'
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlinePhoneInTalk } from 'react-icons/md';


const Footer = () => { 

   const handleSubscribe =(e)=>{
    e.preventDefault()
    alert("Thanks for subscribing us")
    e.target.reset();
   }

  return (
    <footer className="bg-gradient-to-r from-green-800  to-green-600 text-white">
      <div className=" mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand / about */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Krishi Farm</h3>
            <p className="text-sm opacity-90">Safe to eat, improved crops — Krishi Farm is at the farmer's side. We simplify agricultural creation with information, markets, and nearby services</p>

            <div className="flex gap-3 mt-2">
            
              {/* social icon  */}


              <a href="#" aria-label="facebook" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
                 <img src={fbImg} alt="" />
              </a>

              <a href="#" aria-label="twitter" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
               <img src={twitterImg} alt="" />
              </a>

              
              <a href="#" aria-label="linkedIn" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition">
               <img src={linkedInImg} alt="" />
              </a>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h4 className="text-lg font-medium">Useful Links</h4>
            <ul className="mt-3 space-y-2 text-sm opacity-95">
              <li><a href="" className="hover:underline">Dashboard</a></li>
              <li><a href="" className="hover:underline">Marketplace</a></li>
              <li><a href="" className="hover:underline">Crop Advisory</a></li>
              <li><a href="" className="hover:underline">Training</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium">Contact</h4>
            <ul className="mt-3 space-y-3 text-sm opacity-95">
              <li className="flex items-center  gap-3">
                <FaLocationDot size={20} />
               
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm opacity-90">Village — XYZ, District — ABC, Bangladesh</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                
               
                <div>
                  <div className="font-medium">Email</div>
                  <a href="mailto:help@krishifarm.com" className="text-sm opacity-90 hover:underline">help@krishifarm.com</a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                  <MdOutlinePhoneInTalk size={20}/>
                <div>
                  <div className="font-medium">Phone</div>
                  <a href="tel:+8801712345678" className="text-sm opacity-90 hover:underline">+880 1712-345678</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / small form */}
          <div>
            <h4 className="text-lg font-medium">Newsletter</h4>
            <p className="mt-2 text-sm opacity-95">Subscribe to receive weekly updates and tips.</p>

            <form className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2" onSubmit={ handleSubscribe }>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" placeholder="Your Email" required
                className="w-full sm:flex-1 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300" />

              <button type="submit" className="px-4 py-2 rounded-md bg-yellow-400 text-green-900 font-semibold hover:brightness-95 transition">Subscribe</button>
            </form>

            <div className="mt-4 text-xs opacity-80">We don't spam — your email will be safe.</div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6  gap-4">
          <p className="text-sm text-center opacity-95">© {new Date().getFullYear()} KrishiFarm. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;