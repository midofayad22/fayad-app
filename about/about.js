/* =========================================================
   FAYAD — ABOUT PAGE JAVASCRIPT
========================================================= */

/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================================================
   SKILL BARS
========================================================= */

const skillProgress = document.querySelectorAll(".skill-progress");

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;

          entry.target.style.width = `${width}%`;

          skillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  skillProgress.forEach((skill) => {
    skillObserver.observe(skill);
  });
} else {
  skillProgress.forEach((skill) => {
    const width = skill.dataset.width;

    skill.style.width = `${width}%`;
  });
}

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .about-text, .stat-card, " + ".timeline-item, .project-card, .skill, .cta",
);

revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.style.opacity = "1";

    element.style.transform = "translateY(0)";
  });
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - 180;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    const target = link.getAttribute("href");

    if (target === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });

updateActiveNavigation();

/* =========================================================
   CARD TILT EFFECT
========================================================= */

const developerCard = document.querySelector(".developer-card");

if (developerCard && window.innerWidth > 850 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  developerCard.addEventListener("mousemove", (event) => {
    const rect = developerCard.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;

    const rotateY = ((x - centerX) / centerX) * 4;

    developerCard.style.transform = `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;
  });

  developerCard.addEventListener("mouseleave", () => {
    developerCard.style.transform = "perspective(1000px) rotateY(-4deg)";
  });
}

/* =========================================================
   CLOSE MOBILE MENU WHEN RESIZING
========================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 850 && navLinks && menuBtn) {
    navLinks.classList.remove("open");

    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log("%cFAYAD — عن عبد الحميد فياض", "color:#20d6a0;font-size:18px;font-weight:bold;");

console.log("أبني. أتعلم. أبتكر.");
