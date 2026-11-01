from chatbot import ask_gemini

while True:

    question = input("You : ")

    if question.lower() == "exit":
        break

    answer = ask_gemini(question)

    print()

    print("Gemini :")

    print(answer)

    print()