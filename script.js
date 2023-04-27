const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const switchButton = document.getElementById("switch");

const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

let audio1 = new Audio("hindi.mp3");
let audioContext;

let myReq;

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
            barHeight = dataArray[i]*3;
            ctx.fillStyle = "white";
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x+= barWidth+5;
        }
        myReq = requestAnimationFrame(animate);
    }
    animate();
})

pauseButton.addEventListener("click", function() {
    cancelAnimationFrame(myReq);
    audio1.pause();
    
})

stopButton.addEventListener("click", function() {
    audio1.src = "hindi.mp3";
    audio1.load();
})

switchButton.addEventListener("click", function() {
    cancelAnimationFrame(myReq);
    ctx.clearRect(0,0,canvas.width, canvas.height);
})
const spotifyButton = document.getElementById("spotify");
spotifyButton.addEventListener("click", function() {
    
})
