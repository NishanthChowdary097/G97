const { Router } = require('express');
const router = Router();
const {
  getAllIngs,
  fetchRecipes,
  fetchFavs,
  removeRecipe,
  starRecipe,
  createImage,
  check,
  logout,
  login,
  register,
  createHistory,
  fetchHistory
} = require('../Controllers/authController.js');
const {
  validateUserInput,
  validateLoginInput,
  validateUpdateUserInput
} = require('../Middlewere/validationMiddlewere.js');
const authMiddlewere = require('../Middlewere/authMiddlewere.js');

router.post('/fetchRecipes', fetchRecipes);
router.post('/removeRecipe', authMiddlewere, removeRecipe);
router.post('/starRecipe', authMiddlewere, starRecipe);
router.post('/history', authMiddlewere, createHistory);
router.post('/createImage', authMiddlewere, createImage);
router.get('/getallIngs',  getAllIngs);
router.get('/fetchFavs', fetchFavs);
router.get('/fetchHistory', fetchHistory);
router.get('/check', check);
router.get('/logout', logout)
router.post('/register', validateUserInput, register);
router.post('/login', validateLoginInput, login);
module.exports = router;
