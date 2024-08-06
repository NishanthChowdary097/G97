import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, MainContent } from '../components';
import customFetch from '../../../utils/customFetch';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('favourites');
  const [ingredients, setIngredients] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const openAiTab = () => {
    setActiveTab('ai');
    setSidebarOpen(true);
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await customFetch.get('/auth/getallIngs');
        setIngredients(response.data.ingredients);
      } catch (e) {
        console.log(e.message);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await customFetch.get('/auth/check');   
        if (response.data.message=='Neekentuku ra idanta?') {
          const data =  response.status;
          console.log("data", response.data);
          setIsUserLoggedIn(data !== null);
        } else {
          setIsUserLoggedIn(false);
          console.log("data", response.data.message);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsUserLoggedIn(false);
      }
    };

    fetchIngredients();
    checkLoginStatus();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isUserLoggedIn={isUserLoggedIn}
      />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-60 lg:ml-80' : ''} transition-all duration-300`}>
        <Navbar 
          toggleSidebar={toggleSidebar} 
          isUserLoggedIn={isUserLoggedIn} 
        />
        <MainContent 
          ingredients={ingredients} 
          openAiTab={openAiTab} 
          sidebarOpen={sidebarOpen} 
          isUserLoggedIn={isUserLoggedIn}
        />
      </div>
    </div>
  );
};

export default Home;
