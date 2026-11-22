/* =========================================================
   script.js — editable content and accessible interactions.
   ========================================================= */

/* ---------- 1. EDITABLE CONTENT ---------- */
const siteConfig = {
  email: "your.email@example.com", // REPLACE
  socialLinks: [
    { label: "GitHub", url: "https://github.com/your-username" }, // REPLACE
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-profile" }, // REPLACE
    { label: "Google Scholar", url: "https://scholar.google.com/" }, // REPLACE
    { label: "LessWrong / Alignment Forum", url: "https://www.lesswrong.com/" } // REPLACE or remove
  ]
};

const highlights = [
  { label: "Current role", value: "LLM / Agentic AI Evaluator, Scale AI" },
  { label: "Education", value: "PhD, Materials Science & Engineering — [University]" },
  { label: "AI Safety training", value: "BlueDot Impact — Technical AI Safety" },
  { label: "Research sprint", value: "Apart Research — AI Collusion" },
  { label: "Tools", value: "Python, PyTorch, scikit-learn, pandas" }
];

const researchAreas = [
  { icon: "🧪", title: "LLM & Agent Evaluation", text: "Designing rigorous evals for reasoning, tool use, and long-horizon agent behavior." },
  { icon: "🤝", title: "Multi-agent Collusion", text: "Detecting when AI agents coordinate in unintended ways, and how to monitor for it." },
  { icon: "🛡️", title: "AI Safety & Alignment", text: "Scalable oversight, dangerous-capability evaluations, and robustness." },
  { icon: "⚛️", title: "ML for Science", text: "Applying machine learning and data science to materials discovery and characterization." }
];

const projects = [
  {
    title: "AI Collusion Research Sprint",
    description: "Apart Research sprint project investigating collusion between language-model agents. [Placeholder: summarize your method and findings.]",
    image: "assets/project-ai-collusion-sprint.jpg",
    imageAlt: "Abstract illustration for the AI collusion project",
    tags: ["AI Safety"],
    link: "https://github.com/your-username/ai-collusion", // REPLACE
    linkLabel: "View project"
  },
  {
    title: "Evaluating Agentic AI Systems",
    description: "Notes and public write-ups on evaluation methodology for LLM agents. [Placeholder: keep confidential work out.]",
    image: "assets/project-llm-evaluation.jpg",
    imageAlt: "Abstract illustration for LLM evaluation",
    tags: ["Evaluation", "AI Safety"],
    link: "#blog",
    linkLabel: "Read on the blog"
  },
  {
    title: "Machine Learning for Materials Properties",
    description: "PhD research using Python ML models to predict material behavior. [Placeholder: add paper title and venue.]",
    image: "assets/project-materials-ml.jpg",
    imageAlt: "Abstract illustration for materials science machine learning",
    tags: ["Publication", "ML for Science"],
    link: "https://doi.org/", // REPLACE with DOI
    linkLabel: "Read paper"
  }
];

const blogPosts = [
  { title: "From Materials Science to AI Safety", date: "2026-11-01", summary: "Why I'm making the switch and what transferred from my PhD. [Placeholder]", link: "#" },
  { title: "What I Learned Studying AI Collusion", date: "2026-10-15", summary: "Takeaways from the Apart Research sprint. [Placeholder]", link: "#" },
  { title: "Notes on Evaluating LLM Agents", date: "2026-09-20", summary: "Practical lessons on building reliable evals. [Placeholder]", link: "#" }
];

