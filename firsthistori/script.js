document.addEventListener('DOMContentLoaded', () => {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const resultOne = document.getElementById('result-one');
  const resultTwo = document.getElementById('result-two');

  btnYes.addEventListener('click', () => {
    resultOne.style.display = 'block';
    resultTwo.style.display = 'none';
  });

  btnNo.addEventListener('click', () => {
    resultOne.style.display = 'none';
    resultTwo.style.display = 'block';
  });
});
