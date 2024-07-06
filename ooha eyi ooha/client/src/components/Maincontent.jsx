import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';
import customFetch from '../../../utils/customFetch';

const MainContent = ({ ingredients, openAiTab, sidebarOpen }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [submittedTags, setSubmittedTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input) {
      setSuggestions(
        ingredients.filter((ingredient) =>
          ingredient.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (ingredient) => {
    if (selectedTags.length < 5 && !selectedTags.includes(ingredient)) {
      setSelectedTags([...selectedTags, ingredient]);
      console.log(ingredient, " added to list");
      setSearchInput('');
      setSuggestions([]);
    }
  };

  const removeTag = (ingredient) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== ingredient));
  };

  const handleSearchClick = async () => {
    if (selectedTags.length === 0) {
      setResponseMessage('Please add at least one ingredient.');
      return;
    }

    setSubmittedTags(selectedTags);
    setSelectedTags([]);
    setSearchInput('');
    setSuggestions([]);

    try {
      console.log("lsit:", selectedTags);
      const response = await customFetch.post('/auth/fetchRecipes', {
        ingredients: selectedTags,
      });
      setRecipes(response.data.recipes);
      console.log("recipes:", response.data);
      setResponseMessage('');
    } catch (e) {
      console.log(e.message);
      setResponseMessage('Failed to fetch recipes');
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="p-4 flex-1">
      <div className="mb-4">
        <div className="flex flex-wrap items-center border rounded p-2">
          {selectedTags.map((tag, index) => (
            <div key={index} className="bg-blue-200 px-2 py-1 rounded mr-2 mb-2 flex items-center">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 text-red-600">
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search..."
            className="flex-1 p-2 outline-none"
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="border rounded mt-2 bg-white absolute z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleSearchClick}
        className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
      {responseMessage && (
        <div className="mt-4">
          <p>{responseMessage}</p>
        </div>
      )}
      {recipes.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <IonCard
              key={index}
              onClick={() => handleRecipeClick(recipe)}
              className="cursor-pointer relative shadow-gray-900 shadow-lg p-4 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-3xl hover:bg-gradient-to-top hover:rounded-t-md hover:from-orange-500 hover:to-amber-400 hover:font-bold hover:text-white "
            >
              <img
                alt="Recipe"
                src="https://ionicframework.com/docs/img/demos/card-media.png"
                className="h-60 w-full object-cover rounded-xl hover:scale-105"
              />
              <IonCardHeader>
                <IonCardTitle className="text-xl font-extrabold hover:underline">{recipe.name}</IonCardTitle>
              </IonCardHeader>
              <br />
              <p className="pr-20">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, aut.
              </p>
              <button
                className="absolute bottom-1 right-1 bg-gradient-to-b from-blue-500 to-purple-900 text-white rounded-full p-4 shadow-lg hover:bg-gradient-to-b hover:from-purple-950 hover:to-blue-600 transition duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  openAiTab();
                }}
              >
                <FaRobot />
              </button>
            </IonCard>
          ))}
        </div>
      )}
      {selectedRecipe && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeRecipeModal}
        >
          <div
            className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeRecipeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h3 className="font-bold mb-2 text-2xl">{selectedRecipe.name}</h3>
            <ul className="list-disc list-inside">
              {selectedRecipe.steps.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
