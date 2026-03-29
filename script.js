const page = document.body.dataset.page;
const nav = document.querySelector(".nav-links");
const toggle = document.querySelector(".nav-toggle");

if (page) {
  const activeLink = document.querySelector(`[data-nav="${page}"]`);
  if (activeLink) activeLink.classList.add("active");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.delay || "0";
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  reveals.forEach((item) => revealObserver.observe(item));

  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
}

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;
    button.textContent = "Inquiry Received";
    button.disabled = true;
  });
}
