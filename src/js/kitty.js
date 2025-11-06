import { dot, rand } from "three/tsl";

let dots = 0;
let intervalId;
let random;
let base_text;
const err_msg = "Error Has Occured: please rejoin the queue"
let chance;

function LoadKitty() {
    const container = document.getElementById("kitty-container");
    const text_box = document.getElementById("kitty-text")
    if (container && text_box) {
        dots - 0;
        random = Math.floor((Math.random() + 0.5) * 1000);

        base_text = `Please wait: There are currently ${random} people ahead of you for kitty`
        container.style.display = '';
        text_box.textContent = base_text;

        if (intervalId != null) {
            clearInterval(intervalId);
        }
 
        intervalId = setInterval(() => {
                if (random < 10) {
                    text_box.textContent = err_msg;
                    return
                }
                chance = Math.floor(Math.random() * 100);
                if (chance > 50 && chance < 60) {
                    random--;
                    base_text = `Please wait: There are currently ${random} people ahead of you for kitty`;
                }
                if (dots >= 3) {
                    text_box.textContent = base_text;
                }else{
                    text_box.textContent += '.';
                }

                dots = (dots + 1) % 4; 
        }, 500)   
    }

}

window.LoadKitty = LoadKitty;