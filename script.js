const button1 = document.getElementById('button1');
let audio1 = new Audio();
audio1.src = "audio.wav"

button1.addEventListener("click", function() {
    audio1.play();
    audio1.addEventListener("playing", function() {
        console.log("audio playing")
    })
    audio1.addEventListener("ended", function() {
        console.log("audio ended")
    })
})