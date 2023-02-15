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

/**
 * Function to open the sideNav
 * Source: https://www.w3schools.com/howto/howto_js_sidenav.asp
*/
function openNav() {
  document.getElementById("sideBar").style.width = "20%";
  document.getElementById("openNavBtn").style.display = "none";
  document.getElementById("closeNavBtn").style.display = "inline";
}

/**
 * Function to close the sideNav
 * Source: https://www.w3schools.com/howto/howto_js_sidenav.asp
*/
function closeNav() {
  document.getElementById("sideBar").style.width = "0";
  document.getElementById("closeNavBtn").style.display = "none";
  document.getElementById("openNavBtn").style.display = "inline";
}


/** Full screen Video 
 * ref: W3 Schools. How To Create a Fullscreen Video
 * src: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp
*/

// Get the video
var video = document.getElementById("heroVideo");
var videoWrapper = document.getElementById('videoWrapper');
video.addEventListener('ended', videoFinished, false);

// Get the pause buttons
var navPauseBtn = document.getElementById("navPauseBtn");
var btmPauseBtn = document.getElementById("btmPauseBtn");
navPauseBtn.addEventListener('click', restartVideo);
btmPauseBtn.addEventListener('click', pauseStartVideo);

// Pause and play the video, and change the button text
function pauseStartVideo() {
  if (video.paused) {
    videoWrapper.style.opacity = 1;
    playVideo();
  } else {
    videoWrapper.style.opacity = 0;
    pauseVideo();
  }
}


/**
 * Video to pause the home page video and reset the play button
 */
function pauseVideo() {
  video.pause();
}

/**
 * Video to play the home page video and reset the play button
 */
function playVideo() {
  if (video.style.display == "none") {
    // If video was finished reload the page to restart the video
    video.style.display = "inline";
    videoWrapper.opacity = 1;
    
  }
  video.play();
}

function restartVideo() {
  window.location.href = "";
}

// If the video is stopped due to the user or a click on the page, remove the video
function videoFinished() {
  btmPauseBtn.style.display = "none";
  fade(videoWrapper);
}


/** Fading Elements Function
 * ref: StackOverflow, user "Ubu"
 * src: https://stackoverflow.com/a/6121270
 * */
function fade(element) {
  var opacity = 1;  // initial opacity
  // if (fullpage_api.getActiveSlide().anchor != "home") opacity = 0;
  var timer = setInterval(function () {
    if (opacity <= 0.01) {
      element.style.opacity = 0;
      video.style.display = "none";
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    opacity -= opacity * 0.01;
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

  if (currentPage == 0) videoWrapper.style.display = "none";

  var anchorIndex = currentPage + direction; // Get the index of the page anchor we want to move to

  if (anchorIndex == 0) {
    window.location.href = "" // Redirect to 'Home' without applying the anchor tag
  } else if (anchorIndex >= 0 && anchorIndex < pageAnchors.length) {
    window.location.href = "#main/" + pageAnchors[anchorIndex]; // redirect user to the new anchor
  }
}

/**
 * Function to redirect user to the home page
 * without applying an anchor tag to the URL
 */
function redirectHome(){
  window.location.href = "";
}

