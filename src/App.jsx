import React from 'react';
import RainGrid from './pages/RainGrid';
import BackGround from '../components/BackGround';

const App = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <BackGround/>
      <RainGrid />
    </div>
  );
};

export default App;