/* =========================================================
   script.js — content data + small interactions.
   EDITABLE CONTENT is all in section 1 below. Change the
   arrays/objects and the page updates automatically.
   ========================================================= */

/* ---------- 1. EDITABLE CONTENT ---------- */

// Your contact details and social links.
const siteConfig = {
  email: "your.email@example.com",            // REPLACE
  socialLinks: [
    { label: "GitHub", url: "https://github.com/your-username" },          // REPLACE
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-profile" }, // REPLACE
    { label: "Google Scholar", url: "https://scholar.google.com/" },        // REPLACE
    { label: "LessWrong / Alignment Forum", url: "https://www.lesswrong.com/" } // REPLACE or remove
  ]
};

// Short facts shown beside the About text.
const highlights = [
  { label: "Current role", value: "LLM / Agentic AI Evaluator, Scale AI" },
  { label: "Education", value: "PhD, Materials Science & Engineering — [University]" },
  { label: "AI Safety training", value: "BlueDot Impact — Technical AI Safety" },
  { label: "Research sprint", value: "Apart Research — AI Collusion" },
  { label: "Tools", value: "Python, PyTorch, scikit-learn, pandas" }
];

// Research interest cards.
const researchAreas = [
  { icon: "🧪", title: "LLM & Agent Evaluation", text: "Designing rigorous evals for reasoning, tool use, and long-horizon agent behavior." },
  { icon: "🤝", title: "Multi-agent Collusion", text: "Detecting when AI agents coordinate in unintended ways, and how to monitor for it." },
  { icon: "🛡️", title: "AI Safety & Alignment", text: "Scalable oversight, dangerous-capability evaluations, and robustness." },
  { icon: "⚛️", title: "ML for Science", text: "Applying machine learning and data science to materials discovery and characterization." }
];

// Projects & publications. `tags` drive the filter buttons.
const projects = [
  {
    title: "AI Collusion Research Sprint",
    description: "Apart Research sprint project investigating collusion between language-model agents. [Placeholder: summarize your method and findings.]",
    image: "assets/project-ai-collusion-sprint.jpg",
    imageAlt: "Abstract illustration for the AI collusion project",
    tags: ["AI Safety"],
    link: "https://github.com/your-username/ai-collusion",   // REPLACE
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
    link: "https://doi.org/",                                 // REPLACE with DOI
    linkLabel: "Read paper"
  }
];

// Blog post previews. Set `link` to a page like "posts/my-post.html".
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

/* ---------- 3. Mobile navigation ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- 4. About highlights ---------- */
const highlightList = document.getElementById("highlight-list");
highlights.forEach((item) => {
  const li = createElement("li");
  li.append(createElement("span", "highlight-label", item.label), document.createTextNode(item.value));
  highlightList.append(li);
});

/* ---------- 5. Research cards ---------- */
const researchGrid = document.getElementById("research-grid");
researchAreas.forEach((area) => {
  const card = createElement("article", "research-card");
  const icon = createElement("span", "research-icon", area.icon);
  icon.setAttribute("aria-hidden", "true");
  card.append(icon, createElement("h3", "", area.title), createElement("p", "", area.text));
  researchGrid.append(card);
});

/* ---------- 6. Projects + filters ---------- */
const projectGrid = document.getElementById("project-grid");
const filterBar = document.getElementById("filter-bar");

function renderProjects(filter) {
  projectGrid.innerHTML = "";
  projects
    .filter((p) => filter === "All" || p.tags.includes(filter))
    .forEach((p) => {
      const card = createElement("article", "project-card");
      const img = document.createElement("img");
      img.src = p.image; img.alt = p.imageAlt; img.loading = "lazy";
      const body = createElement("div", "project-body");
      const tags = createElement("ul", "tag-list");
      p.tags.forEach((t) => tags.append(createElement("li", "tag", t)));
      const link = createElement("a", "project-link", p.linkLabel + " →");
      link.href = p.link;
      if (p.link.startsWith("http")) { link.target = "_blank"; link.rel = "noopener"; }
      body.append(createElement("h3", "", p.title), tags, createElement("p", "", p.description), link);
      card.append(img, body);
      projectGrid.append(card);
    });
}

const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];
allTags.forEach((tag) => {
  const btn = createElement("button", "filter-button", tag);
  btn.type = "button";
  btn.setAttribute("aria-pressed", tag === "All" ? "true" : "false");
  btn.addEventListener("click", () => {
    filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    renderProjects(tag);
  });
  filterBar.append(btn);
});
renderProjects("All");

/* ---------- 7. Blog list ---------- */
const blogList = document.getElementById("blog-list");
blogPosts.forEach((post) => {
  const article = createElement("article", "blog-post");
  const h3 = createElement("h3");
  const a = createElement("a", "", post.title);
  a.href = post.link;
  h3.append(a);
  const date = new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  article.append(h3, createElement("p", "blog-meta", date), createElement("p", "", post.summary));
  blogList.append(article);
});

/* ---------- 8. Social links ---------- */
const socialList = document.getElementById("social-list");
const emailItem = createElement("li");
const emailLink = createElement("a", "", "✉ " + siteConfig.email);
emailLink.href = "mailto:" + siteConfig.email;
emailItem.append(emailLink);
socialList.append(emailItem);
siteConfig.socialLinks.forEach((s) => {
  const li = createElement("li");
  const a = createElement("a", "", s.label);
  a.href = s.url; a.target = "_blank"; a.rel = "noopener";
  li.append(a);
  socialList.append(li);
});

/* ---------- 9. Contact form (mailto — no backend) ---------- */
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message || !form.email.checkValidity()) {
    statusEl.textContent = "Please fill in all fields with a valid email.";
    statusEl.className = "form-status is-error";
    return;
  }
  const subject = encodeURIComponent("Website message from " + name);
  const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:" + siteConfig.email + "?subject=" + subject + "&body=" + body;
  statusEl.textContent = "Opening your email app…";
  statusEl.className = "form-status is-success";
  form.reset();
});

/* ---------- 10. Footer year ---------- */
document.getElementById("footer-year").textContent = new Date().getFullYear();
