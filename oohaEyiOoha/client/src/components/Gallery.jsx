import React from 'react';
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from '../assets/images';

const Gallery = () => {
  const images = [Banner1, Banner2, Banner3, Banner4, Banner5];

  return (
    <section className="py-10 px-4 md:px-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        A Taste of Our Kitchen
      </h2>
      <p className="text-1.3xl  text-center">
        Feast your eyes on the culinary masterpieces and moments from our
        cooking classes, where creativity meets flavor.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
