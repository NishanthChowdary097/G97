const { Router } = require('express');
const router = Router();
const  {getAllIngs, fetchRecipes, fetchFavs, removeRecipe}  = require('../Controllers/authController.js');

// router.post('/register', validateRegisterInput, register);
router.post('/fetchRecipes', fetchRecipes);
router.post('/removeRecipe', removeRecipe);
router.get('/getallIngs', getAllIngs);
router.get('/fetchFavs', fetchFavs);

module.exports = router;
