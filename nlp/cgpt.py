import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, GPT2Config

# Define your allowed vocabulary
allowed_vocab = ["hello", "world", "how", "are", "you"]

# Initialize tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Modify tokenizer to include only the allowed vocabulary
tokenizer.add_tokens(allowed_vocab, special_tokens=True)
model_config = GPT2Config(
    vocab_size=len(allowed_vocab) + tokenizer.vocab_size,
    n_positions=512,
    n_ctx=512,
    n_embd=768,
    n_layer=12,
    n_head=12,
)
model = GPT2LMHeadModel(model_config)

# Resize the model's embeddings to match the new vocabulary size
model.resize_token_embeddings(len(allowed_vocab) + tokenizer.vocab_size)

# Freeze the original GPT-2 embeddings
original_embeddings = model.transformer.wte.weight.clone()
model.transformer.wte.weight.requires_grad = False

# Ensure only allowed words are generated
def filter_logits(logits, allowed_token_ids):
    mask = torch.ones(logits.size(-1), device=logits.device) * float('-inf')
    mask[allowed_token_ids] = 0
    return logits + mask

# Example generation
input_text = ""
input_ids = tokenizer.encode(input_text, return_tensors="pt")

allowed_token_ids = [tokenizer.convert_tokens_to_ids(word) for word in allowed_vocab]

# Generate text
output = model.generate(
    input_ids,
    max_length=50,
    num_return_sequences=1,
    pad_token_id=tokenizer.eos_token_id,
    eos_token_id=tokenizer.eos_token_id,
    temperature=1.0,
    top_k=0,
    top_p=0.9,
    repetition_penalty=1.0,
    do_sample=True,
    logits_processor=[lambda input_ids, scores: filter_logits(scores, allowed_token_ids)]
)

# Decode and print the generated text
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
