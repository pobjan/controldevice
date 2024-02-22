const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const videoTimeline = container.querySelector(".video-timeline");
const progressBar = container.querySelector(".progress-bar");
const volumeSlider = container.querySelector(".left input");
const currentVidTime = container.querySelector(".current-time");
const videoDuration = container.querySelector(".video-duration");
const speedOptions = container.querySelector(".speed-options");
const playPause = container.querySelector(".options .play-pause");
const skipBackward = container.querySelector(".options .skip-backward");
const skipForward = container.querySelector(".options .skip-forward");
const videoSpeed = container.querySelector(".options .video-speed");
const picInPic = container.querySelector(".options .pic-in-pic");
const fullscreen = container.querySelector(".options .fullscreen");
const repeatBtn = container.querySelector(".options button.repeat");
const replayBtn = container.querySelector(".options button.replay");
const volumeBtn = container.querySelector(".options button.volume");
const volumeIcn = container.querySelector(".options button.volume i");

let timer;

//document.addEventListener('contextmenu',function(event){event.preventDefault()});

setInterval(()=>{videoStatus()},10);
function videoStatus(){
    if(mainVideo.currentTime >=  .1){replayBtn.classList.remove("none")}
    else{replayBtn.classList.add("none")}

    if(mainVideo.currentTime == mainVideo.duration){
        if(repeatBtn.classList.contains("off")){mainVideo.loop = false}
        else{mainVideo.loop = true}
        container.classList.add("show-controls");    
        clearTimeout(timer); 
    }
    if(container.classList.contains("picture")){setVolume()}
}

function volumeSliderBackground(inputName){
    inputName.style.background = `linear-gradient(to right, #0078FF 0%, #0078FF ${(volumeSlider.value-volumeSlider.min)/(volumeSlider.max-volumeSlider.min)*100}%, #DEE2E6 ${(volumeSlider.value-volumeSlider.min)/(volumeSlider.max-volumeSlider.min)*100}%, #DEE2E6 100%)`;
}

