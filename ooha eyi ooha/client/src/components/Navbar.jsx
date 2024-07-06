import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-900 text-white flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <span className="text-xl font-bold">Logo</span>
      </div>
      <div className="flex items-center space-x-4">
        <i className='bx bxs-user'></i>
        <button className="bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
