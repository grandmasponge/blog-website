
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

class Message {
    constructor(text) {
        this.string = "";
        this.domstring = "";
    }

    #isUrl(str){
        try {
            new URL(str);
            return true
        } catch(_) {
            return false
        }
    }

    #isImageUrl(url) {
        return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
    }
}


export const ChatType = {
    KITTY: "kittychat",
    CHAT: "normalchat"
}

export class Chat {
    constructor() {
        this._textbox = null;
    }

    set textbox(textbox) {
        this.textbox = textbox;
    }

    
    send_message() {
        throw new Error("send message must be implmented");
    }
    
    recieve_message() {
        throw new Error("recieve message must be implimented");
    }
}


export class KittyChat extends Chat {
    send_message(text) {

    }
}

export function ChatFactory(type) {
    switch (type) {
        case ChatType.KITTY:
            return new KittyChat()
            break;
        case ChatType.CHAT:
            throw new Error("not implimented")
        default:
            throw new Error("must provide valid chat type")
    }
}


