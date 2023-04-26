const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

container.addEventListener("click", function() {
    let audio1 = new Audio("hindi.mp3");
    const audioContext = new (window.AudioContext)();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;
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
            x+= barWidth+10;
        }
        requestAnimationFrame(animate);
    }
    animate();
})

const spotifyButton = document.getElementById("spotify");
spotifyButton.addEventListener("click", function() {
    
})
