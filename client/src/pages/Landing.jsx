import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link, useNavigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import kitchen from '../assets/images/kitchen.jpg';
import axios from 'axios';
import { Logo } from '../components';
import { useEffect, useState } from 'react';

const Landing = () => {
  var [optiondata, updatedata] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const navigate = useNavigate();
  const fun1 = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countryNames = response.data.map((country) => country.name.common);
      updatedata(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  const handleDropdownClick = () => {
    setIsDropdownOpen(true);
    if (optiondata.length === 0) {
      fun1();
    }
  };
  const handleCountryChange = (e) => {
    setSelectedCountry(document.getElementById('1').value);
  };
  const fun2 = () => {
    if (selectedCountry) {
      navigate('/dashboard');
    } else {
      alert('please select the country');
    }
  };

  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <select
            name="countries"
            id="1"
            className="btn dropdown"
            onClick={handleDropdownClick}
            onChange={handleCountryChange}
          >
            {optiondata.length === 0 ? (
              <option>loading...</option>
            ) : (
              optiondata.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))
            )}
          </select>
          <input
            type="button"
            value="start"
            className="btn"
            onClick={fun2}
          ></input>
          <h1>
            recipe maker <span>(To cook in a better way)</span> chefguru
          </h1>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo user
          </Link>
        </div>
        <img src={kitchen} alt="Study hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
