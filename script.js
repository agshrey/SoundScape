const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");

const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

let audio1 = new Audio("hindi.mp3");
let audioContext;
// audioSource = audioContext.createMediaElementSource(audio1);
// analyser = audioContext.createAnalyser();
// audioSource.connect(analyser);
// analyser.connect(audioContext.destination);
// analyser.fftSize = 512;
// const bufferLength = analyser.frequencyBinCount;
// const dataArray = new Uint8Array(bufferLength);


playButton.addEventListener("click", function() {
    if(audioContext == null) {
        audioContext = new (window.AudioContext)();
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512;
    }

    audio1.play();

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate() {
        x=0;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]*1.5;
            ctx.fillStyle = "white";
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x+= barWidth+5;
        }
        requestAnimationFrame(animate);
    }
    animate();
})

pauseButton.addEventListener("click", function() {
    audio1.pause();
})

stopButton.addEventListener("click", function() {
    audio1.src = "hindi.mp3";
    audio1.load();
})

const spotifyButton = document.getElementById("spotify");
spotifyButton.addEventListener("click", function() {
    
})
