new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  freeMode: true,
  autoHeight: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


new Swiper("#image-preview", {
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
  },
});