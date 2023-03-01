
let currentSlide = 0;
let slides = document.querySelectorAll('.slider-icon');

slides.forEach(slide => {
  slide.addEventListener('click', function(e) {
    if (e.target.classList.contains('slide-prev')) {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = bgrArr.length - 1;
      }
    } else if (e.target.classList.contains('slide-next')) {
      currentSlide++;
      if (currentSlide > bgrArr.length - 1) {
        currentSlide = 0;
      }
    }
    document.body.style.backgroundImage = `url(${bgrArr[currentSlide]})`;
    document.body.style.transition = 'background-image 0.5s ease-in-out';
  });
});
