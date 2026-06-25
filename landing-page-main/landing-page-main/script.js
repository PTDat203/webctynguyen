const root = document.documentElement;
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const canvas = document.querySelector("#blueprint-canvas");
const ctx = canvas.getContext("2d");
const loader = document.querySelector(".page-loader");
const scrollVisuals = [
  ...document.querySelectorAll(
    ".hero-image, .river-card, .showcase-card, .stack-card, .gallery-wall img, .contact-image, .full-bleed-media > img",
  ),
];
const story = document.querySelector(".scroll-story");
const storyFrames = [...document.querySelectorAll(".story-frame")];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let dotX = mouseX;
let dotY = mouseY;
let canvasNodes = [];
let scrollTicking = false;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function initLoader() {
  const images = [...document.images];
  const total = Math.max(images.length, 1);
  let loaded = 0;

  const markLoaded = () => {
    loaded += 1;
    root.style.setProperty("--loader-progress", (0.12 + (loaded / total) * 0.88).toFixed(3));
  };

  const imageReady = Promise.all(
    images.map((image) => {
      if (image.complete) {
        markLoaded();
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const done = () => {
          markLoaded();
          resolve();
        };
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
      });
    }),
  );

  const minimumDelay = new Promise((resolve) => window.setTimeout(resolve, 1100));

  Promise.all([imageReady, minimumDelay]).then(() => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
    updateScrollDrivenMotion();
    window.setTimeout(() => loader?.remove(), 780);
  });
}

function setRootMouseVars(x, y) {
  root.style.setProperty("--mouse-x", `${x}px`);
  root.style.setProperty("--mouse-y", `${y}px`);
}

function updateCursor() {
  dotX += (mouseX - dotX) * 0.42;
  dotY += (mouseY - dotY) * 0.42;
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;

  cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(updateCursor);
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(28, Math.floor((window.innerWidth * window.innerHeight) / 42000));
  canvasNodes = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    r: 1 + Math.random() * 2.2,
  }));
}

