const playButton = document.getElementById("play");
const switchButton = document.getElementById("switch");
const skipButton = document.getElementById("skip");
const prevButton = document.getElementById("previous");

const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

let audioNum = 1;
let audio1 = new Audio(audioNum.toString() + ".mp3");
let audioContext;

let myReq;
let bars = true;

if(audioContext == null) {
    audioContext = new (window.AudioContext)();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;
}

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = canvas.width/bufferLength;
let barHeight;
let x;

function animate() {
    x=0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    if(bars) {
        drawBars(bufferLength, x, barWidth, barHeight, dataArray);
    } else {
        drawCircle(bufferLength, x, barWidth, barHeight, dataArray);
    }
    
    myReq = requestAnimationFrame(animate);
}

playButton.addEventListener("click", function() {
    if(playButton.innerHTML == "play ▶️") {
        

        audio1.play();

        
        animate(bars);
        playButton.innerHTML = "pause ⏸"
    }
    else {
        playButton.innerHTML = "play ▶️";
        cancelAnimationFrame(myReq);
        audio1.pause();
    }
})

function drawBars(bufferLength, x, barWidth, barHeight, dataArray) {
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*3;
        ctx.fillStyle = "white";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x+= barWidth+5;
    }
}

function drawCircle(bufferLength, x, barWidth, barHeight, dataArray) {
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*2;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i + Math.PI * 2 / bufferLength)
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, barWidth, barHeight);
        x+= barWidth+5;
        ctx.restore();
    }
}

switchButton.addEventListener("click", function() {
    cancelAnimationFrame(myReq);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(switchButton.innerHTML == "switch visualization style 🥧") {
        switchButton.innerHTML = "switch visualization style 📊";
    } else {
        switchButton.innerHTML = "switch visualization style 🥧";
    }
    bars = !bars;
    animate(bars);
})

skipButton.addEventListener("click", function() {
    audioNum+=1;
    audio1.src = audioNum.toString() + ".mp3";
    audio1.load();
    audio1.play();
});

prevButton.addEventListener("click", function() {
    audioNum-=1;
    audio1.src = audioNum.toString() + ".mp3";
    audio1.load();
    audio1.play();
});

const spotifyButton = document.getElementById("spotify");
spotifyButton.addEventListener("click", function() {
    spotifyButton.innerHTML = "connected to spotify ✅"
});
