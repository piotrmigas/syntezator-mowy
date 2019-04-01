const synth = window.speechSynthesis;

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  if (synth.speaking) {
    console.error("Zajęty");
    return;
  }
  if (textInput.value !== "") {
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    synth.speak(speakText);
  }
};

textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});
