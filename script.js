const optionLabels = {
  A: "A 市區穩健版",
  B: "B 七股海線版",
  C: "C 高鐵周邊版",
};

const note = document.querySelector("#selectedNote");
const cards = [...document.querySelectorAll(".option-card")];
const routeCards = [...document.querySelectorAll(".route-card[data-route]")];
const filterButtons = [...document.querySelectorAll(".filter-button[data-filter]")];
const scheduleSection = document.querySelector("#schedule");
const navLinks = [...document.querySelectorAll(".topbar a[href^='#']")];
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setRouteFilter(filter, shouldScroll = false) {
  const isAll = filter === "all";

  cards.forEach((card) => {
    const isSelected = !isAll && card.dataset.option === filter;
    card.classList.toggle("is-selected", isSelected);
    card.querySelector(".select-button")?.setAttribute("aria-pressed", String(isSelected));
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  routeCards.forEach((routeCard) => {
    routeCard.hidden = !isAll && routeCard.dataset.route !== filter;
  });

  if (note) {
    note.textContent = isAll
      ? "目前顯示：全部時程草案。可以先看 A/C 主案，B 當海線備案。"
      : `目前顯示：${optionLabels[filter]} 時程。`;
  }

  if (shouldScroll && scheduleSection) {
    scheduleSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
}

cards.forEach((card) => {
  const button = card.querySelector(".select-button");
  button?.addEventListener("click", () => {
    setRouteFilter(card.dataset.option, true);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setRouteFilter(button.dataset.filter);
  });
});

function setActiveNav() {
  const current = navTargets
    .map((target) => ({
      id: target.id,
      top: Math.abs(target.getBoundingClientRect().top - 92),
      isPastTop: target.getBoundingClientRect().top <= 120,
    }))
    .filter((target) => target.isPastTop)
    .sort((a, b) => a.top - b.top)[0];

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", Boolean(current && link.getAttribute("href") === `#${current.id}`));
  });
}

setActiveNav();
window.addEventListener("scroll", setActiveNav, { passive: true });
