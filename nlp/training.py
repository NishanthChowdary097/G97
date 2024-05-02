# import random
# import json
# import pickle
# import numpy as np

# import nltk
# from nltk.stem import WordNetLemmatizer

# # from tensorflow.keras.models import Sequential
# # from tensorflow.keras.layers import Dense, Activation, Dropout
# # from tensorflow.keras.optimizers import SGD

# lematizer = WordNetLemmatizer

# intents = json.loads('./intends.json').read()

# words = []
# classes =[]
# documents = []
# ignore_letters = [',','.',"'",'"',"?","!"]

# for intent in intents['intents']:
#     for pattern in intent['patterns']:
#         words_list=nltk.word_tokenize(pattern)
#         words.append(words_list)
#         documents.append((words_list,intent['tag']))
#         if intent['tag'] not in classes:
#             classes.append(intent['tag'])
# print(documents)



# from transformers import T5ForConditionalGeneration, T5Tokenizer, AdamW

# # Load pre-trained T5 model and tokenizer
# model = T5ForConditionalGeneration.from_pretrained('t5-base')
# tokenizer = T5Tokenizer.from_pretrained('t5-base')

# # Prepare training data
# train_data = [
#     {'ingredients': 'flour, sugar, eggs, butter', 'recipe': 'Step 1: Preheat oven to 350°F. Step 2:..'}, 
# ]

# # Tokenize and encode data
# inputs = tokenizer(
#     [f"ingredients: {example['ingredients']} recipe: {example['recipe']}" for example in train_data],
#     max_length=512,
#     padding='max_length',
#     truncation=True,
#     return_tensors='pt'
# )

# # Fine-tune the model
# model.train()
# optimizer = AdamW(model.parameters(), lr=5e-5)
# for epoch in range(num_epochs):
#     for batch in train_dataloader:
#         outputs = model(**batch)
#         loss = outputs.loss
#         loss.backward()
#         optimizer.step()
#         optimizer.zero_grad()

# # Generate recipe from ingredients
# ingredients = 'flour, sugar, eggs, butter'
# input_ids = tokenizer.encode(f"ingredients: {ingredients} recipe:", return_tensors='pt')
# output_ids = model.generate(input_ids, max_length=512, num_beams=4, early_stopping=True)
# recipe = tokenizer.decode(output_ids[0], skip_special_tokens=True)
# print(recipe)


from transformers import T5ForConditionalGeneration, T5Tokenizer, AdamW
from torch.utils.data import DataLoader, Dataset

# Load pre-trained T5 model and tokenizer
model = T5ForConditionalGeneration.from_pretrained('t5-base')
tokenizer = T5Tokenizer.from_pretrained('t5-base')

# Prepare training data
train_data = [
    {'ingredients': 'flour, sugar, eggs, butter', 'recipe': 'Step 1: Preheat oven to 350°F. Step 2: ...'}, 
    # ... more training examples
]

# Tokenize and encode data
inputs = tokenizer(
    [f"ingredients: {example['ingredients']} recipe: {example['recipe']}" for example in train_data],
    max_length=512,
    padding='max_length',
    truncation=True,
    return_tensors='pt'
)

# Define the number of epochs and batch size
num_epochs = 3
batch_size = 8

# Define custom dataset and create DataLoader
class RecipeDataset(Dataset):
    def __init__(self, data):
        self.data = data

    def __getitem__(self, index):
        return self.data[index]['ingredients'], self.data[index]['recipe']

    def __len__(self):
        return len(self.data)

dataset = RecipeDataset(train_data)
train_dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Fine-tune the model
model.train()
optimizer = AdamW(model.parameters(), lr=5e-5)
for epoch in range(num_epochs):
    for ingredients, recipes in train_dataloader:
        inputs = tokenizer(
            [f"ingredients: {ingr} recipe: {recipe}" for ingr, recipe in zip(ingredients, recipes)],
            max_length=512,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        outputs = model(**inputs)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# Generate recipe from ingredients
ingredients = 'flour, sugar, eggs, butter'
input_ids = tokenizer.encode(f"ingredients: {ingredients} recipe:", return_tensors='pt')
output_ids = model.generate(input_ids, max_length=512, num_beams=4, early_stopping=True)
recipe = tokenizer.decode(output_ids[0], skip_special_tokens=True)
print(recipe)
