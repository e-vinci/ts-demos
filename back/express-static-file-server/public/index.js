const body = document.querySelector("body");

body.addEventListener("click", startOrStopSound);

function startOrStopSound() {
  const myAudioPlayer = document.querySelector("#audioPlayer");

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
}
