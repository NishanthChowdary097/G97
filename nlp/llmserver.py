import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, GenerationConfig
from flask import Flask, request, jsonify
from time import perf_counter
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

model_name = "eaglet/Testing"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
print("Hi")

logger.info(f"Using device: {device}")

def generate_resp(user_input):
    prompt = formated_prompt(user_input)

    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    generation_config = GenerationConfig(
        penalty_alpha=0.6,
        do_sample=True,
        max_new_tokens=2048,
        pad_token_id=tokenizer.eos_token_id
    )

    start_time = perf_counter()

    with torch.no_grad():
        outputs = model.generate(**inputs, generation_config=generation_config)

    output_time = perf_counter() - start_time
    logger.info(f"Time taken: {round(output_time, 2)} seconds")

    return tokenizer.decode(outputs[0], skip_special_tokens=True)

def formated_prompt(quest):
    return f"<user>user:\n{quest}\n<assistant>assistant:\n"

def parse_response(response_text):
    lines = response_text.split('\n')
    name = None
    ingredients = []
    steps = []
    section = None

    for line in lines:
        line = line.strip()
        if any(line.lower().startswith(keyword) for keyword in ['name:', 'recipe:', 'item:', 'title:']):
            name = line.split(':', 1)[1].strip()
            section = 'ingredients'
        elif any(line.lower().startswith(keyword) for keyword in ['directions:', 'steps:']):
            section = 'ingredients'
        elif line.lower().startswith('steps:'):
            section = 'steps'
        elif section == 'ingredients' and line:
            ingredients.append(line)
        elif section == 'steps' and line:
            steps.append(line)

    return {
        "name": name,
        "ingredients": ingredients,
        "steps": steps
    }

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    logger.info(f"Received ingredients: {ingredients}")

    user_input = (f"you are a well known chef known for cooking very tasty food with given set of ingredients. "
                  f"Given a list of ingredients, generate a unique recipe that makes use of all the given ingredients. "
                  f"Also give a unique name for the recipe, list of all the ingredients which are required to prepare that recipe "
                  f"and the detailed steps involved in making that recipe. The given ingredients are {ingredients}. "
                  f"The first line of the output should contain the name of the file as: 'name':`name`, the second should contain the ingredients as: 'ingredients':`all the ingredients` and the last line should contain the steps as: 'steps':`list of steps`")

    while True:
        response_text = generate_resp(user_input)
        formatted_response = parse_response(response_text)

        if formatted_response["name"] and formatted_response["ingredients"] and formatted_response["steps"]:
            break
        else:
            logger.info("Generated response is invalid. Retrying...")

    return jsonify({"recipe": formatted_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
