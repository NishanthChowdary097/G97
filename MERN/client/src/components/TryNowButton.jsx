import React from 'react';
import { useNavigate } from 'react-router-dom';

const TryNowButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-red-600 hover:to-yellow-600 focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Try Now
    </button>
  );
};

export default TryNowButton;
