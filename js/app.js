/* =========================================================
   FAYAD — MAIN PAGE ENGINE
========================================================= */

"use strict";

/* =========================================================
   DOM
========================================================= */

const body = document.body;

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");

const menuClose = document.getElementById("menuClose");

const siteMenu = document.getElementById("siteMenu");

const menuOverlay = document.getElementById("menuOverlay");

const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const roadmapWrapper = document.querySelector(".roadmap-wrapper");

const roadmapProgress = document.querySelector(".roadmap-progress");

const roadmapSteps = document.querySelectorAll(".roadmap-step");

/* =========================================================
   MENU
========================================================= */

function openMenu() {
  if (!siteMenu || !menuOverlay || !menuToggle) {
    return;
  }

  siteMenu.classList.add("open");

  menuOverlay.classList.add("active");

  menuToggle.classList.add("active");

  menuToggle.setAttribute("aria-expanded", "true");

  siteMenu.setAttribute("aria-hidden", "false");

  menuOverlay.setAttribute("aria-hidden", "false");

  body.classList.add("menu-open");
}

function closeMenu() {
  if (!siteMenu || !menuOverlay || !menuToggle) {
    return;
  }

  siteMenu.classList.remove("open");

  menuOverlay.classList.remove("active");

  menuToggle.classList.remove("active");

  menuToggle.setAttribute("aria-expanded", "false");

  siteMenu.setAttribute("aria-hidden", "true");

  menuOverlay.setAttribute("aria-hidden", "true");

  body.classList.remove("menu-open");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

/* Close menu when clicking menu link */

if (siteMenu) {
  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

/* Escape */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* =========================================================
   NAVBAR SCROLL STATE
========================================================= */

function updateNavbar() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar, {
  passive: true,
});

updateNavbar();

/* =========================================================
   SCROLL REVEAL
========================================================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* =========================================================
   ROADMAP
========================================================= */

function updateRoadmap() {
  if (!roadmapWrapper || !roadmapProgress || roadmapSteps.length === 0) {
    return;
  }

  const rect = roadmapWrapper.getBoundingClientRect();

  const viewportHeight = window.innerHeight;

  const start = viewportHeight * 0.72;

  const totalHeight = roadmapWrapper.offsetHeight;

  const distance = start - rect.top;

  let progress = distance / totalHeight;

  progress = Math.max(0, Math.min(1, progress));

  roadmapProgress.style.height = `${progress * 100}%`;

  roadmapSteps.forEach((step, index) => {
    const stepRect = step.getBoundingClientRect();

    const stepCenter = stepRect.top + stepRect.height / 2;

    if (stepCenter < viewportHeight * 0.72) {
      step.classList.add("completed");
    } else {
      step.classList.remove("completed");
    }

    if (stepCenter > viewportHeight * 0.3 && stepCenter < viewportHeight * 0.72) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

if (!prefersReducedMotion) {
  let roadmapTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!roadmapTicking) {
        window.requestAnimationFrame(() => {
          updateRoadmap();

          roadmapTicking = false;
        });

        roadmapTicking = true;
      }
    },
    {
      passive: true,
    },
  );

  window.addEventListener("resize", updateRoadmap);

  updateRoadmap();
} else {
  if (roadmapProgress) {
    roadmapProgress.style.height = "100%";
  }
}

/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sectionsForNav = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sectionsForNav.length > 0) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.id;

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");

          if (href === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  sectionsForNav.forEach((section) => {
    navObserver.observe(section);
  });
}

/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    closeMenu();
  });
});

/* =========================================================
   FRAMEWORK / TRACK CARD MICRO INTERACTION
========================================================= */

const trackCards = document.querySelectorAll(".track-card");

trackCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    if (prefersReducedMotion) {
      return;
    }

    card.style.setProperty("--card-hover", "1");
  });

  card.addEventListener("mouseleave", () => {
    card.style.removeProperty("--card-hover");
  });
});

/* =========================================================
   FRONTEND STACK ACTIVE STEP
========================================================= */

const stackLayers = document.querySelectorAll(".stack-layer");

if (stackLayers.length > 0 && !prefersReducedMotion) {
  let currentLayer = 0;

  setInterval(() => {
    stackLayers.forEach((layer) => {
      layer.classList.remove("active");
    });

    stackLayers[currentLayer].classList.add("active");

    currentLayer = (currentLayer + 1) % stackLayers.length;
  }, 1800);
}

/* =========================================================
   HERO CODE WINDOW PARALLAX
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

const codeWindow = document.querySelector(".code-window");

if (heroVisual && codeWindow && !prefersReducedMotion) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 5;

    const rotateX = y * -5;

    codeWindow.style.transform = `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-3px)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    codeWindow.style.transform = "rotate(-2deg)";
  });
}

/* =========================================================
   INTERSECTION: ROADMAP INITIAL STATE
========================================================= */

if (roadmapSteps.length > 0) {
  roadmapSteps[0].classList.add("completed");
}

/* =========================================================
   IMAGE FALLBACK
========================================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.display = "none";
  });
});

/* =========================================================
   DEV INFO
========================================================= */

console.log("%cFAYAD Learning Platform", "font-size:16px;font-weight:800;");

console.log("Learn · Build · Become");
