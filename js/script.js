window.onload = function () {
  if (!window.location.hash) {
    window.location.hash = "home";
  }
};

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const navbarHeight = document.querySelector("nav").offsetHeight;

    window.scrollTo({
      top: target.offsetTop - navbarHeight,
      behavior: "smooth"
    });

    navLinks.classList.remove("active");

  });

});

const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateSlider() {

  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

}

nextBtn.addEventListener("click", () => {

  index++;

  if (index >= slides.length) {
    index = 0;
  }

  updateSlider();

});

prevBtn.addEventListener("click", () => {

  index--;

  if (index < 0) {
    index = slides.length - 1;
  }

  updateSlider();

});

dots.forEach((dot, i) => {

  dot.addEventListener("click", () => {

    index = i;
    updateSlider();

  });

});

setInterval(() => {

  index++;

  if (index >= slides.length) {
    index = 0;
  }

  updateSlider();

}, 4000);

let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {

  let touchEndX = e.changedTouches[0].clientX;

  if (touchStartX - touchEndX > 50) {
    nextBtn.click();
  }

  if (touchEndX - touchStartX > 50) {
    prevBtn.click();
  }

});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navItems.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }

  });

});

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(8,19,31,0.98)";
    nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.background = "rgba(8,19,31,0.9)";
    nav.style.boxShadow = "none";
  }
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";

  const updateCounter = () => {

    const current = +counter.innerText.replace(suffix, "");

    const increment = target / 150;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment) + suffix;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target + suffix;
    }

  };

  updateCounter();

});

let currentPDF = "";
let currentResource = "";

function openPopup(pdf, img, resourceName) {
  document.getElementById("resourcePopup").style.display = "flex";
  document.getElementById("popupImg").src = img;

  currentPDF = pdf;
  currentResource = resourceName;
}

function closePopup() {
  document.getElementById("resourcePopup").style.display = "none";
}

document.getElementById("resourceForm").addEventListener("submit", function (e) {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all details before downloading.");
    return;
  }

  const yourWhatsApp = "917020313732";

  const message =
    `New Resource Download Lead

Name: ${name}
Email: ${email}
Phone: ${phone}

Downloaded Resource: ${currentResource}`;

  const whatsappURL =
    `https://wa.me/${yourWhatsApp}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

  const link = document.createElement("a");
  link.href = currentPDF;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  document.getElementById("resourceForm").reset();

  closePopup();

});

const form = document.getElementById("resourceForm");
const inputs = form.querySelectorAll("input");
const downloadBtn = document.getElementById("downloadBtn");

inputs.forEach(input => {
  input.addEventListener("input", checkFields);
});

function checkFields() {
  let allFilled = true;

  inputs.forEach(input => {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });

  downloadBtn.disabled = !allFilled;
}

document.addEventListener("DOMContentLoaded", function () {

const testimonialTrack = document.querySelector(".testimonial-track");
let testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialNext = document.querySelector(".next");
const testimonialPrev = document.querySelector(".prev");

let testimonialSlideIndex = 0;

function getCardsPerSlide(){
  return window.innerWidth <= 768 ? 1 : 4;
}

/* Clone cards for infinite loop */

function cloneCards(){

  const cardsPerSlide = getCardsPerSlide();

  for(let i=0;i<cardsPerSlide;i++){
    const clone = testimonialCards[i].cloneNode(true);
    testimonialTrack.appendChild(clone);
  }

}

cloneCards();

/* Update slider */

function updateTestimonialSlider(){

  const cardsPerSlide = getCardsPerSlide();
  const cardWidth = document.querySelector(".testimonial-card").offsetWidth + 25;

  testimonialTrack.style.transform =
  `translateX(-${testimonialSlideIndex * cardWidth * cardsPerSlide}px)`;

}

/* Next */

testimonialNext.addEventListener("click",()=>{

  const cardsPerSlide = getCardsPerSlide();
  testimonialSlideIndex++;

  updateTestimonialSlider();

});

/* Prev */

testimonialPrev.addEventListener("click",()=>{

  const cardsPerSlide = getCardsPerSlide();

  if(testimonialSlideIndex === 0){
    testimonialSlideIndex = Math.ceil(testimonialCards.length / cardsPerSlide);
  }

  testimonialSlideIndex--;

  updateTestimonialSlider();

});

/* Infinite loop reset */

testimonialTrack.addEventListener("transitionend",()=>{

  const cardsPerSlide = getCardsPerSlide();
  const totalSlides = Math.ceil(testimonialCards.length / cardsPerSlide);

  if(testimonialSlideIndex >= totalSlides){

    testimonialTrack.style.transition="none";
    testimonialSlideIndex = 0;

    updateTestimonialSlider();

    setTimeout(()=>{
      testimonialTrack.style.transition="transform 0.6s ease";
    },50);

  }

});

/* Auto slide */

setInterval(()=>{

  testimonialSlideIndex++;
  updateTestimonialSlider();

},4000);

window.addEventListener("resize",updateTestimonialSlider);

updateTestimonialSlider();

});

const images = document.querySelectorAll(".footer-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    next.click();
  }

  if (endX - startX > 50) {
    prev.click();
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("contactFirstName").value.trim();
    const lastName = document.getElementById("contactLastName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();

    console.log(firstName, lastName, email, phone, subject);

    if (!firstName || !lastName || !email || !phone || !subject) {
      alert("Please fill all fields.");
      return;
    }

    const whatsappNumber = "917020313732";

    const message =
      `Hello, I am ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

  });

});