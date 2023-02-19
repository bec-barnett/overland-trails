// Custom JS by Rebecca Barnett, February 2023.
// Please see code comments for references.

// Add event listener for mousewheel for custom horizontal scroll
window.addEventListener('mousewheel', function (e) {
  scrollPages(e.wheelDelta); // handle mousewheel event
});

// Fullpage UI script, needs to be called before end of body tag in order to initialise
var myFullpage = new fullpage('#fullpage', {
  sectionsColor: ['#11190A'],
  loopHorizontal: false,
  anchors: ['home', 'packages', 'timeline', 'contact'],
  menu: '#menu-nav',
  scrollingSpeed: 2500, // Slower scrolling speed between slides adds smoothness to user experience.
});

// Locomotive Scroll, library used for scrolling text
const scroller = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

/**
 * Function to open the sideNav
 * Source: https://www.w3schools.com/howto/howto_js_sidenav.asp
*/
function openNav() {
  // Depending on the max width of the screen, change the percentage of screen the sidebar covers.
  var sizeSmall = window.matchMedia("(max-width: 768px)");
  var sizeMed = window.matchMedia("(max-width: 1300px)");
  if (sizeSmall.matches) { // If media query matches
    document.getElementById("sideBar").style.width = "100%";
  } else if (sizeMed.matches) {
    document.getElementById("sideBar").style.width = "30%";
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
 * Button to pause the home page video
 */
function pauseVideo() {
  video.pause();
}

/**
 * Video to play the home page video and reset the play button
 */
function playVideo() {
  if (video.style.display == "none") {
    // If video was finished reload video container
    video.style.display = "inline";
    videoWrapper.opacity = 1;
  }
  video.play();
}

/**
 * Function to restart the video (by refreshing the page)
 */
function restartVideo() {
  window.location.href = "";
}

// If the video is stopped due to the user or a click on the page, remove the video div
function videoFinished() {
  btmPauseBtn.style.display = "none";
  fade(videoWrapper); // Fade the video element gracefully out of sight
}


/** Fading Elements Function
 * ref: StackOverflow, user "Ubu"
 * src: https://stackoverflow.com/a/6121270
 * 
 * Using setInterval, this function slowly changes the opacity on a passed element until it is 0
 * */
function fade(element) {
  var opacity = 1;  // initial opacity
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
 * This was my solution to getting fullpage JS to scroll horizontally with the mouse wheel, without paying for the premium fullpage library that includes this feature.
*/
function scrollPages(delta) {
  var direction = (delta > 0) ? -1 : 1;  // positive = user wants to go backwards, negative = user wants to scroll forwards
  var pageAnchors = ['home', 'about', 'packages', 'timeline', 'contact']; // Our "Page" anchors which are DIV's within index.html
  var currentPage = 0; // A variable for storing the current page's index within pageAnchors

  // Loop through each anchor element
  pageAnchors.forEach((anchor, index) => {
    if (anchor == fullpage_api.getActiveSlide().anchor) currentPage = index; // Use fullpage's API to get the current active "slide" div
  });

  if (currentPage == 0) videoWrapper.style.display = "none"; // If we are on the homepage, close the video div before leaving this view

  // Get the index of the page anchor we want to move to
  var anchorIndex = currentPage + direction; // direction is set to -1 if the delta is positive, +1 if delta is negative. (line 142)

  if (anchorIndex == 0) {
    window.location.href = ""; // Redirect to 'Home' without applying the anchor tag
  } else if (anchorIndex >= 0 && anchorIndex < pageAnchors.length) {
    window.location.href = "#main/" + pageAnchors[anchorIndex]; // redirect user to the new anchor
  }
}

/**
 * Function to redirect user to the home page
 * without applying an anchor tag to the URL
 */
function redirectHome() {
  window.location.href = "";
}

/**
 * Add support for the splide library
 * */
document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide');
  splide.mount();
});


/**
 * Open a fullscreen dialog to make a picture larger
 * Uses shoelace dialog component
*/
const dialog = document.querySelector('.dialog-width'); // The shoelace dialog component
const dialogImage = document.getElementById('fullscreenPicture'); // the image tag within the dialog
const description = document.getElementById('fullscreenPictureDescription'); // a paragraph used for placing image descriptions
const slideshowImages = document.querySelectorAll(".slideshowImage"); // each of our slideshow images
const header = document.getElementById('head'); // page header

// No overlay if viewport is too small
var size = window.matchMedia("(max-width: 1400px)");
if (!size.matches) { // If page width is not less than 1400px

  // loop through slide show images to add the event listener
  for (var i = 0, len = slideshowImages.length; i < len; i += 1) {
    let imageURL = slideshowImages[i].src; // the src of the current slideshow image
    let imageDescription = slideshowImages[i].getAttribute('alt'); // the description of the current slideshow image
    slideshowImages[i].addEventListener('click', () => { // when an image is clicked
      dialog.show(); // make the dialog appear
      header.style.display = 'none'; // hide the page header as it was blocking the dialog modal close buttons
      dialogImage.src = imageURL; // set the dialog image src to our current image src
      description.innerHTML = imageDescription;  // set the dialog description inner html to our img description
    });
  }
}
// Close button within shoelace dialog modal
const closeButton = dialog.querySelector('sl-button[slot="footer"]');
closeButton.addEventListener('click', () => { // When dialog close button is clicked
  dialog.hide(); // close the dialog
  header.style.display = 'inline'; // Make our header reappear as we hid it when the dialog was opened
});

/**
 * Add Event Listeners to Timeline Images
 * When Images are clicked, the description text updates
 * 
 */
// Descriptions for timeline images
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
const morningTimelinePictures = document.querySelectorAll(".morningImage"); // all morning timeline images
const afternoonTimelinePictures = document.querySelectorAll(".afternoonImage"); // all afternoon timeline images
const morningTimelineDescription = document.getElementById('morningParagraph'); // paragraph for morning timeline descriptions
const afternoonTimelineDescription = document.getElementById('afternoonParagraph'); // paragraph for afternoon timeline descriptions

// Loop through the morning timeline pictures to add event listeners for when an image is clicked
for (var i = 0, len = morningTimelinePictures.length; i < len; i += 1) {
  let desc = mornTimelinePicDescriptions[i]; // grab the image description
  morningTimelinePictures[i].addEventListener('click', () => {
    morningTimelineDescription.innerHTML = desc; // change the morning timeline description
  });
}
// Loop through the afternoon timeline pictures to add event listeners for when an image is clicked
for (var i = 0, len = afternoonTimelinePictures.length; i < len; i += 1) {
  let desc = afternTimelinePicDescriptions[i]; // grab the image description
  afternoonTimelinePictures[i].addEventListener('click', () => {
    afternoonTimelineDescription.innerHTML = desc; // change the afternoon timeline description
  });
}

/**
 * Contact Form
 * */
const form = document.querySelector('#contactForm');
form.addEventListener('submit', event => {
  event.preventDefault(); //  stop form from trying to submit to a blank target
  form.innerHTML = '<p>Thanks for your message!<br><br>We will be in contact shortly.</p>'; // thank the user for their message
});
