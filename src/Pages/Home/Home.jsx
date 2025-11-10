import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import LatestCrops from './LatestCrops';

  const latestCropsPromise = fetch('http://localhost:3000/latestCrops')
  .then(res => res.json())

const Home = () => {
  return (
    <div>
      <LatestCrops latestCropsPromise={latestCropsPromise}></LatestCrops>
    </div>
  );
};

export default Home;