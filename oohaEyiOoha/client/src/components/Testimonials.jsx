import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import person1 from '../assets/images/albert.jpg';
import person2 from '../assets/images/isasac.jpg';
import person3 from '../assets/images/kohli.jpg';

const testimonials = [
  {
    name: 'Albert Einstein',
    quote: 'I got more knowledge by eating the suggested recipes of this site',
    image: person1,
  },
  {
    name: 'Isaac Newton',
    quote:
      'I have invented gravity because this site gave me a recipe called apple juice',
    image: person2,
  },
  {
    name: 'Virat Kohli',
    quote:
      'I follow my diet from taking help from my fan boy site that is ChefGuru',
    image: person3,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <section className="py-10 px-4 md:px-20 bg-orange-50 rounded-2xl mb-20 max-w-screen-lg">
      <h2 className="text-2xl md:text-4xl font-bold font- mb-6 text-center text-orange-900">
        Heart From our Happy stars
      </h2>
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs mx-auto relative">
                <FaQuoteLeft className="absolute top-0 left-0 text-gray-200 text-6xl opacity-25 transform -translate-x-4 -translate-y-4" />
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {testimonial.name}
                </h3>
                <p className="text-gray-700 text-center mt-2">
                  {testimonial.quote}
                </p>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
