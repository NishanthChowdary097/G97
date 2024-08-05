import React from 'react';
import teja from '../assets/images/teja.jpeg';
import ras from '../assets/images/ras.jpeg';
import nish from '../assets/images/245322733097.jpg';
import mo from '../assets/images/mo.jpeg';
import nit from '../assets/images/nit.jpeg';
import fah from '../assets/images/245322733098.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const teamMembers = [
  {
    name: 'Ananth',
    position: 'Frontend',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733105.jpg',
    description: '#pantulu'
  },
  {
    name: 'Rasmitha',
    position: 'Backend',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733034.jpg',
    description: '#pantulamma'
  },
  {
    name: 'Mohith',
    position: 'Frontend',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733099.jpg',
    description: '#mosako'
  },
  {
    name: 'Nishanth',
    position: 'Backend',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733097.jpg',
    description: '#bossBattlar'
  },
  {
    name: 'Nithin',
    position: 'LLM',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733076.jpg',
    description: '#aitheEmChedamAntav'
  },
  {
    name: 'Fahad',
    position: 'Frontend',
    image: 'https://teleuniv.net.in/sanjaya/student-images/245322733098.jpg',
    description: '#naToniPetukoku'
  },
];

const Team = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 800,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-8 rounded-2xl mb-20 px-4 md:px-20 bg-orange-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Meet Our Team
      </h2>
      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="px-4">
              <div className="relative bg-white shadow-lg rounded-lg overflow-hidden group transition-transform duration-300 ease-in-out transform hover:scale-105">
                {/* Name Overlay */}
                <div className="absolute inset-x-0 top-0 bg-black text-white flex items-center justify-center p-2 transition-transform duration-300 ease-in-out transform group-hover:translate-y-full">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                </div>
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full mt-11 h-64 object-cover transition-opacity duration-300 ease-in-out"
                  style={{ height: '300px', width: '100%' }} // Adjusted dimensions for portrait
                />
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-orange-950 text-white flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-md font-semibold mb-1">{member.position}</p>
                  <p className="text-sm">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Team;
