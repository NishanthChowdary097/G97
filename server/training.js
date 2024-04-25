const { pipeline } = require('@huggingface/node-huggingface');

// Initialize the text generation pipeline
const generator = pipeline('text-generation', {
  model: 'distilbart-cnn-12-6',
});

// Provide a list of cooking steps
const cookingSteps = [
  'Preheat the oven to 350 degrees F (175 degrees C).',
  'Grease a 9x13 inch baking dish.',
  'In a large bowl, mix together the sugar, flour, and cocoa.',
  'Stir in the eggs, milk, and vanilla extract.',
  'Spread the mixture into the prepared baking dish.',
  'Bake for 25 to 30 minutes in the preheated oven.',
  'Let cool, then cut into squares.'
];

// Generate some text for each cooking step
const prompts = cookingSteps.map((step, i) => `Step ${i + 1}: ${step}`);
const responses = Promise.all(prompts.map(prompt => generator(prompt)));

// Print the generated recipe
const recipe = responses.map(response => response.generatedText).join('\n');
console.log(recipe);