from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

from chatbot import ask_gemini

app = Flask(__name__)


@app.route("/")
def home():

    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        user_message = data.get("message", "").strip()

        if user_message == "":

            return jsonify({

                "response": "Please enter a message."

            })

        ai_response = ask_gemini(user_message)

        return jsonify({

            "response": ai_response

        })

    except Exception as e:

        return jsonify({

            "response": f"Error : {str(e)}"

        })


if __name__ == "__main__":

    app.run(debug=True)