function drawBlueprint() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const node of canvasNodes) {
    node.x += node.vx + (mouseX - window.innerWidth / 2) * 0.00015;
    node.y += node.vy + (mouseY - window.innerHeight / 2) * 0.00015;

    if (node.x < -20) node.x = window.innerWidth + 20;
    if (node.x > window.innerWidth + 20) node.x = -20;
    if (node.y < -20) node.y = window.innerHeight + 20;
    if (node.y > window.innerHeight + 20) node.y = -20;
  }

  for (let i = 0; i < canvasNodes.length; i += 1) {
    for (let j = i + 1; j < canvasNodes.length; j += 1) {
      const a = canvasNodes[i];
      const b = canvasNodes[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 170) {
        ctx.strokeStyle = `rgba(17, 88, 199, ${0.13 - distance / 1700})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const node of canvasNodes) {
    const mouseDistance = Math.hypot(node.x - mouseX, node.y - mouseY);
    const lift = Math.max(0, 1 - mouseDistance / 220);
    ctx.fillStyle = lift > 0 ? `rgba(40, 212, 255, ${0.32 + lift * 0.45})` : "rgba(17, 88, 199, 0.22)";
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r + lift * 2.6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawBlueprint);
}

function handleMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  setRootMouseVars(mouseX, mouseY);

  document.querySelectorAll(".section-spotlight").forEach((section) => {
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--local-x", `${mouseX - rect.left}px`);
    section.style.setProperty("--local-y", `${mouseY - rect.top}px`);
  });
}

function wireTiltCards() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    if (card.tagName === "IMG") return;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      const rotateY = ((x / rect.width) - 0.5) * 7;

      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-y", `${y}px`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function updatePageProgress() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  root.style.setProperty("--page-progress", clamp(window.scrollY / maxScroll).toFixed(4));
}

function updateImageScrollMotion() {
  scrollVisuals.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    const centered = progress - 0.5;
    const baseSpeed = index % 3 === 0 ? 84 : index % 3 === 1 ? -62 : 48;
    const y = centered * baseSpeed;
    const scale = 1.015 + progress * 0.055;

    element.style.setProperty("--scroll-y", `${y.toFixed(1)}px`);
    element.style.setProperty("--scroll-scale", scale.toFixed(3));
  });
}

function setStoryFrame(frame, x, y, rotate, scale, opacity) {
  if (!frame) return;
  frame.style.setProperty("--story-x", `${x.toFixed(1)}px`);
  frame.style.setProperty("--story-y", `${y.toFixed(1)}px`);
  frame.style.setProperty("--story-r", `${rotate.toFixed(2)}deg`);
  frame.style.setProperty("--story-s", scale.toFixed(3));
  frame.style.setProperty("--story-o", opacity.toFixed(3));
}

function updateStoryMotion() {
  if (!story) return;

  const rect = story.getBoundingClientRect();
  const distance = Math.max(1, rect.height - window.innerHeight);
  const progress = clamp(-rect.top / distance);
  const eased = progress * progress * (3 - 2 * progress);

  story.style.setProperty("--story-progress", eased.toFixed(4));
  setStoryFrame(storyFrames[0], (eased - 0.5) * -90, (eased - 0.5) * -70, (eased - 0.5) * -2, 1.08 - eased * 0.08, 1);
  setStoryFrame(storyFrames[1], (0.2 - eased) * 160, (eased - 0.5) * 70, -6 + eased * 10, 0.9 + eased * 0.15, clamp(eased * 3));
  setStoryFrame(storyFrames[2], (eased - 0.55) * -120, (0.5 - eased) * 92, 5 - eased * 8, 0.92 + eased * 0.12, clamp((eased - 0.14) * 2.8));
  setStoryFrame(storyFrames[3], (0.5 - eased) * 180, (eased - 0.5) * -72, -3 + eased * 7, 0.82 + eased * 0.22, clamp((eased - 0.34) * 2.6));
}

function updateScrollDrivenMotion() {
  updatePageProgress();
  updateImageScrollMotion();
  updateStoryMotion();
}

function requestScrollUpdate() {
  if (scrollTicking) return;

  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollDrivenMotion();
    scrollTicking = false;
  });
}

function wireMagneticTargets() {
  document.querySelectorAll(".magnetic").forEach((target) => {
    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      target.style.transform = `translate(${x * 0.18}px, ${y * 0.24}px)`;
    });

    target.addEventListener("mouseleave", () => {
      target.style.transform = "";
    });
  });
}

function wireRipples() {
  document.querySelectorAll(".ripple-target").forEach((target) => {
    target.addEventListener("click", (event) => {
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    });
  });
}

function wireHoverState() {
  document.querySelectorAll("a, button, [data-tilt], .ripple-target").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("is-hovering"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("is-hovering"));
  });
}

function animateCounter(counter) {
  const target = Number(counter.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased).toLocaleString("vi-VN");

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function wireReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        if (entry.target.classList.contains("stat-card")) {
          const counter = entry.target.querySelector("[data-count]");
          if (counter && !counter.dataset.done) {
            counter.dataset.done = "true";
            animateCounter(counter);
          }
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  document.querySelectorAll("[data-reveal], .timeline").forEach((element) => observer.observe(element));
}

function wireActiveNav() {
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setActiveLink() {
    const active = sections.reduce((current, section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.42) return section;
      return current;
    }, sections[0]);

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${active.id}`);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

window.addEventListener("mousemove", handleMouseMove, { passive: true });
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  resizeCanvas();
  requestScrollUpdate();
});

setRootMouseVars(mouseX, mouseY);
initLoader();
resizeCanvas();
drawBlueprint();
updateCursor();
updateScrollDrivenMotion();
wireTiltCards();
wireMagneticTargets();
wireRipples();
wireHoverState();
wireReveal();
wireActiveNav();
