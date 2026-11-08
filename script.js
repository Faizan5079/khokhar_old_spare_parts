const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");

function closeNavigation() {
  if (!menuButton || !navLinks) return;

  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("open") &&
      event.target instanceof Node &&
      !navLinks.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeNavigation();
    }
  });

  const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section instanceof HTMLElement);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visibleSections.length) return;

      const activeId = `#${visibleSections[0].target.id}`;
      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === activeId) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach((section) => sectionObserver.observe(section));
  }
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