/* ---------- 2. Helpers ---------- */
function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/* ---------- 3. Progressive reveal setup ---------- */
document.body.classList.add("js-enabled");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let revealObserver = null;
if ("IntersectionObserver" in window && !reduceMotion) {
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
}
function addReveal(element, index = 0) {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 80}ms`);
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
}
document.querySelectorAll("main > .section, .hero").forEach((section) => addReveal(section));

/* ---------- 4. Mobile navigation ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

/* ---------- 5. Active section navigation ---------- */
const sectionLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
function setActiveSection(id) {
  sectionLinks.forEach((link) => {
    if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActiveSection(visible[0].target.id);
  }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
if (location.hash) setActiveSection(location.hash.slice(1));

/* ---------- 6. About highlights ---------- */
const highlightList = document.getElementById("highlight-list");
if (highlightList) highlights.forEach((item) => {
  const li = createElement("li");
  li.append(createElement("span", "highlight-label", item.label), document.createTextNode(item.value));
  highlightList.append(li);
});

/* ---------- 7. Research cards ---------- */
const researchGrid = document.getElementById("research-grid");
if (researchGrid) researchAreas.forEach((area, index) => {
  const card = createElement("article", "research-card");
  const icon = createElement("span", "research-icon", area.icon);
  icon.setAttribute("aria-hidden", "true");
  card.append(icon, createElement("h3", "", area.title), createElement("p", "", area.text));
  researchGrid.append(card);
  addReveal(card, index);
});

/* ---------- 8. Projects + filters ---------- */
const projectGrid = document.getElementById("project-grid");
const filterBar = document.getElementById("filter-bar");
function renderProjects(filter) {
  if (!projectGrid) return;
  projectGrid.innerHTML = "";
  projects.filter((project) => filter === "All" || project.tags.includes(filter)).forEach((project, index) => {
    const card = createElement("article", "project-card");
    const img = document.createElement("img");
    img.src = project.image; img.alt = project.imageAlt; img.loading = "lazy";
    const body = createElement("div", "project-body");
    const tags = createElement("ul", "tag-list");
    project.tags.forEach((tag) => tags.append(createElement("li", "tag", tag)));
    const link = createElement("a", "project-link", project.linkLabel);
    link.href = project.link;
    if (project.link.startsWith("http")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    body.append(createElement("h3", "", project.title), tags, createElement("p", "", project.description), link);
    card.append(img, body);
    projectGrid.append(card);
    addReveal(card, index);
  });
}
if (filterBar) {
  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))];
  allTags.forEach((tag) => {
    const button = createElement("button", "filter-button", tag);
    button.type = "button";
    button.setAttribute("aria-pressed", tag === "All" ? "true" : "false");
    button.addEventListener("click", () => {
      filterBar.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderProjects(tag);
    });
    filterBar.append(button);
  });
}
renderProjects("All");

/* ---------- 9. Blog preview cards ---------- */
const blogList = document.getElementById("blog-list");
if (blogList) blogPosts.forEach((post, index) => {
  const article = createElement("article", "blog-post");
  const heading = createElement("h3");
  const link = createElement("a", "", post.title);
  link.href = post.link;
  heading.append(link);
  const date = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  article.append(heading, createElement("p", "blog-meta", date), createElement("p", "", post.summary));
  blogList.append(article);
  addReveal(article, index);
});

/* ---------- 10. Social links ---------- */
const socialList = document.getElementById("social-list");
if (socialList) {
  const emailItem = createElement("li");
  const emailLink = createElement("a", "", `✉ ${siteConfig.email}`);
  emailLink.href = `mailto:${siteConfig.email}`;
  emailItem.append(emailLink);
  socialList.append(emailItem);
  siteConfig.socialLinks.forEach((social) => {
    const item = createElement("li");
    const link = createElement("a", "", social.label);
    link.href = social.url; link.target = "_blank"; link.rel = "noopener noreferrer";
    item.append(link);
    socialList.append(item);
  });
}

/* ---------- 11. Contact form (mailto — no backend) ---------- */
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
if (form && statusEl) form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !email || !message || !form.elements.email.checkValidity()) {
    statusEl.textContent = "Please fill in all fields with a valid email.";
    statusEl.className = "form-status is-error";
    return;
  }
  const subject = encodeURIComponent(`Website message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app…";
  statusEl.className = "form-status is-success";
  form.reset();
});

/* ---------- 12. Reading progress for long-form blog pages ---------- */
const progressBar = document.getElementById("reading-progress");
if (progressBar && (document.body.dataset.page === "post" || document.querySelector(".blog-article"))) {
  const updateReadingProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();
}

/* ---------- 13. Footer year ---------- */
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();
