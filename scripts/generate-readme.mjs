import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "papers.json");
const templatePath = path.join(root, "scripts", "README.template.md");
const readmePath = path.join(root, "README.md");
const checkOnly = process.argv.includes("--check");

function fail(message) {
  throw new Error(message);
}

function escapeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

function link(label, url) {
  return url ? `[${escapeCell(label)}](${url})` : escapeCell(label);
}

function validate(data) {
  if (data.schemaVersion !== 1) fail("Unsupported papers.json schema version.");
  if (!Array.isArray(data.sections) || !data.sections.length) fail("papers.json has no sections.");

  const allowedMethods = new Set(data.trainingMethodVocabulary);
  const expectedMethods = ["Training-free", "SFT", "RL", "OPD"];
  if (JSON.stringify(data.trainingMethodVocabulary) !== JSON.stringify(expectedMethods)) {
    fail(`Training method vocabulary must be: ${expectedMethods.join(", ")}.`);
  }

  const sectionIds = new Set();
  const paperUrls = new Set();
  for (const section of data.sections) {
    if (!section.id || !section.name || !["overview", "papers", "datasets"].includes(section.kind)) {
      fail(`Invalid section metadata: ${JSON.stringify(section)}.`);
    }
    if (sectionIds.has(section.id)) fail(`Duplicate section id: ${section.id}.`);
    sectionIds.add(section.id);
    if (!Array.isArray(section.entries)) fail(`Section ${section.name} has no entries array.`);

    for (const entry of section.entries) {
      if (!Number.isInteger(entry.year) || !entry.title || !entry.paperUrl || !entry.venue) {
        fail(`Missing required paper data in ${section.name}: ${entry.title || "untitled entry"}.`);
      }
      if (paperUrls.has(entry.paperUrl)) fail(`Duplicate paper URL: ${entry.paperUrl}.`);
      paperUrls.add(entry.paperUrl);
      if (!Array.isArray(entry.trainingMethods) || !Array.isArray(entry.tags)) {
        fail(`trainingMethods and tags must be arrays for: ${entry.title}.`);
      }
      for (const method of entry.trainingMethods) {
        if (!allowedMethods.has(method)) fail(`Unknown training method "${method}" on: ${entry.title}.`);
      }
      for (const tag of entry.tags) {
        if (allowedMethods.has(tag)) fail(`Move training tag "${tag}" to trainingMethods on: ${entry.title}.`);
      }
      if (entry.resource && (!entry.resource.label || !entry.resource.url)) {
        fail(`Incomplete resource link on: ${entry.title}.`);
      }
    }
  }
}

function tableRows(section) {
  if (section.kind === "overview") {
    return {
      headers: ["Year", "Paper", "Venue"],
      rows: section.entries.map((entry) => [
        entry.year,
        link(entry.title, entry.paperUrl),
        entry.venue,
      ]),
    };
  }

  const rows = section.entries.map((entry) => {
    const resource = entry.resource ? link(entry.resource.label, entry.resource.url) : "-";
    const labels = [...entry.trainingMethods, ...entry.tags].join(" + ");
    const common = [entry.year, link(entry.title, entry.paperUrl), entry.venue, resource];
    return section.kind === "datasets"
      ? [...common, labels]
      : [...common, labels, entry.description];
  });

  return section.kind === "datasets"
    ? { headers: ["Year", "Paper", "Venue", "Code", "Scope"], rows }
    : { headers: ["Year", "Paper", "Venue", "Code", "Type", "Description"], rows };
}

function renderTable(section) {
  const { headers, rows } = tableRows(section);
  const normalizedRows = rows.map((row) => row.map(escapeCell));
  const widths = headers.map((header, index) =>
    Math.max(header.length, 3, ...normalizedRows.map((row) => row[index].length)),
  );
  const renderRow = (row) =>
    `| ${row.map((cell, index) => cell.padEnd(widths[index])).join(" | ")} |`;

  return [
    renderRow(headers),
    `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`,
    ...normalizedRows.map(renderRow),
  ].join("\n");
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
validate(data);

let output = fs.readFileSync(templatePath, "utf8");
for (const section of data.sections) {
  const marker = `{{TABLE:${section.id}}}`;
  if (!output.includes(marker)) fail(`README template is missing ${marker}.`);
  output = output.replace(marker, renderTable(section));
}
if (output.includes("{{TABLE:")) fail("README template contains an unresolved table marker.");

if (checkOnly) {
  const current = fs.readFileSync(readmePath, "utf8");
  if (current !== output) {
    console.error("README.md is out of date. Run: node scripts/generate-readme.mjs");
    process.exit(1);
  }
  console.log(`Validated ${data.sections.reduce((sum, section) => sum + section.entries.length, 0)} entries.`);
} else {
  fs.writeFileSync(readmePath, output);
  console.log(`Generated README.md from ${path.relative(root, dataPath)}.`);
}
