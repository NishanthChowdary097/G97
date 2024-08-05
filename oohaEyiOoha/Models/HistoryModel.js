const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    recipeName: String,
    recipeIngrids: [String],
    recipeStps: [String],
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model('history', historySchema);
