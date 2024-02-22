let body = document.querySelector("body");

localStorage.setItem("bodyWidth", body.clientWidth);
localStorage.setItem("bodyHeight", body.clientHeight);

function fullScreen(mode, element) {
    const elem = element || document.documentElement;

    if (mode) {
        // Włącz tryb pełnoekranowy
        if(elem.requestFullscreen){elem.requestFullscreen()}
        else if(elem.mozRequestFullScreen){elem.mozRequestFullScreen()} // Firefox
        else if(elem.webkitRequestFullscreen){elem.webkitRequestFullscreen()} // Chrome, Safari, and Opera
        else if(elem.msRequestFullscreen){elem.msRequestFullscreen()} // IE/Edge
    } else {
        // Wyłącz tryb pełnoekranowy
        if(document.exitFullscreen){document.exitFullscreen()}
        else if(document.mozCancelFullScreen){document.mozCancelFullScreen()} // Firefox
        else if(document.webkitExitFullscreen){document.webkitExitFullscreen()} // Chrome, Safari, and Opera
        else if(document.msExitFullscreen){document.msExitFullscreen()} // IE/Edge
    }
}

function fullScreen(mode, element) {
    const elem = element || document.documentElement;
    if(mode){
        if(elem.requestFullscreen){elem.requestFullscreen()}
        else if(elem.mozRequestFullScreen){elem.mozRequestFullScreen()}
        else if(elem.webkitRequestFullscreen){elem.webkitRequestFullscreen()}
        else if(elem.msRequestFullscreen){elem.msRequestFullscreen()}
    }else{
        if(document.exitFullscreen){document.exitFullscreen()}
        else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}
        else if(document.webkitExitFullscreen){document.webkitExitFullscreen()}
        else if(document.msExitFullscreen){document.msExitFullscreen()}
    }
}