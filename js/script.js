//initialize
var pages = document.getElementsByClassName('slide'),
  navLinks = document.querySelectorAll('#menu-nav a'),
  currentPage = "0";

window.addEventListener('mousewheel', function(e) {
    e.preventDefault();
  scrollPages(e.wheelDelta);
});


// Fullpage UI script, needs to be called before end of body tag in order to initialise
var myFullpage = new fullpage('#fullpage', {
    sectionsColor: ['#11190A'],
    loopHorizontal: false,
    anchors: ['home', 'packages', 'timeline', 'contact'],
    menu: '#menu-nav',
    scrollingSpeed: 1500,
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

// Get the button
var btn = document.getElementById("myBtn");
btn.addEventListener('click', pauseStartVideo);

// Pause and play the video, and change the button text
function pauseStartVideo() {
  if (video.paused) {
    heroImage.style.opacity = 0;
    videoWrapper.style.opacity = 1;
    video.style.filter = "alpha(opacity=100)";
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
    if (currentPage == 1) {
        fade(videoWrapper);
        unfade(heroImage);
        btn.innerHTML = "Play";
    }
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



function scrollPages(delta) {
  // delta indicates whether user scrolled up or down
  // positive = up, negative = down
  var direction = (delta > 0) ? -1 : 1;
  var anchors = ['home', 'packages', 'timeline', 'contact'];
  anchors.forEach((anchor, index) => {
    if (anchor == fullpage_api.getActiveSlide().anchor) currentPage = index
  });
  //if (direction == 'down' && currentPage < 4) currentPage = currentPage--;
  //if (direction == 'up' && currentPage > 1) currentPage = currentPage++;

  // alert("Active Slide is: " + fullpage_api.getActiveSlide().anchor + "Delta is: " + delta + " Direction is: " + direction + " Current Page is: " + currentPage);
  if (currentPage == 0) {
    video.pause();
    btn.innerHTML = "Play";
  }
  //var thePlaceIwantToGoto = "#home/" + anchors[currentPage];
  //alert(thePlaceIwantToGoto);
  anchorIndex = currentPage + direction;
  if (anchorIndex == 0) {
    window.location.href = "";
  } else if (anchorIndex > 0 && anchorIndex < 5 ) {
    window.location.href = "#home/" + anchors[currentPage + direction];
  }
}