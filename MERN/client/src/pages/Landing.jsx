import React from 'react';
import Navbar1 from '../components/Navbar1';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials'; // Corrected typo from Testimonialas
import Team from '../components/Team';
import Service from '../components/Service';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/logo-color.png'

const Home = () => {
  const titles = [
    'Explore Eat Enjoy',
    'Connect Convey Create',
    'Find Flavour Feast ',
    'Save Search Serve',
    'Easy Peasy! Lemon Squeezy!'
  ];


  return (
    <div className='bg-orange-100'>
        <Navbar1 style={{zIndex: '100'}}/>
      <main className="w-full flex flex-col pt-23">
        
        <Header
          titles={titles} // Changed from title to titles
          type="home"
        />

        <section
          id="gallery"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Gallery />
        </section>

        <section
          id="testimonials"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Testimonials />
        </section>

        

        <section
          id="service"
          className="md:max-w-[1440px] mx-auto px-4 md:px-20"
        >
          <Service />
        </section>

        <section id="team" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
          <Team />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
