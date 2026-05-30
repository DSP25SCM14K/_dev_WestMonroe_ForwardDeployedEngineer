const phrases = [
  "operational intelligence platforms",
  "full-stack client workflows",
  "Neo4j graph and RAG retrieval",
  "REST, GraphQL, and webhook integrations",
  "event-driven data pipelines",
  "cloud deployments with reusable patterns"
];

const typedText = document.querySelector("#typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;
  const current = phrases[phraseIndex];
  typedText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    window.setTimeout(typeLoop, 54);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    window.setTimeout(typeLoop, 1250);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeLoop, 24);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  window.setTimeout(typeLoop, 260);
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      counter.textContent = Number.isInteger(target) ? Math.round(value) : formatter.format(value);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

function setupReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => observer.observe(el));
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach(item => item.classList.toggle("active", item === button));

      projects.forEach(project => {
        const tags = project.dataset.tags.split(" ");
        const visible = filter === "all" || tags.includes(filter);
        project.style.display = visible ? "flex" : "none";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeLoop();
  animateCounters();
  setupReveal();
  setupFilters();
});
