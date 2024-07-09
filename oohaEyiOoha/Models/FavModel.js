const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
    recipeName: String,
    recipeIngrids: [String],
    recipeStps: [String]
}, { timestamps: true })


module.exports = mongoose.model('favourites', FavSchema);