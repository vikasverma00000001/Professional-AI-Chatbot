// Get HTML Elements

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

// Add Message

function addMessage(message, sender) {

    const div = document.createElement("div");

    div.classList.add("message");

    div.classList.add(sender);

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Typing Indicator

function showTyping() {

    const typing = document.createElement("div");

    typing.classList.add("message");

    typing.classList.add("bot");

    typing.id = "typing";

    typing.innerText = "Gemini is typing...";

    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;
}


function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}


// Send Message

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {

        return;

    }

    addMessage(message, "user");

    userInput.value = "";

    showTyping();

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: message

            })

        });

        const data = await response.json();

        removeTyping();

        addMessage(data.response, "bot");

    }

    catch (error) {

        removeTyping();

        addMessage(
            " Unable to connect to server.",
            "bot"
        );

        console.error(error);

    }

}


// Button Click

sendButton.addEventListener(
    "click",
    sendMessage
);


// Enter Key

userInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


// Auto Focus

window.onload = function () {

    userInput.focus();

};