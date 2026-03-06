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

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(update, 10);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name === "" || email === "" || message === "") {
    alert("Please fill all fields");
  } else {
    alert("Message sent successfully!");
  }
});

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;

function slideTestimonials(){

  const cardWidth = testimonialCards[0].offsetWidth + 25;

  testimonialIndex++;

  if(testimonialIndex >= testimonialCards.length - 3){
    testimonialIndex = 0;
  }

  testimonialTrack.style.transform =
  `translateX(-${testimonialIndex * cardWidth}px)`;

}

setInterval(slideTestimonials,3000);

const images = document.querySelectorAll(".footer-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;

images.forEach((img,index)=>{
  img.addEventListener("click",()=>{
    currentIndex = index;
    showImage();
    lightbox.style.display="flex";
  });
});

function showImage(){
  lightboxImg.src = images[currentIndex].src;
}

next.addEventListener("click",()=>{
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prev.addEventListener("click",()=>{
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener("click",()=>{
  lightbox.style.display="none";
});

let startX = 0;

lightbox.addEventListener("touchstart",(e)=>{
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend",(e)=>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    next.click();
  }

  if(endX - startX > 50){
    prev.click();
  }
});