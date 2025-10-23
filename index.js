
const unvoiced = document.querySelectorAll(".unvoiced");
const voiced = document.querySelectorAll(".voiced");

const highlightCell = (elements) => {
    for (let el of elements) {
        if (el.classList.contains("impossible")) {
            continue;
        }
        const currBackground = el.style.backgroundColor;
        el.addEventListener("mouseenter", (e) => {
            el.style.backgroundColor = "green";
            const sound = el.innerText;
            if (sound.length > 0) {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(sound);
                // synth.speak(utterance);
            }
        });
        el.addEventListener("mouseleave", (e) => {
            el.style.backgroundColor = currBackground;
        });
    }
}

highlightCell(unvoiced);
highlightCell(voiced);

const playClip = document.createElement('video');
playClip.setAttribute("height", "50%");
playClip.setAttribute("width", "50%");
playClip.setAttribute("controls", true);
playClip.setAttribute("autoplay", true);
const audio = document.createElement("source");
audio.setAttribute("src", "./IPA-Sounds/0_ipa_b.mp4");
audio.setAttribute("type", "video/mp4");
playClip.appendChild(audio);

document.body.appendChild(playClip);
setTimeout(5000);
// playClip.play();
// when testing autoplay the user must interact first.
// keep this in mind, but it won't matter in practice since
// they will need to click on the sound
// change IPA.mp4 file names so you can iteratively add them with JS
