import { ChatFactory, ChatType } from "./chat";

const messageForm = document.getElementById("messageform");
const chatBox = document.getElementById("chatbox");


const kittyChat = ChatFactory(ChatType.KITTY);

document.addEventListener("DOMContentLoaded", () => {
    if (messageForm == null) {
        throw new Error("Failed to find message form");
    }
    if (chatBox == null) {
        throw new Error("Failed to find chatbox");
    }
    messageForm.addEventListener("submit", handleform)
})


function handleform(event) {
    event.preventDefault();
    const formData = new FormData(messageForm);
    const formtext = formData.get("messagebox");
    if (formtext == null) {
        console.log("message was null");
        return;
    }

    kittyChat.send_message(formtext);
}