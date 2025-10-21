// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Scroll to top
document.querySelector(".to-top").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
