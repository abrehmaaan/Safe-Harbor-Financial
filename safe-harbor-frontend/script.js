const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
let chatTranscript = null;
const inputInitHeight = chatInput.scrollHeight;
let threadId = null;
const MY_API_URL = "https://056aedeb-38a5-4153-b717-22b43efdf0e1-00-jl23a6o97u7i.worf.replit.dev";

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").innerHTML = message;
  return chatLi;
}

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ thread_id: threadId, message: userMessage })
  }
  fetch(`${MY_API_URL}/chat`, requestOptions).then(res => res.json()).then(data => {
    messageElement.innerHTML = data.response;
    chatTranscript = chatTranscript + `Lisa: ${data.response}\n\n`;

    const quickReplyButtons = document.querySelectorAll('.quick_reply');

    quickReplyButtons.forEach(button => {
      button.addEventListener('click', function() {
        userMessage = button.textContent;
        chatTranscript = chatTranscript + `User: ${userMessage}\n\n`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
          const incomingChatLi = createChatLi("Generating response...", "incoming");
          chatbox.appendChild(incomingChatLi);
          chatbox.scrollTo(0, chatbox.scrollHeight);
          generateResponse(incomingChatLi);
        }, 600);
      });
    });

  }).catch(() => {
    messageElement.classList.add("error");
    messageElement.textContent = "Oops! Something went wrong. Please try again.";
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatTranscript = chatTranscript + `User: ${userMessage}\n\n`;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Generating response...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => {
  const body = document.body;
  if (body.classList.contains("show-chatbot")) {
    body.classList.remove("show-chatbot");
    // document.querySelector('ul.chatbox').innerHTML = `<li class="info"><img src="image.png" alt="Image" width="80" height="80"></li><li class="info"><h3>Safe Harbor's Support Assistant</h3></li><li class="info"><p>I can help with info on our company and services!</p></li>`;
    // threadId = null;

  } else {
    body.classList.add("show-chatbot");
    if (threadId == null) {
      fetch(`${MY_API_URL}/start`)
        .then(response => response.json())
        .then(data => {
          threadId = data.thread_id;
          userMessage = "Hello";
          // chatTranscript = chatTranscript +  `User: ${userMessage}\n\n`;
          // chatbox.appendChild(createChatLi(userMessage, "outgoing"));
          // chatbox.scrollTo(0, chatbox.scrollHeight);

          setTimeout(() => {
            const incomingChatLi = createChatLi("Starting conversation...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
          }, 600);
        })
        .catch(error => console.error('Error:', error));
    }
  }
});
chatbotToggler.addEventListener("click", () => {
  const body = document.body;
  if (body.classList.contains("show-chatbot")) {
    body.classList.remove("show-chatbot");
    // document.querySelector('ul.chatbox').innerHTML = `<li class="info"><img src="image.png" alt="Image" width="80" height="80"></li><li class="info"><h3>Safe Harbor's Support Assistant</h3></li><li class="info"><p>I can help with info on our company and services!</p></li>`;
    // threadId = null;

  } else {
    body.classList.add("show-chatbot");
    if (threadId == null) {
      fetch(`${MY_API_URL}/start`)
        .then(response => response.json())
        .then(data => {
          threadId = data.thread_id;
          userMessage = "Hello";
          // chatTranscript = chatTranscript +  `User: ${userMessage}\n\n`;
          // chatbox.appendChild(createChatLi(userMessage, "outgoing"));
          // chatbox.scrollTo(0, chatbox.scrollHeight);

          setTimeout(() => {
            const incomingChatLi = createChatLi("Starting conversation...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
          }, 600);
        })
        .catch(error => console.error('Error:', error));
    }
  }
});