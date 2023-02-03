// Fullpage UI script, needs to be called before end of body tag in order to initialise
var myFullpage = new fullpage('#fullpage', {
    sectionsColor: ['#11190A']
});


/** Full screen Video 
 * ref: W3 Schools. How To Create a Fullscreen Video
 * src: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp
*/

// Get the video
var video = document.getElementById("heroVideo");
var heroImage = document.getElementById('heroImage');
var videoWrapper = document.getElementById('videoWrapper');

video.addEventListener('ended', videoFinished, false);
video.addEventListener('pause', videoFinished, false)

// Get the button
var btn = document.getElementById("myBtn");
btn.addEventListener('click', pauseStartVideo)

// Pause and play the video, and change the button text
function pauseStartVideo() {
  if (video.paused) {
    heroImage.style.opacity = 0;
    videoWrapper.style.opacity = 1;
    element.style.filter = 'alpha(opacity=' + 1 * 100 + ")";
    video.play();
    btn.innerHTML = "Pause";
  } else {
    videoWrapper.style.opacity = 0;
    heroImage.style.opacity = 1;
    video.pause();
    btn.innerHTML = "Play";
  }
}

// If the video is stopped due to the user or a click on the page, remove the video
// and replace with heroImage
function videoFinished(e) {
    fade(videoWrapper);
    unfade(heroImage);
    btn.innerHTML = "Play";
}


/** Fading and Fading out Elements Functions
 * ref: StackOverflow, user "Ubu"
 * src: https://stackoverflow.com/a/6121270
 * */ 
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'inline';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.01;
    }, 10);
}

function fade(element) {
    var op = 1;  // initial opacity
    // element.style.display = 'inline';
    var timer = setInterval(function () {
        if (op <= 0){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.01;
    }, 10);
}