// Generates public/travel/world.svg: every country drawn once, the visited ones
// tagged so CSS can light them. Run with: node scripts/build-map.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";

const VISITED = [
  "Canada",
  "Mexico",
  "Costa Rica",
  "Peru",
  "Belize",
  "Namibia",
  "Zambia",
  "Zimbabwe",
  "Botswana",
  "Australia",
  "China",
  "New Zealand",
  "Thailand",
  "Japan",
  "Kuwait",
  "Iraq",
  "Afghanistan",
  "Egypt",
  "United Arab Emirates",
  "Spain",
  "France",
  "Ireland",
  "Iceland",
  "United Kingdom",
  "Turkey",
  "Romania",
  "Italy",
  "Greece",
  "Germany",
  "Poland",
  "Netherlands",
  "Belgium",
  "Croatia",
  "Austria",
  "Hungary",
  "Cambodia",
  "United States of America",
];

const topo = JSON.parse(
  readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url)),
);
const countries = feature(topo, topo.objects.countries);

const width = 1400;
const height = 660;
const projection = geoNaturalEarth1().fitExtent(
  [
    [10, 10],
    [width - 10, height - 10],
  ],
  countries,
);
const path = geoPath(projection);

const missing = VISITED.filter(
  (name) => !countries.features.some((f) => f.properties.name === name),
);
if (missing.length) {
  console.error("Not found in the dataset:", missing);
  process.exit(1);
}

const paths = countries.features
  .filter((f) => f.properties.name !== "Antarctica")
  .map((f) => {
    const d = path(f);
    if (!d) return "";
    const visited = VISITED.includes(f.properties.name);
    return `<path d="${d}" class="${visited ? "v" : "c"}"><title>${f.properties.name}</title></path>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="World map with the countries Ayanna has visited highlighted">
<style>
.c { fill: #171c1c; stroke: #0b0c0c; stroke-width: 0.6; }
.v { fill: #2f6f68; stroke: #0b0c0c; stroke-width: 0.6; }
</style>
${paths}
</svg>
`;

mkdirSync(new URL("../public/travel/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/travel/world.svg", import.meta.url), svg);
console.log(
  `wrote public/travel/world.svg with ${VISITED.length} highlighted of ${countries.features.length}`,
);
