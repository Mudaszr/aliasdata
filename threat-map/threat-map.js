const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3.geoMercator()
  .scale(160)
  .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(res => res.json())
  .then(data => {

    const countries = topojson.feature(data, data.objects.countries);

    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#0b0b0b")
      .attr("stroke", "#333")
      .attr("stroke-width", 0.6);

    drawThreats();
  });

function drawThreats() {

  threatData.forEach(threat => {
}
