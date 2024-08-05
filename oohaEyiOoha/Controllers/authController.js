const Ing = require("../Models/IngModel.js")
const Fav = require("../Models/FavModel.js")
const User = require("../Models/UserModel.js")
const History = require("../Models/HistoryModel.js")
const axios = require('axios');
const { hashPassword, comparePassword } = require('../utils/passwordUtils')
const { createJWT, verifyJWT } = require('../utils/tokenUtils');
const StatusCodes = require('http-status-codes');


const recipes = [
    {
        name: 'Spaghetti Carbonara',
        steps: [
            'Boil pasta according to package instructions.',
            'Cook pancetta in a skillet until crispy.',
            'Whisk eggs and grated Parmesan in a bowl.',
            'Combine pasta, pancetta, and egg mixture.',
            'Season with salt and pepper and serve.'
        ],
        ingredients: [
            'Spaghetti',
            'Pancetta',
            'Eggs',
            'Parmesan cheese',
            'Salt',
            'Pepper',
        ]
    },
    // {
    //     name: 'Chicken Alfredo',
    //     steps: [
    //         'Cook pasta according to package instructions.',
    //         'Cook chicken breasts in a skillet until done.',
    //         'Melt butter in a pan and add heavy cream.',
    //         'Stir in Parmesan and cook until sauce thickens.',
    //         'Combine pasta, chicken, and sauce.',
    //         'Season with salt and pepper and serve.'
    //     ],
    //     ingredients: [
    //         'Pasta',
    //         'Chicken breasts',
    //         'Butter',
    //         'Heavy cream',
    //         'Parmesan cheese',
    //         'Salt',
    //         'Pepper',
    //     ]
    // },
    // {
    //     name: 'Beef Tacos',
    //     steps: [
    //         'Cook ground beef in a skillet until browned.',
    //         'Add taco seasoning and water to the beef.',
    //         'Simmer until sauce thickens.',
    //         'Warm taco shells in the oven.',
    //         'Fill taco shells with beef, lettuce, cheese, and salsa.'
    //     ],
    //     ingredients: [
    //         'Ground beef',
    //         'Taco seasoning',
    //         'Taco shells',
    //         'Lettuce',
    //         'Cheese',
    //         'Salsa',
    //     ]
    // },
    // {
    //     name: 'Vegetable Stir Fry',
    //     steps: [
    //         'Heat oil in a large pan.',
    //         'Add chopped vegetables and cook until tender.',
    //         'Stir in soy sauce, garlic, and ginger.',
    //         'Cook until sauce thickens.',
    //         'Serve with rice or noodles.'
    //     ],
    //     ingredients: [
    //         'Mixed vegetables (e.g., bell peppers, broccoli, carrots)',
    //         'Soy sauce',
    //         'Garlic',
    //         'Ginger',
    //         'Cooking oil',
    //         'Rice or noodles (optional)',
    //     ]
    // },
    {
        name: 'Margherita Pizza',
        steps: [
            'Preheat oven to 475°F (245°C).',
            'Roll out pizza dough on a floured surface.',
            'Spread tomato sauce over the dough.',
            'Top with fresh mozzarella and basil leaves.',
            'Bake in the oven until crust is golden.',
            'Drizzle with olive oil and serve.'
        ],
        ingredients: [
            'Pizza dough',
            'Tomato sauce',
            'Fresh mozzarella',
            'Basil leaves',
            'Olive oil',
        ]
    },
    // {
    //     name: 'Chicken Caesar Salad',
    //     steps: [
    //         'Grill chicken breasts until fully cooked.',
    //         'Chop romaine lettuce and place in a bowl.',
    //         'Add croutons and grated Parmesan.',
    //         'Slice the grilled chicken and add to the salad.',
    //         'Toss with Caesar dressing and serve.'
    //     ],
    //     ingredients: [
    //         'Chicken breasts',
    //         'Romaine lettuce',
    //         'Croutons',
    //         'Parmesan cheese',
    //         'Caesar dressing',
    //     ]
    // },
    {
        name: 'Pancakes',
        steps: [
            'Mix flour, sugar, baking powder, and salt in a bowl.',
            'Whisk milk, eggs, and melted butter in another bowl.',
            'Combine wet and dry ingredients and stir until smooth.',
            'Heat a griddle and pour batter to form pancakes.',
            'Cook until bubbles form, then flip and cook until golden.',
            'Serve with syrup and butter.'
        ],
        ingredients: [
            'Flour',
            'Sugar',
            'Baking powder',
            'Salt',
            'Milk',
            'Eggs',
            'Butter',
            'Syrup (optional)',
        ]
    },
    // {
    //     name: 'Beef Stew',
    //     steps: [
    //         'Brown beef in a large pot.',
    //         'Add chopped onions, carrots, and potatoes.',
    //         'Stir in beef broth, tomato paste, and seasonings.',
    //         'Simmer until meat and vegetables are tender.',
    //         'Serve hot with crusty bread.'
    //     ],
    //     ingredients: [
    //         'Beef',
    //         'Onions',
    //         'Carrots',
    //         'Potatoes',
    //         'Beef broth',
    //         'Tomato paste',
    //         'Seasonings',
    //     ]
    // },
    {
        name: 'Chocolate Chip Cookies',
        steps: [
            'Preheat oven to 350°F (175°C).',
            'Cream butter and sugars together in a bowl.',
            'Add eggs and vanilla extract and mix well.',
            'Stir in flour, baking soda, and salt.',
            'Fold in chocolate chips.',
            'Drop spoonfuls of dough onto a baking sheet.',
            'Bake until golden brown.'
        ],
        ingredients: [
            'Butter',
            'Sugar',
            'Brown sugar',
            'Eggs',
            'Vanilla extract',
            'Flour',
            'Baking soda',
            'Salt',
            'Chocolate chips',
        ]
    },
    {
        name: 'Grilled Cheese Sandwich',
        steps: [
            'Butter one side of each bread slice.',
            'Place cheese slices between two pieces of bread.',
            'Heat a skillet over medium heat.',
            'Cook sandwich until bread is golden brown and cheese is melted.',
            'Serve hot.'
        ],
        ingredients: [
            'Bread slices',
            'Cheese slices',
            'Butter',
        ]
    }
]


