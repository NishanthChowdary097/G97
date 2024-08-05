import React from 'react';
import LogoutContainer from './LogoutContainer';
import Logo from '../assets/cgnav.png';
import { Link } from 'react-router-dom';
import Button from './Button';



const Navbar = ({ toggleSidebar, isUserLoggedIn }) => {
  return (
    <div className="bg-orange-950 text-white flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <img alt="icon" width="220" height="auto" src={Logo} />
      </div>
      <div className="flex items-center space-x-4 text-xl">
        {isUserLoggedIn ? <LogoutContainer /> : <div className="ml-20 scale-90">
          <Link to="/register">
            <Button
              title="Sign Up"
              containerStyle="hover:font-bold hidden md:block bg-transparent py-3 border border-white text-white hover:bg-white hover:text-orange-950 rounded-full min-w-[130px]"
            />
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
