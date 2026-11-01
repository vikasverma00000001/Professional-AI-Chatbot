from google import genai

from config import GEMINI_API_KEY

from utils.prompts import SYSTEM_PROMPT


client = genai.Client(
    api_key=GEMINI_API_KEY
)

def ask_gemini(user_message):

    prompt = f"""

{SYSTEM_PROMPT}

User:

{user_message}

"""

    response = client.models.generate_content(

        model="gemini-3.8-flash",

        contents=prompt

    )

    return response.text