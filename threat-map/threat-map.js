const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "#050505");

const projection = d3.geoMercator()
  .scale(140)
  .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

d3.json("https://unpkg.com/world-atlas@2/countries-110m.json")
  .then(function(world) {

    const countries = topojson.feature(
      world,
      world.objects.countries
    );

    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#0a0a0a")
      .attr("stroke", "#333")
      .attr("stroke-width", 0.7);

    drawThreats();
  });

function drawThreats() {

  threatData.forEach(threat => {

    const coords = projection([
      threat.lng,
      threat.lat
    ]);

    if (!coords) return;

    // glow
    svg.append("circle")
      .attr("cx", coords[0])
      .attr("cy", coords[1])
      .attr("r", 10)
      .attr("fill", "red")
      .attr("opacity", 0.3);

    // core
    svg.append("circle")
      .attr("cx", coords[0])
      .attr("cy", coords[1])
      .attr("r", 4)
      .attr("fill", "#ff2b2b");

    animatePulse(coords);
  });
}

function animatePulse(coords) {

  const pulse = svg.append("circle")
    .attr("cx", coords[0])
    .attr("cy", coords[1])
    .attr("r", 5)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  pulse.transition()
    .duration(2000)
    .attr("r", 30)
    .style("opacity", 0)
    .on("end", () => {
      pulse.remove();
      animatePulse(coords);
    });
}
