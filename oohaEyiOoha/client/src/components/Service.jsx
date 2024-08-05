import React from 'react';
import { FaUtensils, FaSearch, FaBookmark } from 'react-icons/fa';

const services = [
  {
    title: 'Recipe Suggestions',
    description:
      'Get personalized recipe suggestions based on your preferences.',
    icon: <FaUtensils className="text-4xl text-red-500" />,
  },
  {
    title: 'Search Recipes',
    description:
      'Search for recipes using ingredients, cuisine type, and more.',
    icon: <FaSearch className="text-4xl text-green-500" />,
  },
  {
    title: 'Save Favorites',
    description: 'Bookmark your favorite recipes for easy access later.',
    icon: <FaBookmark className="text-4xl text-yellow-500" />,
  },
];

const Service = () => {
  return (
    <section className="py-10 rounded-2xl px-4 md:px-20 bg-orange-50 mb-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-800">
        Our Services
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {service.title}
            </h3>
            <p className="text-gray-700 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
