const tagArrays = [document.querySelectorAll('button'), document.querySelectorAll('a')];

// HTML IDs
const uiVolumeButton = document.getElementById('uiVolumeButton');
const uiVolumeIcon = document.getElementById('uiVolumeIcon');
const uiVolumeSlider = document.getElementById('uiVolumeSlider');
const captureVolumeIcon = document.getElementById('captureVolumeIcon');
const captureVolumeButton = document.getElementById('captureVolumeButton');
const captureVolumeSlider = document.getElementById('captureVolumeSlider');

// AUDIO
const clickTone = document.getElementById('clickTone');
const captureTone = document.getElementById("captureTone");
const captureSuccessTone = document.getElementById("captureSuccessTone");
const captureFailTone = document.getElementById("captureFailTone");

let uiIsMuted = false;
let captureIsMuted = false;

// VOLUME ICONS
const volumeHighIcon = 'fa-solid fa-volume-high';
const volumeLowIcon = 'fa-solid fa-volume-low';
const volumeOffIcon = 'fa-solid fa-volume-off';
const volumeMutedIcon = 'fa-solid fa-volume-xmark';

// TODO: Condense functions

/**
 * Plays click_tone when selecting a button or anchor tag,
 * provided UI audio is not muted
 */

function playClickTone() {
  tagArrays.forEach(tags => {
    tags.forEach(tag => {
      tag.addEventListener("mousedown", function (event) {
        if (!uiIsMuted) {
          console.log('Playing Click Tone');
          clickTone.currentTime = 0;
          clickTone.play();
        }
      });
    });
  });
}

/**
 * Mutes UI audio and updates UI volume icon when UI volume icon is clicked,
 * disables slider,
 * then saves icon and slider state
 */

function muteUI() {
  uiVolumeButton.addEventListener("mousedown", function () {
    if (uiIsMuted) {
      uiIsMuted = false;
      uiVolumeSlider.disabled = false;
      clickTone.muted = false;
      uiVolumeIcon.classList.value = volumeHighIcon;
  } else {
      uiIsMuted = true;
      uiVolumeSlider.disabled = true;
      clickTone.muted = true;
      uiVolumeIcon.classList.value = volumeMutedIcon;
  }
    console.log("UI SFX Muted: ", uiIsMuted);
    localStorage.setItem("uiMuteState", uiIsMuted);
    localStorage.setItem("uiSliderDisabled", uiVolumeSlider.disabled);
    localStorage.setItem("uiVolumeIconState", uiVolumeIcon.classList.value);
  });
}

/**
 * Updates UI audio when UI volume slider is adjusted,
 * then saves slider and icon value
 */

function updateUiIcon(){
  uiVolumeSlider.addEventListener("input", function () {
    if (uiVolumeSlider.value >= 0.5) {
    uiVolumeIcon.classList.value = volumeHighIcon;
  } else if (uiVolumeSlider.value > 0.1) {
    uiVolumeIcon.classList.value = volumeLowIcon;
  } else if (uiVolumeSlider.value <= 0) {
    uiVolumeIcon.classList.value = volumeOffIcon;
  }
    console.log("UI Volume: ", uiVolumeSlider.value);
    clickTone.volume = uiVolumeSlider.value;
    localStorage.setItem("uiSliderState", uiVolumeSlider.value);
    localStorage.setItem("uiVolumeIconState", uiVolumeIcon.classList.value);
  });
}

/**
 * Mutes capture audio and updates capture volume icon when capture volume icon is clicked,
 * disables slider,
 * then saves icon and slider state
 */

function muteCapture() {
  captureVolumeButton.addEventListener("mousedown", function () {
    if (captureIsMuted) {
      captureIsMuted = false;
      captureVolumeSlider.disabled = false;
      captureTone.muted = false;
      captureSuccessTone.muted = false;
      captureFailTone.muted = false;
      captureVolumeIcon.classList.value = volumeHighIcon;
    } else {
      captureIsMuted = true;
      captureVolumeSlider.disabled = true;
      captureTone.muted = true;
      captureSuccessTone.muted = true;
      captureFailTone.muted = true;
      captureVolumeIcon.classList.value = volumeMutedIcon;
    }
    console.log("Capture SFX Muted: ", captureIsMuted);
    localStorage.setItem("captureMuteState", captureIsMuted);
    localStorage.setItem("captureSliderDisabled", captureVolumeSlider.disabled);
    localStorage.setItem("captureVolumeIconState", captureVolumeIcon.classList.value);
  });
}

/**
 * Updates capture audio when capture volume slider is adjusted,
 * then saves slider value and icon
 */

function updateCaptureIcons(){
  captureVolumeSlider.addEventListener("input", function () {
    if (captureVolumeSlider.value >= 0.5) {
      captureVolumeIcon.classList.value = volumeHighIcon;
    } else if (captureVolumeSlider.value > 0.1) {
      captureVolumeIcon.classList.value = volumeLowIcon;
    } else if (captureVolumeSlider.value <= 0) {
      captureVolumeIcon.classList.value = volumeOffIcon;
    }
    captureTone.volume = captureVolumeSlider.value;
    captureSuccessTone.volume = captureVolumeSlider.value;
    captureFailTone.volume = captureVolumeSlider.value;
    console.log("Capture Volume: ", captureVolumeSlider.value);
    localStorage.setItem("captureSliderState", captureVolumeSlider.value);
    localStorage.setItem("captureVolumeIconState", captureVolumeIcon.classList.value);
  });
}

/**
 * Loads saved states of UI and capture audio
 */

function loadVolumeState(){
  uiIsMuted = JSON.parse(localStorage.getItem("uiMuteState"));
  uiVolumeSlider.value = localStorage.getItem("uiSliderState");
  uiVolumeSlider.disabled = JSON.parse(localStorage.getItem("uiSliderDisabled"));
  uiVolumeIcon.classList.value = localStorage.getItem("uiVolumeIconState");
  captureIsMuted = JSON.parse(localStorage.getItem("captureMuteState"));
  captureVolumeSlider.value = localStorage.getItem("captureSliderState");
  captureVolumeSlider.disabled = JSON.parse(localStorage.getItem("captureSliderDisabled"));
  captureVolumeIcon.classList.value = localStorage.getItem("captureVolumeIconState");
}

loadVolumeState();
playClickTone();
muteUI();
updateUiIcon();
muteCapture();
updateCaptureIcons();