const register = async (req, res) => {
    const { name, email, password: plainPassword, language } = req.body;

    const password = await hashPassword(plainPassword);

    let user = await User.create({ name, email, password, language });

    await user.save();

    res.status(200).json({ message: 'created successfully' });
};




const login = async (req, res) => {
    try {
        console.log("Login request:", req.body);
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify the password
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = createJWT({ userId: user._id });

        // Set the cookie with the token
        const oneDay = 1000 * 60 * 60 * 24; // 24 hours
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', // Prevents CSRF attacks
        });

        res.status(200).json({ msg: 'User logged in' });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const check = async (req, res) => {
    if (req.cookies) {
        const val = verifyJWT(req.cookies.token);
        console.log("val:", val);
        if (val) {
            res.status(200).json({ message: "Neekentuku ra idanta?" })
        }
        else { res.status(500).json({ message: 'Antuke mundu chuskovali' }) }
    }
    else {
        res.status(500).json({ message: 'Antuke mundu chuskovali!' })
    }
}

const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

const getAllIngs = async (req, res) => {
    try {
        const ingredients = await Ing.find({}, { _id: 0, ingredient: 1 }).exec();
        const ingredientList = ingredients.map(doc => doc.ingredient);
        res.status(200).json({ ingredients: ingredientList });
    } catch (e) {
        console.log("Error: ", e);
        res.json(500).json({ error: "Error fetching ingredients" }, e)
    }
}

