let isPlaying = false;
 
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;
  audio.currentTime = 0;
  console.log(e.keyCode);
  console.log(isPlaying);

  if (e.keyCode == 32) {
    audio.volume = 0.3;
    if (isPlaying) {
      audio.pause();
      key.innerHTML = "<span>Play</span> <div class='play'></div>";
    } else {
      audio.play();
      key.innerHTML = "<span>Pause</span> <div class='pause'><span></span><span></span></div>";
    }
    isPlaying = !isPlaying;
  } else {
    audio.play();
  }
  key.classList.add('playing');

  audio.onplaying = function() {
    isPlaying = true;
    key.classList.add('pushed');
  };
  audio.onpause = function() {
    isPlaying = false;
    key.classList.remove('pushed');
  };
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
