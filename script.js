const playButton = document.getElementById("play");
// const pauseButton = document.getElementById("pause");
// const stopButton = document.getElementById("stop");
const switchButton = document.getElementById("switch");
const skipButton = document.getElementById("skip");
const prevButton = document.getElementById("previous");

const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

let audio1 = new Audio("zindagi.mp3");
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
    if(playButton.innerHTML == "play ▶️") {
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
            drawBars(bufferLength, x, barWidth, barHeight, dataArray)
            // for(let i = 0; i < bufferLength; i++) {
            //     barHeight = dataArray[i]*3;
            //     ctx.fillStyle = "white";
            //     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            //     x+= barWidth+5;
            // }
            myReq = requestAnimationFrame(animate);
        }
        animate();
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
        // const red = i * barHeight/50;
        // const green = i*2;
        // const blue = barHeight;
        // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        ctx.fillStyle = "white";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x+= barWidth+5;
    }
}

function songChange() {
    if(audio1.src == "hindi.mp3") {
        console.log("hello");
        audio1.src = "zindagi.mp3";
        audio1.load();
    } else {
        audio1.src = "hindi.mp3";
        audio1.load();
    }
}

// pauseButton.addEventListener("click", function() {
//     cancelAnimationFrame(myReq);
//     audio1.pause();
    
// })

// stopButton.addEventListener("click", function() {
//     audio1.src = "hindi.mp3";
//     audio1.load();
// })

switchButton.addEventListener("click", function() {
    cancelAnimationFrame(myReq);
    ctx.clearRect(0,0,canvas.width, canvas.height);
})

skipButton.addEventListener("click", function() {
    console.log(audio1.src);
    if(audio1.src == "http://127.0.0.1:5501/Web%20Projects/vibey/hindi.mp3") {
        audio1.src = "zindagi.mp3";
        audio1.load();
        audio1.play();
    } else {
        audio1.src = "hindi.mp3";
        audio1.load();
        audio1.play();
    }
});

prevButton.addEventListener("click", function() {
    console.log(audio1.src);
    if(audio1.src == "http://127.0.0.1:5501/Web%20Projects/vibey/hindi.mp3") {
        audio1.src = "zindagi.mp3";
        audio1.load();
        audio1.play();
    } else {
        audio1.src = "hindi.mp3";
        audio1.load();
        audio1.play();
    }
});

const spotifyButton = document.getElementById("spotify");
spotifyButton.addEventListener("click", function() {
    
})