const fetchRecipes = async (req, res) => {
    const ingredients = req.body.ingredients;
    const url = 'http://localhost:5000/generate-recipe';
    const data = { ingredients };

    try {
        const requests = Array(5).fill().map(() => axios.post(url, data));
        const responses = await Promise.all(requests);

        const recipes = responses.map(response => response.data.recipe);
        recipes.forEach((recipe, index) => {
            console.log(`Response ${index + 1}:`, recipe);
        });

        res.status(200).json({ recipes: recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

module.exports = { fetchRecipes };


const starRecipe = async (req, res) => {
    try {
        const { name, steps, ingredients } = req.body;
        const tok = req.cookies.token;
        const userId = verifyJWT(tok).userId;

        if (!userId || !name || !steps || !ingredients) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the recipe already exists in favourites
        const existingRecipe = await Fav.findOne({ recipeName: name });
        let favId;

        if (existingRecipe) {
            favId = existingRecipe._id;
        } else {
            // Create a new favourite recipe
            const newFavourite = new Fav({
                recipeName: name,
                recipeIngrids: ingredients,
                recipeStps: steps,
                user: userId
            });
            const result = await newFavourite.save();
            favId = result._id;
        }

        // Update the user's favourites array
        await User.findByIdAndUpdate(userId, {
            $addToSet: { favourites: favId } // $addToSet ensures no duplicates
        });

        res.status(200).json({ message: 'Recipe added to favourites' });
    } catch (error) {
        console.error('Error inserting favourite recipe:', error);
        res.status(500).json({ error: 'Failed to add recipe to favourites' });
    }
};

const createHistory = async (req, res) => {
    try {
        const { name, steps, ingredients } = req.body;
        const tok = req.cookies.token;
        const userId = verifyJWT(tok).userId;

        if (!userId || !name || !steps || !ingredients) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the recipe already exists in favourites
        const existingRecipe = await History.findOne({ recipeName: name });
        let favId;

        // Create a new favourite recipe
        const newFavourite = new History({
            recipeName: name,
            recipeIngrids: ingredients,
            recipeStps: steps,
            user: userId
        });
        const result = await newFavourite.save();
        favId = result._id;


        // Update the user's favourites array
        await User.findByIdAndUpdate(userId, {
            $push: { history: favId } // $addToSet ensures no duplicates
        });

        res.status(200).json({ message: 'Recipe added to history' });
    } catch (error) {
        console.error('Error inserting favourite recipe:', error);
        res.status(500).json({ error: 'Failed to add recipe to history' });
    }
};



const fetchFavs = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const val = verifyJWT(token);
        if (!val) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = val.userId; // Assuming the verifyJWT function returns an object with the user's ID
        const user = await User.findById(userId).populate('favourites');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.favourites);
    } catch (error) {
        console.error('Error fetching favourites:', error);
        res.status(500).json({ error: 'Failed to fetch favourites' });
    }
};

const fetchHistory = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const val = verifyJWT(token);
        if (!val) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = val.userId; // Assuming the verifyJWT function returns an object with the user's ID
        const user = await User.findById(userId).populate({
            path: 'history',
            options: {
                sort: { createdAt: -1 }, // Sort by creation date in descending order
                limit: 10 // Limit to 10 recipes
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};


const removeRecipe = async (req, res) => {
    const { recipeName } = req.body;

    try {
        // Verify user token
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const val = verifyJWT(token);
        if (!val) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Find and delete the recipe from favourites collection
        const deletedRecipe = await Fav.findOneAndDelete({ recipeName });
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Remove the recipe reference from the user's favourites array
        const userId = val.userId; // Assuming verifyJWT returns an object with user ID
        await User.findByIdAndUpdate(userId, {
            $pull: { favourites: deletedRecipe._id }
        });

        res.status(200).json({ message: 'Recipe removed from favourites', recipe: deletedRecipe });
    } catch (error) {
        console.error('Error removing recipe from favourites:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createImage = async (req, res) => {
    const { recipeName } = req.body;
    console.log("name:", recipeName);
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            text: recipeName,
            width: 512,
            height: 512
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error);
        res.status(400).json("Error:", error)
    }
}


module.exports = { getAllIngs, fetchHistory, createHistory, check, logout, register, login, fetchRecipes, fetchFavs, removeRecipe, starRecipe, createImage };