from transformers import pipeline
from json import loads

generator = pipeline('text-generation')
cooking_steps=input()
cooking_steps=loads(cooking_steps)
print(cooking_steps)
cooking_steps = [
    "Preheat the oven to 350 degrees F (175 degrees C).",
    "Grease a 9x13 inch baking dish.",
    "In a large bowl, mix together the sugar, flour, and cocoa.",
    "Stir in the eggs, milk, and vanilla extract.",
    "Spread the mixture into the prepared baking dish.",
    "Bake for 25 to 30 minutes in the preheated oven.",
    "Let cool, then cut into squares."
]
#this will generate the prompt for the model
prompts = [f'Step {i}: {step}' for i, step in enumerate(cooking_steps['cooking_steps'], 1)]
responses = generator(prompts, max_length=50, do_sample=True)


recipe = ""
for response in responses:
    recipe += response[0]['generated_text'] + "\n"
print(recipe)