speedOptions.querySelectorAll("li").forEach(option =>{
    option.addEventListener("click",() =>{
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click",e =>{
    if(e.target.className !== "video-speed"){
        speedOptions.classList.remove("show");
    }
});

volumeSliderBackground(volumeSlider);
volumeSlider.oninput = function(){ 
    this.style.background = `linear-gradient(to right, #0078FF 0%, #0078FF ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`;
    mainVideo.volume = this.value;
    if(this.value == 0){
        volumeBtn.classList.add("mute");
        mainVideo.muted = true;
        volumeSlider.value = 0;
        volumeIcn.classList.replace(volumeIcn.className,"vm-volume-xmark");
    }
    if(this.value > 0){
        mainVideo.muted = false;
        volumeSlider.value = mainVideo.volume;
        if(volumeSlider.value >= 0){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-off")}
        if(volumeSlider.value >= .25){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-low")}
        if(volumeSlider.value >= .6){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-medium")}
        if(volumeSlider.value >= .9){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-high")}
    }
};

function videoVolume(){
    if(document.clientWidth < "600"){document.querySelector(".video-controls").classList.toggle("insd")}
    else{
        volumeBtn.classList.toggle("mute");
        if(volumeBtn.classList.contains("mute")){
            mainVideo.muted = true;
            volumeSlider.value = 0;
            volumeIcn.classList.replace(volumeIcn.className,"vm-volume-xmark");
            volumeSliderBackground(volumeSlider);


        }else{
            if(mainVideo.volume == 0){mainVideo.volume = 0.5}
            mainVideo.muted = false;
            volumeSlider.value = mainVideo.volume;
            if(volumeSlider.value >= 0){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-off")}
            if(volumeSlider.value >= .25){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-low")}
            if(volumeSlider.value >= .6){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-medium")}
            if(volumeSlider.value >= .9){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-high")}
            volumeSliderBackground(volumeSlider);

        }
    }
}

function setVolume(){
    if(container.classList.contains("picture")){
        if(mainVideo.muted || mainVideo.volume == 0){
            volumeSlider.value = 0;
            volumeIcn.classList.replace(volumeIcn.className,"vm-volume-xmark");
            volumeBtn.classList.add("mute");
            volumeSliderBackground(volumeSlider);
        }else{
            volumeSlider.value = mainVideo.volume;
            volumeBtn.classList.remove("mute");
            if(volumeSlider.value >= 0){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-off")}
            if(volumeSlider.value >= .25){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-low")}
            if(volumeSlider.value >= .6){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-medium")}
            if(volumeSlider.value >= .9){volumeIcn.classList.replace(volumeIcn.className, "vm-volume-high")}
            volumeSliderBackground(volumeSlider);
        }
    }
}

function videoReplay(){
    if(mainVideo.currentTime >= .1){
        mainVideo.currentTime = 0;
        mainVideo.play();
        hideControls();
    }
}

function videoScreen(mode) {
    if (mode == "fullscreen") {
        if (!document.fullscreenElement) {
            document.exitPictureInPicture()
            if (container.requestFullscreen){container.requestFullscreen()}
        }else{
            if(document.exitFullscreen){document.exitFullscreen()}
        }
    }
    if(mode == "picture") {
        if(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement){
            if(document.exitFullscreen){document.exitFullscreen()}
            else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}
            else if(document.webkitExitFullscreen){document.webkitExitFullscreen()}
            else if(document.msExitFullscreen){document.msExitFullscreen()}
        }
        container.classList.remove("fullscreen");
        container.classList.toggle("picture");
        if(container.classList.contains("picture")){mainVideo.requestPictureInPicture()}
        else{document.exitPictureInPicture()}
    }
}

document.addEventListener("fullscreenchange",()=>{
    if (document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement){
        container.classList.add("fullscreen");
    }else{container.classList.remove("fullscreen")}
});

document.addEventListener("keydown",(event)=>{
    if (event.key==="Escape") {
        if(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement){
            if(document.exitFullscreen){document.exitFullscreen()}
            else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}
            else if(document.webkitExitFullscreen){document.webkitExitFullscreen()}
            else if(document.msExitFullscreen){document.msExitFullscreen()}
        }
    }
});

document.addEventListener("keydown",logKey);
function logKey(e){
if(`${e.code}`=="KeyM"){videoVolume()}
if(`${e.code}`=="Space"){mainVideo.paused ? mainVideo.play() : mainVideo.pause()}
if(`${e.code}`=="KeyK"){mainVideo.paused ? mainVideo.play() : mainVideo.pause()}
if(`${e.code}`=="KeyR"){videoReplay()}
if(`${e.code}`=="KeyT"){repeatBtn.classList.toggle("off")}
if(`${e.code}`=="KeyS"){speedOptions.classList.toggle("show")}
if(`${e.code}`=="KeyI"){videoScreen('picture')}
if(`${e.code}`=="KeyF"){videoScreen('fullscreen')}
if(`${e.code}`=="ArrowLeft"){mainVideo.currentTime -= 5}
if(`${e.code}`=="ArrowRight"){mainVideo.currentTime += 5}
}

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
        speedOptions.classList.remove("show");
        document.querySelector(".video-controls").classList.remove("insd");
        if(container.classList.contains("fullscreen")){container.style.cursor = "none";}
    },3000);
}

container.addEventListener("mousemove",() =>{
    container.style.cursor ="auto";
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls(); 
});

const formatTime = time =>{
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10?`0${seconds}`: seconds;
    minutes = minutes < 10?`0${minutes}`: minutes;
    hours = hours < 10?`0${hours}` : hours;

    if(hours == 0){return `${minutes}:${seconds}`}
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e =>{
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth-20) ? timelineWidth-20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e =>{
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e =>{
    let {currentTime,duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});
document.addEventListener("loadeddata", () =>{
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e =>{
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
    const progressTime = videoTimeline.querySelector("span");
    progressTime.style.display = "block";
}

const touchesProgressBar = e =>{
    let touchX = e.touches[0].clientX;
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = touchX - videoTimeline.getBoundingClientRect().left;
    mainVideo.currentTime = (offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
    const progressTime = videoTimeline.querySelector("span");
    progressTime.style.display = "none";
};

playPause.addEventListener("click",()=> {mainVideo.paused ? mainVideo.play() : mainVideo.pause(); this.blur()});
skipBackward.addEventListener("click",()=> {mainVideo.currentTime -= 5; this.blur()});
skipForward.addEventListener("click",()=> {mainVideo.currentTime += 5; this.blur()});
videoSpeed.addEventListener("click",()=> {speedOptions.classList.toggle("show"); this.blur()});
picInPic.addEventListener("click",()=> {videoScreen('picture'); this.blur()});
fullscreen.addEventListener("click",()=> {videoScreen('fullscreen'); this.blur()});
repeatBtn.addEventListener("click",()=> {repeatBtn.classList.toggle("off"); this.blur()});
replayBtn.addEventListener("click",()=> {videoReplay(); this.blur()});
volumeBtn.addEventListener("click",()=> {videoVolume(); this.blur()});
mainVideo.addEventListener("play",()=> {document.querySelector(".options .play-pause i").classList.replace("vm-play","vm-pause"); this.blur()});
mainVideo.addEventListener("pause",()=> {document.querySelector(".options .play-pause i").classList.replace("vm-pause","vm-play"); this.blur()});

videoTimeline.addEventListener("mousedown",()=> videoTimeline.addEventListener("mousemove",draggableProgressBar));
document.addEventListener("mouseup",()=> videoTimeline.removeEventListener("mousemove",draggableProgressBar));
videoTimeline.addEventListener("touchend",()=> videoTimeline.removeEventListener("touchmove", touchesProgressBar));
document.addEventListener("touchstart",()=> videoTimeline.addEventListener("touchmove", touchesProgressBar));