
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
// let currentSlide = 0;
// let slides = document.querySelectorAll('.slider-icon');
// let slider = document.querySelector('.slider');

// slides.forEach(slide => {
// slide.addEventListener('click', function(e) {
// if (e.target.classList.contains('slide-prev')) {
// currentSlide--;
// if (currentSlide < 0) {
// currentSlide = bgrArr.length - 1;
// }
// } else if (e.target.classList.contains('slide-next')) {
// currentSlide++;
// if (currentSlide > bgrArr.length - 1) {
// currentSlide = 0;
// }
// }
// let nextImage = url(${bgrArr[currentSlide]});
// slider.style.opacity = 0;
// setTimeout(() => {
// document.body.style.backgroundImage = nextImage;
// slider.style.opacity = 1;
// }, 500); // время задержки в миллисекундах, равное продолжительности анимации
// });
// });