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

const imagePreviewSwiperConfig = {
  autoHeight: true,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
  },
};
const swiper = new Swiper("#image-preview", {
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

new Swiper("#resorts", {
  autoHeight: true,
  allowTouchMove:true,
  pagination: {
    el: ".swiper-pagination",
  },
});

new Swiper("#touristSpots", {
  autoHeight: true,
  allowTouchMove:true,
  pagination: {
    el: ".swiper-pagination",
  },
});

new Swiper(".image-preview-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
  },
});