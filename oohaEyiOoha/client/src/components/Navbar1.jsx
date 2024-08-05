import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import Button from './Button';
import Logo from '../assets/image1.png';

const Navbar1 = () => {

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full fixed z-50 bg-black opacity-95">
      <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
        <a
          href="/"
          className="flex items-center justify-center text-white text-lg cursor-pointer"
        >
          <img alt="icon" width="350" height="auto" src={Logo} style={{ marginLeft: '-8vw' }} />
        </a>

        <ul className="hidden md:flex text-gray-200 gap-10">
          <li className='hover:scale-105'>
            <a className="hover:font-extrabold font-semibold hover:border-b-4 py-2 hover:border-orange-500 hover:rounded-md hover:text-white" href="#" onClick={(e) => handleScroll(e, 'top')}>
              Home
            </a>
          </li>
          <li className='hover:scale-105'>
            <a className="hover:font-extrabold font-semibold hover:border-b-4 py-2 hover:border-orange-500 hover:rounded-md hover:text-white" href="#gallery" onClick={(e) => handleScroll(e, 'gallery')}>
              Gallery
            </a>
          </li>
          <li className='hover:scale-105'>
            <a className="hover:font-extrabold font-semibold hover:border-b-4 py-2 hover:border-orange-500 hover:rounded-md hover:text-white" href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')}>
              Testimonials
            </a>
          </li>
          <li className='hover:scale-105'>
            <a className="hover:font-extrabold font-semibold hover:border-b-4 py-2 hover:border-orange-500 hover:rounded-md hover:text-white" href="#service" onClick={(e) => handleScroll(e, 'service')}>
              Services
            </a>
          </li>
          <li className='hover:scale-105'>
            <a className="hover:font-extrabold font-semibold hover:border-b-4 py-2 hover:border-orange-500 hover:rounded-md hover:text-white" href="#team" onClick={(e) => handleScroll(e, 'team')}>
              Team
            </a>
          </li>
        </ul>
        <div className="ml-20">
          <Link to="/login">
            <Button
              title="Sign in"
              containerStyle="hover:font-extrabold font-semibold hidden md:block bg-transparent py-3 border border-white text-white hover:bg-white hover:text-black rounded-full min-w-[130px]"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar1;
