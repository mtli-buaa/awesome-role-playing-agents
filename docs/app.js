const scriptUrl = new URL(document.currentScript?.src || window.location.href);
const buildVersion = scriptUrl.searchParams.get("v") || "development";
const DATA_URL = `./papers.json?v=${encodeURIComponent(buildVersion)}`;

const state = {
  entries: [],
  sections: [],
  query: "",
  category: "all",
  year: "all",
  tags: new Set(),
};

const els = {
  collection: document.querySelector("#collection"),
  navigation: document.querySelector("#navigation"),
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  year: document.querySelector("#year-filter"),
  categoryOptions: document.querySelector("#category-options"),
  yearOptions: document.querySelector("#year-options"),
  results: document.querySelector("#results-count"),
  activeTags: document.querySelector("#active-tags"),
  clear: document.querySelector("#clear-filters"),
  menu: document.querySelector(".mobile-menu"),
};

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseData(data) {
  const sections = data.sections.map((section) => section.name);
  const entries = data.sections.flatMap((section) =>
    section.entries.map((entry) => ({
      section: section.name,
      year: String(entry.year),
      title: entry.title,
      paperUrl: entry.paperUrl,
      venue: entry.venue,
      resourceLabel: entry.resource?.label || "",
      resourceUrl: entry.resource?.url || "",
      type: [...entry.trainingMethods, ...entry.tags].join(" + "),
      description: entry.description || "",
    })),
  );
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
  renderFilterOptions("category", [
    { value: "all", label: "All categories" },
    ...state.sections.map((section) => ({ value: section, label: section })),
  ]);
  renderFilterOptions("year", [
    { value: "all", label: "All years" },
    ...years.map((year) => ({ value: year, label: year })),
  ]);
}

const filterControls = {
  category: {
    root: document.querySelector('[data-filter="category"]'),
    trigger: els.category,
    menu: els.categoryOptions,
  },
  year: {
    root: document.querySelector('[data-filter="year"]'),
    trigger: els.year,
    menu: els.yearOptions,
  },
};

function renderFilterOptions(filter, options) {
  const control = filterControls[filter];
  control.options = options;
  control.menu.innerHTML = options
    .map(
      ({ value, label }) =>
        `<button type="button" class="filter-select-option" role="option" data-value="${value}" aria-selected="${state[filter] === value}" tabindex="-1">${label}</button>`,
    )
    .join("");
  updateFilterControl(filter);
}

function updateFilterControl(filter) {
  const control = filterControls[filter];
  const selected = control.options.find((option) => option.value === state[filter]) || control.options[0];
  control.trigger.querySelector(".filter-select-value").textContent = selected.label;
  control.menu.querySelectorAll(".filter-select-option").forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.value === selected.value));
  });
}

function closeFilter(filter, returnFocus = false) {
  const control = filterControls[filter];
  control.root.classList.remove("open");
  control.menu.hidden = true;
  control.trigger.setAttribute("aria-expanded", "false");
  if (returnFocus) control.trigger.focus();
}

function closeAllFilters(except = "") {
  Object.keys(filterControls).forEach((filter) => {
    if (filter !== except) closeFilter(filter);
  });
}

function openFilter(filter, focusSelected = false) {
  const control = filterControls[filter];
  closeAllFilters(filter);
  control.root.classList.add("open");
  control.menu.hidden = false;
  control.trigger.setAttribute("aria-expanded", "true");
  if (focusSelected) {
    const selected =
      control.menu.querySelector('[aria-selected="true"]') ||
      control.menu.querySelector(".filter-select-option");
    selected?.focus();
  }
}

function selectFilterOption(filter, value) {
  state[filter] = value;
  updateFilterControl(filter);
  closeFilter(filter, true);
  renderCollection();
}

function moveFilterFocus(control, direction) {
  const options = [...control.menu.querySelectorAll(".filter-select-option")];
  const current = options.indexOf(document.activeElement);
  const next = current < 0 ? 0 : (current + direction + options.length) % options.length;
  options[next]?.focus();
}

