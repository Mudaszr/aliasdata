const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/* MAIN MAP GROUP */
const g = svg.append("g");

/* PROJECTION */
const projection = d3.geoMercator()
  .scale(width / 6.5)
  .translate([width / 2, height / 1.7]);

const path = d3.geoPath().projection(projection);

/* LOAD WORLD */
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .then(function(data) {

    /* COUNTRIES */
    g.selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#050505")
      .attr("stroke", "#1a1a1a")
      .attr("stroke-width", 0.8);

    drawThreats();

  });

/* THREAT HOTSPOTS */
function drawThreats() {

  threatData.forEach(threat => {

    const coords = projection([
      threat.lng,
      threat.lat
    ]);

    if (!coords) return;

    /* GLOW */
    g.append("circle")
      .attr("cx", coords[0])
      .attr("cy", coords[1])
      .attr("r", 18)
      .style("fill", "rgba(255,0,0,0.15)");

    /* CORE */
    g.append("circle")
      .attr("cx", coords[0])
      .attr("cy", coords[1])
      .attr("r", 5)
      .style("fill", "#ff2b2b");

    pulse(coords[0], coords[1]);

  });

}

/* PULSE ANIMATION */
function pulse(x, y) {

  const circle = g.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 6)
    .style("stroke", "#ff2b2b")
    .style("stroke-width", 2)
    .style("fill", "none");

  circle.transition()
    .duration(2200)
    .attr("r", 40)
    .style("opacity", 0)
    .on("end", () => {

      circle.remove();

      pulse(x, y);

    });

}

/* ZOOM + DRAG */
const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on("zoom", (event) => {

    g.attr("transform", event.transform);

  });

svg.call(zoom);
