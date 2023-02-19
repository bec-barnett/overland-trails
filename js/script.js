
// Add event listener for mousewheel 
window.addEventListener('mousewheel', function (e) {
  // e.preventDefault();
  scrollPages(e.wheelDelta); // handle mousewheel event
});


// Fullpage UI script, needs to be called before end of body tag in order to initialise
var myFullpage = new fullpage('#fullpage', {
  sectionsColor: ['#11190A'],
  loopHorizontal: false,
  anchors: ['home', 'packages', 'timeline', 'contact'],
  menu: '#menu-nav',
  scrollingSpeed: 2500,
});

const scroller = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

/**
 * Function to open the sideNav
 * Source: https://www.w3schools.com/howto/howto_js_sidenav.asp
*/
function openNav() {
  var size = window.matchMedia("(max-width: 768px)")
  if (size.matches) { // If media query matches
    document.getElementById("sideBar").style.width = "100%";
  } else {
    document.getElementById("sideBar").style.width = "20%";
  }
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

/**
 * Add support for the splide library
 * */ 
document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '.splide' );
  splide.mount();
} );


/**
 * Open a fullscreen dialog to make a picture larger
 * Uses shoelace dialog component
*/
const dialog = document.querySelector('.dialog-width');
const dialogImage = document.getElementById('fullscreenPicture');
const description = document.getElementById('fullscreenPictureDescription');
const slideshowImages = document.querySelectorAll(".slideshowImage");
const header = document.getElementById('head');

for (var i = 0, len = slideshowImages.length; i < len; i += 1) {
    let imageURL = slideshowImages[i].src;
    let imageDescription = slideshowImages[i].getAttribute('alt');
    slideshowImages[i].addEventListener('click', () => {
      dialog.show();
      header.style.display = 'none';
      dialogImage.src = imageURL;
      description.innerHTML = imageDescription; 
  });
}


const closeButton = dialog.querySelector('sl-button[slot="footer"]');
closeButton.addEventListener('click', () => {
  dialog.hide();
  header.style.display = 'inline';
});

/**
 * Add Event Listeners to Timeline Images
 * When Images are clicked, the description text updates
 * 
 */
const mornTimelinePicDescriptions = [
  "8AM: After breakfast take the easy way up the hill in air-conditioned comfort.",
  "9AM: Enjoy the peacefulness that only the Tasmanian remote wilderness can offer. You'll feel miles away from civilisation.",
  "10AM: Develop an appetite as you make your way cross-country on our unique private mountain biking tracks.",
  "11AM: Pause and appreciate the view as we head further away from civilisation.",
  "12PM: Keep an eye out for the local wildlife!"
];
const afternTimelinePicDescriptions = [
  "1PM: Enjoy a lunchtime spread from some of Tasmania's finest producers. Sample some of Tasmania's famous cold-climate wines.",
  "3PM: Marvel at the view and get ready for an epic downhill track back towards camp.",
  "4PM: Enjoy an endless sunset that stretches on forever in the southern highlands.",
  "5PM: Practice some technical skills around the camp feature ground. You'll put them to good use tomorrow.",
  "6PM: Arrive to find your cozy camp setup and waiting for you. A good nights rest awaits."
];
const morningTimelinePictures = document.querySelectorAll(".morningImage");
const afternoonTimelinePictures = document.querySelectorAll(".afternoonImage");
const morningTimelineDescription = document.getElementById('morningParagraph');
const afternoonTimelineDescription = document.getElementById('afternoonParagraph');

for (var i = 0, len = morningTimelinePictures.length; i < len; i += 1) {
  let desc = mornTimelinePicDescriptions[i];
  morningTimelinePictures[i].addEventListener('click', () => {
    morningTimelineDescription.innerHTML = desc; 
});
}

for (var i = 0, len = afternoonTimelinePictures.length; i < len; i += 1) {
  let desc = afternTimelinePicDescriptions[i];
  afternoonTimelinePictures[i].addEventListener('click', () => {
    afternoonTimelineDescription.innerHTML = desc; 
});
}

/**
 * Contact Form
 * */ 
const form = document.querySelector('#contactForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.innerHTML = '<p>Thanks for your message!<br><br>We will be in contact shortly.</p>';
  });



