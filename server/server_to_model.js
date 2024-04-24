const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['../nlp/generaterecipe.py']);

pythonProcess.stdin.write(JSON.stringify({"cooking_steps":[
    "Preheat the oven to 350 degrees F (175 degrees C).",
         "Grease a 9x13 inch baking dish.",
         "In a large bowl, mix together the sugar, flour, and cocoa.",
         "Stir in the eggs, milk, and vanilla extract.",
         "Spread the mixture into the prepared baking dish.",
         "Bake for 25 to 30 minutes in the preheated oven.",
         "Let cool, then cut into squares."]}));
pythonProcess.stdin.end();

pythonProcess.stdout.on('data', (data) => {
    console.log(`Sum of array from Python process = ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python process: ${data}`);
});

pythonProcess.on('exit', (code) => {
    console.log(`Python process exited with code ${code}`);
});