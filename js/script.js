// Add event listener for mousewheel 
window.addEventListener('mousewheel', function (e) {
  e.preventDefault();
  scrollPages(e.wheelDelta); // handle mousewheel event
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
    if (op >= 1) {
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
    if (op <= 0) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.01;
  }, 10);
}


/** 
 * Action Listener Function for when user uses mouse scroll on page.
 * The Delta indicates whether user scrolled up or down
 * This can then be used to navigate the user fowards or backwards on the page
 * As we are using horizontal scroll, this means moving from one "slide" to the next
*/
function scrollPages(delta) {
  var direction = (delta > 0) ? -1 : 1;  // positive = user wants to go backwards, negative = user wants to scroll forwards
  var pageAnchors = ['home', 'about', 'packages', 'timeline', 'contact']; // Our "Page" anchors which are DIV's within index.html
  var currentPage = 0; // A variable for storing the current page's index within pageAnchors

  pageAnchors.forEach((anchor, index) => {
    if (anchor == fullpage_api.getActiveSlide().anchor) currentPage = index; // Use fullpage's API to get the current active "slide" div
  });

  if (currentPage == 0) pauseVideo(); // If we are on the first page make sure we pause our video and reset the Play button
  
  var anchorIndex = currentPage + direction; // Get the index of the page anchor we want to move to
  
  
  if (anchorIndex == 0) {
    window.location.href = ""; // If its back to the home page (index 0), simply redirect to home
  } else if (anchorIndex > 0 && anchorIndex < pageAnchors.length) {
    window.location.href = "#main/" + pageAnchors[anchorIndex]; // redirect user to the new anchor
  }
}

/**
 * Video to pause the home page video and reset the play button
 */ 
function pauseVideo() {
  video.pause();
  btn.innerHTML = "Play";
}