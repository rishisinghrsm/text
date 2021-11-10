const textarea = document.querySelector('textarea'),
voicelist =document.querySelector('select'),
speechBtn = document.querySelector('button');

let synth = speechSynthesis,
isspeaking = true;
voices();

function voices(){
    for(let voice of synth.getVoices()){
        // console.log(voice);
        let selected = voice.name === " Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang}) </option>`;
        voicelist.insertAdjacentHTML('beforeend',option);
    }
}

synth.addEventListener('voiceschanged',voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voicelist.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }

       if(textarea.value.length > 110){
           if(isspeaking){
               synth.resume();
               isspeaking =false;
            //    speechBtn.innerText = "Pause Speech";
           }else{
               synth.pause();
               isspeaking =true;
            //    speechBtn.innerText  = "Resume Speech";
           }
       }
    
    }
})
