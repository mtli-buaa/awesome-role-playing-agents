const README_URL = "./README.md";

const state = {
  entries: [],
  sections: [],
  query: "",
  category: "all",
  year: "all",
};

const els = {
  collection: document.querySelector("#collection"),
  navigation: document.querySelector("#navigation"),
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  year: document.querySelector("#year-filter"),
  results: document.querySelector("#results-count"),
  clear: document.querySelector("#clear-filters"),
  menu: document.querySelector(".mobile-menu"),
};

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitRow(line) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function extractLink(value = "") {
  const match = value.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return match ? { label: match[1], url: match[2] } : { label: value, url: "" };
}

function cleanMarkdown(value = "") {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function parseReadme(markdown) {
  const lines = markdown.split(/\r?\n/);
  const ignored = new Set(["Contents", "Selection Criteria", "Contributing", "Contributors"]);
  const entries = [];
  const sections = [];
  let section = "";

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^##\s+(?:[^\w\s]+\s*)?(.+)$/);
    if (heading) {
      section = cleanMarkdown(heading[1]);
      continue;
    }

    if (!section || ignored.has(section) || !lines[index].trim().startsWith("|")) continue;

    const headers = splitRow(lines[index]).map((cell) => cell.toLowerCase());
    const divider = lines[index + 1] || "";
    if (!divider.includes("---") || !headers.includes("year") || !headers.includes("paper")) continue;

    if (!sections.includes(section)) sections.push(section);
    index += 2;

    while (index < lines.length && lines[index].trim().startsWith("|")) {
      const cells = splitRow(lines[index]);
      const row = Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex] || ""]));
      const paper = extractLink(row.paper);
      const resource = extractLink(row.code || "");
      entries.push({
        section,
        year: cleanMarkdown(row.year),
        title: cleanMarkdown(paper.label),
        paperUrl: paper.url,
        venue: cleanMarkdown(row.venue),
        resourceLabel: cleanMarkdown(resource.label),
        resourceUrl: resource.url,
        type: cleanMarkdown(row.type || row.scope),
        description: cleanMarkdown(row.description),
      });
      index += 1;
    }
    index -= 1;
  }

  return { entries, sections };
}

function renderNav() {
  els.navigation.innerHTML = [
    `<a href="#top"><span class="nav-index">00</span>Overview</a>`,
    ...state.sections.map(
      (section, index) =>
        `<a href="#${slugify(section)}"><span class="nav-index">${String(index + 1).padStart(2, "0")}</span>${section}</a>`,
    ),
    `<a href="#contributing"><span class="nav-index">${String(state.sections.length + 1).padStart(2, "0")}</span>Contributing</a>`,
  ].join("");
}

function renderFilters() {
  const years = [...new Set(state.entries.map((entry) => entry.year))].sort((a, b) => Number(b) - Number(a));
  els.category.innerHTML += state.sections.map((section) => `<option value="${section}">${section}</option>`).join("");
  els.year.innerHTML += years.map((year) => `<option value="${year}">${year}</option>`).join("");
}

function renderStats() {
  const years = [...new Set(state.entries.map((entry) => entry.year))];
  document.querySelector("#paper-count").textContent = state.entries.length;
  document.querySelector("#year-count").textContent = years.length;
  document.querySelector("#code-count").textContent = state.entries.filter((entry) => entry.resourceUrl).length;
  document.querySelector("#latest-year").textContent = Math.max(...years.map(Number));
}

function entryMatches(entry) {
  const haystack = [entry.title, entry.venue, entry.type, entry.description, entry.section]
    .join(" ")
    .toLowerCase();
  return (
    (!state.query || haystack.includes(state.query)) &&
    (state.category === "all" || entry.section === state.category) &&
    (state.year === "all" || entry.year === state.year)
  );
}

function paperCard(entry) {
  const title = entry.paperUrl
    ? `<a href="${entry.paperUrl}" target="_blank" rel="noreferrer">${entry.title} ↗</a>`
    : entry.title;
  const tags = entry.type
    ? entry.type.split(/\s*\+\s*/).map((tag) => `<span class="tag">${tag}</span>`).join("")
    : "";
  const resource = entry.resourceUrl
    ? `<a href="${entry.resourceUrl}" target="_blank" rel="noreferrer">${entry.resourceLabel || "Resource"} ↗</a>`
    : "";

  return `
    <article class="paper-card">
      <div class="paper-year">${entry.year}</div>
      <div>
        <h4 class="paper-title">${title}</h4>
        ${entry.description ? `<p class="paper-description">${entry.description}</p>` : ""}
        ${tags ? `<div class="paper-meta">${tags}</div>` : ""}
      </div>
      <div class="paper-links">
        ${entry.venue ? `<span class="venue">${entry.venue}</span>` : ""}
        ${resource}
      </div>
    </article>
  `;
}

function renderCollection() {
  const filtered = state.entries.filter(entryMatches);
  const grouped = state.sections
    .map((section) => [section, filtered.filter((entry) => entry.section === section)])
    .filter(([, entries]) => entries.length);

  els.results.textContent = `${filtered.length} of ${state.entries.length} entries`;
  els.collection.innerHTML = grouped.length
    ? grouped
        .map(
          ([section, entries]) => `
          <section class="research-section" id="${slugify(section)}">
            <header class="research-section-header">
              <h3>${section}</h3>
              <span class="section-count">${entries.length} entries</span>
            </header>
            <div class="paper-list">${entries.map(paperCard).join("")}</div>
          </section>
        `,
        )
        .join("")
    : `<div class="empty"><strong>No matching work found.</strong><br />Try a broader keyword or clear the filters.</div>`;
}

async function init() {
  try {
    const response = await fetch(README_URL);
    if (!response.ok) throw new Error("README unavailable");
    const parsed = parseReadme(await response.text());
    state.entries = parsed.entries;
    state.sections = parsed.sections;
    renderNav();
    renderFilters();
    renderStats();
    renderCollection();
  } catch (error) {
    els.results.textContent = "Could not load the collection.";
    els.collection.innerHTML = `<div class="empty">The README data could not be loaded. Please refresh the page.</div>`;
  }
}

els.search.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  renderCollection();
});
els.category.addEventListener("change", (event) => {
  state.category = event.target.value;
  renderCollection();
});
els.year.addEventListener("change", (event) => {
  state.year = event.target.value;
  renderCollection();
});
els.clear.addEventListener("click", () => {
  state.query = "";
  state.category = "all";
  state.year = "all";
  els.search.value = "";
  els.category.value = "all";
  els.year.value = "all";
  renderCollection();
});
els.menu.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  els.menu.setAttribute("aria-expanded", String(open));
});
els.navigation.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  els.menu.setAttribute("aria-expanded", "false");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
init();
