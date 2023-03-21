var splash = document.querySelector('.splash');
//var hideMe = document.querySelector('.hidden');
splash.addEventListener('click', dismissSplash);
function dismissSplash() {
  splash.style.opacity = 0;
  setTimeout(() => {
    splash.classList.add('hidden')
  }, 500)
}
splash.addEventListener('click', dismissSplash)
