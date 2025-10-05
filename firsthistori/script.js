document.addEventListener('DOMContentLoaded', () => {
  function smoothScrollToBottom(duration) {
    const start = window.pageYOffset;
    const end = document.body.scrollHeight - window.innerHeight;
    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  smoothScrollToBottom(2000); // Scroll over 2 seconds

  setTimeout(() => {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.classList.add('visible');
  }, 7500); // 4s delay + 3.5s animation

  setTimeout(() => {
    const superiorImage = document.querySelector('.superior');
    superiorImage.classList.add('grow-animation');
  }, 2000); // Start animation after 2s scroll finishes

  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const resultOne = document.getElementById('result-one');
  const resultTwo = document.getElementById('result-two');

  btnYes.addEventListener('click', () => {
    resultOne.style.display = 'block';
    resultTwo.style.display = 'none';
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';
  });

  btnNo.addEventListener('click', () => {
    resultOne.style.display = 'none';
    resultTwo.style.display = 'block';
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';
  });
});
