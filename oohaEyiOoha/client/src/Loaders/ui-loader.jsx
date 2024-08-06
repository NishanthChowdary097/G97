import React from 'react';
import './ui-style.css';
import platter from './vegan-food.png'; // Correct the import statement

export const UILoader = () => {
  return (
    <div className="flex items-center justify-center w-[50vw] h-[100vh]1 bg-orange-100">
      {' '}
      {/* Changed bg-zinc-900 to bg-orange-300 */}
      <div className="pl ">
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__text bg-dynamic">
          <img src={platter} alt="Loading platter" />{' '}
          {/* Use the imported image */}
        </div>
      </div>
    </div>
  );
};
