from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

user_input_history = ""
conversation_history = []

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():

    global conversation_history
    data = request.get_json()
    what = data.get('what', '')
    context = data.get('context', '')
    goal = data.get('goal', '')
    character = data.get('character', '')
    user_input_history = what + context + goal + character

    # Use OpenAI API to generate a prompt
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    # Add user's input to conversation history
    conversation_history.append({"role": "user", "content": f"In 200 words max, come up with perspectives of other people in the conflict and address the goal of the user, based on the input here: {user_input_history}"})
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=conversation_history
    )
    
    prompt = response.choices[0].message.content
    
    # Add AI's response to conversation history
    conversation_history.append({"role": "assistant", "content": prompt})
    
    return jsonify({'prompt': prompt})


@app.route('/get-feedback', methods=['POST'])
def get_feedback():
    global conversation_history
    data = request.get_json()
    user_response = data.get('response', '')

    # Add user's response to conversation history
    conversation_history.append({"role": "user", "content": f"The user response here may add more feedback to the previous generation of other's perspective, incorporate this with the initial user input and come up with a 200 word action plan:\n\n{user_response}"})

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=conversation_history
    )

    feedback = response.choices[0].message.content

    feedback = (feedback
               .replace('###', '')  # Remove ### symbols
               .replace('**', '')
               .strip())  # Remove extra whitespace
    
    # Add AI's feedback to conversation history
    conversation_history.append({"role": "assistant", "content": feedback})
    
    return jsonify({'feedback': feedback})


if __name__ == '__main__':
    app.run(debug=True)