function renderStats() {
  const years = [...new Set(state.entries.map((entry) => entry.year))];
  document.querySelector("#paper-count").textContent = state.entries.length;
  document.querySelector("#year-count").textContent = years.length;
  document.querySelector("#code-count").textContent = state.entries.filter((entry) => entry.resourceUrl).length;
  document.querySelector("#latest-year").textContent = Math.max(...years.map(Number));
}

function getEntryTags(entry) {
  return entry.type ? entry.type.split(/\s*\+\s*/).filter(Boolean) : [];
}

function updateTagUrl() {
  const url = new URL(window.location.href);
  if (state.tags.size) {
    url.searchParams.set("tags", [...state.tags].join(","));
  } else {
    url.searchParams.delete("tags");
  }
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function toggleTag(tag) {
  if (state.tags.has(tag)) {
    state.tags.delete(tag);
  } else {
    state.tags.add(tag);
  }
  updateTagUrl();
  renderCollection();
}

function renderActiveTags() {
  els.activeTags.innerHTML = state.tags.size
    ? `<span>Filtering by</span>${[...state.tags]
        .map(
          (tag) =>
            `<button type="button" class="active-tag" data-tag="${tag}" aria-label="Remove ${tag} filter">${tag}<span aria-hidden="true">×</span></button>`,
        )
        .join("")}`
    : "";
}

function entryMatches(entry) {
  const haystack = [entry.title, entry.venue, entry.type, entry.description, entry.section]
    .join(" ")
    .toLowerCase();
  const entryTags = getEntryTags(entry);
  return (
    (!state.query || haystack.includes(state.query)) &&
    (state.category === "all" || entry.section === state.category) &&
    (state.year === "all" || entry.year === state.year) &&
    [...state.tags].every((tag) => entryTags.includes(tag))
  );
}

function paperCard(entry) {
  const title = entry.paperUrl
    ? `<a href="${entry.paperUrl}" target="_blank" rel="noreferrer">${entry.title} ↗</a>`
    : entry.title;
  const tags = getEntryTags(entry)
    .map(
      (tag) =>
        `<button type="button" class="tag${state.tags.has(tag) ? " selected" : ""}" data-tag="${tag}" aria-pressed="${state.tags.has(tag)}">${tag}</button>`,
    )
    .join("");
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
  renderActiveTags();
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
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Paper data unavailable");
    const parsed = parseData(await response.json());
    state.entries = parsed.entries;
    state.sections = parsed.sections;
    const initialTags = new URL(window.location.href).searchParams.get("tags");
    if (initialTags) {
      initialTags.split(",").filter(Boolean).forEach((tag) => state.tags.add(tag));
    }
    renderNav();
    renderFilters();
    renderStats();
    renderCollection();
  } catch (error) {
    els.results.textContent = "Could not load the collection.";
    els.collection.innerHTML = `<div class="empty">The paper data could not be loaded. Please refresh the page.</div>`;
  }
}

els.search.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  renderCollection();
});
Object.entries(filterControls).forEach(([filter, control]) => {
  control.trigger.addEventListener("click", () => {
    if (control.root.classList.contains("open")) {
      closeFilter(filter);
    } else {
      openFilter(filter);
    }
  });
  control.trigger.addEventListener("keydown", (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openFilter(filter, true);
      if (event.key === "ArrowUp") moveFilterFocus(control, -1);
    }
  });
  control.menu.addEventListener("click", (event) => {
    const option = event.target.closest(".filter-select-option");
    if (option) selectFilterOption(filter, option.dataset.value);
  });
  control.menu.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFilterFocus(control, event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const options = control.menu.querySelectorAll(".filter-select-option");
      options[event.key === "Home" ? 0 : options.length - 1]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      document.activeElement.click();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeFilter(filter, true);
    }
  });
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".filter-select")) closeAllFilters();
});
els.clear.addEventListener("click", () => {
  state.query = "";
  state.category = "all";
  state.year = "all";
  state.tags.clear();
  els.search.value = "";
  updateFilterControl("category");
  updateFilterControl("year");
  updateTagUrl();
  renderCollection();
});
els.collection.addEventListener("click", (event) => {
  const tag = event.target.closest(".tag");
  if (tag) toggleTag(tag.dataset.tag);
});
els.activeTags.addEventListener("click", (event) => {
  const tag = event.target.closest(".active-tag");
  if (tag) toggleTag(tag.dataset.tag);
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
