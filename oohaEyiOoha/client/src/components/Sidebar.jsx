import React, { useState, useEffect } from 'react';
import { FaSyncAlt, FaTrash } from 'react-icons/fa';
import { FaLeftLong } from 'react-icons/fa6';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const [favourites, setFavourites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    if (activeTab === 'favourites') {
      fetchFavourites();
    }
  }, [activeTab]);

  const fetchFavourites = async () => {
    try {
      const response = await customFetch.get('/auth/fetchFavs');
      const data = await response.data;
      setFavourites(data);
    } catch (error) {
      console.error('Error fetching favourites:', error);
    }
  };

  const showRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  const handleFavouritesClick = () => {
    setActiveTab('favourites');
    fetchFavourites();
  };

  const handleAIClick = () => {
    setActiveTab('ai');
  };

  const refreshTab = () => {
    setIsRotating(true);
    if (activeTab === 'favourites') {
      fetchFavourites();
    } else if (activeTab === 'ai') {
      // Add AI related refresh logic if needed
    }
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleRemoveClick = (recipeName) => {
    setRecipeToDelete(recipeName);
  };

  const confirmDelete = async () => {
    try {
      const response = await customFetch.post('/auth/removeRecipe', { recipeName: recipeToDelete });
      if (response.status === 200) {
        toast.success('Recipe removed from favourites');
        refreshTab();
      } else {
        toast.error('Failed to remove recipe from favourites');
      }
    } catch (error) {
      console.error('Error removing recipe:', error);
      toast.error('Failed to remove recipe from favourites');
    } finally {
      setRecipeToDelete(null);
    }
  };

  const cancelDelete = () => {
    setRecipeToDelete(null);
  };

  return (
    <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:w-60 lg:w-80`}>
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar} className="block">
          <FaLeftLong className='ml-2 text-2xl'/>
        </button>
      </div>
      <nav className="mt-4 flex space-x-2 px-4">
        <button 
          onClick={handleFavouritesClick} 
          className={`flex-1 text-center py-2 ${activeTab !== 'favourites' ? 'bg-gray-700 rounded-md font-light ' : 'border font-bold px-4 py-2 border-gray-50 rounded-md border-x-2 border-y-2'}`}
        >
          Favourites
        </button>
        <button 
          onClick={handleAIClick} 
          className={`flex-1 text-center py-2 ${activeTab !== 'ai' ? 'bg-gray-700 rounded-md font-light' : 'border font-bold px-4 py-2 border-gray-50 rounded-md border-x-2 border-y-2'}`}
        >
          AI
        </button>
      </nav>
      <div className="flex justify-left px-8 py-3">
        <button 
          onClick={refreshTab} 
          className={`text-2xl transition-transform duration-500 ${isRotating ? 'transform rotate-180' : ''}`}
        >
          <FaSyncAlt />
        </button>
      </div>
      <div className="px-4 ">
        {activeTab === 'favourites' ? (
          <div>
            {favourites.length > 0 ? (
              favourites.map((recipe, index) => (
                <div 
                  key={index} 
                  onMouseEnter={(e) => e.currentTarget.querySelector('.delete-icon').classList.remove('hidden')}
                  onMouseLeave={(e) => e.currentTarget.querySelector('.delete-icon').classList.add('hidden')}
                  className="cursor-pointer hover:bg-gray-700 p-2 rounded-md flex justify-between items-center"
                >
                  <span onClick={() => showRecipeDetails(recipe)}>
                    {recipe.recipeName}
                  </span>
                  <FaTrash 
                    className="delete-icon hidden text-red-500 hover:text-red-700 transition duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveClick(recipe.recipeName);
                    }}
                  />
                </div>
              ))
            ) : (
              <p>Start adding some recipes to your favourites list</p>
            )}
          </div>
        ) : (
          <div>AI Content</div>
        )}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-4 rounded-lg w-3/4 h-3/4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedRecipe.recipeName}</h2>
              <button onClick={closeRecipeDetails} className="text-xl font-bold">&times;</button>
            </div>
            <div>
              <h3 className="font-semibold">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {selectedRecipe.recipeIngrids.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Steps:</h3>
              <ol className="list-decimal list-inside">
                {selectedRecipe.recipeStps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {recipeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-4 rounded-lg w-11/12">
            <h3 className="font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete the recipe: {recipeToDelete}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
