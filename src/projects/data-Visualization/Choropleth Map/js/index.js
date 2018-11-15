 // Declare Constants for import

var eduURL =
"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";

var mapURL =
"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

// Declare constants for all other things

var w = document.getElementById("graph").offsetWidth;
var h = document.getElementById("graph").offsetHeight - 50;
var pad = 35;


// functions to get data from urls and combine to new object

function getdata(url, callback) {
  d3.json(url).then(function (data) {
    callback(null, data);
  });
}

// data loaded successfully,

function makeMapFunc(lData) {
  console.log(lData);

  var counties = topojson.feature(lData[1], lData[1].objects.counties);
  var eduData = lData[0];
  var min = d3.min(eduData, function (d) {return d.bachelorsOrHigher;});
  var max = d3.max(eduData, function (d) {return d.bachelorsOrHigher;});
  var delta = max - min;


  var color = d3.scaleThreshold().
  domain(d3.range(min, max, delta / 9)).
  range(d3.schemeRdGy[9]);

  var legendScale = d3.scaleLinear().
  domain([min, max]).
  rangeRound([500, 900]);

  // Function for resize of map

  d3.select(window).
  on("resize", sizeChange);

  function sizeChange() {

    var testCase = $("#svg").width() / 950;

    $('#svg').attr("width", "100%");
    $('#svg').attr("height", "100%");
    d3.select("#resize").attr("transform", "scale(" + (testCase < 0.8 ? testCase : 0.8) + ") translate(" + (testCase > 0.8 ? $("#svg").width() / 4 : 0) + "," + 0 + ")");

    console.log("move");
  }


  // Make the svg give it some size.

  var svg = d3.select("#graph").
  append("svg").
  attr("id", "svg").
  attr("width", w).
  attr("height", h).
  attr("viewbox", "0 0 100 100");

  // att the attribute for the legend

  var legend = svg.append('g').
  attr('id', 'legend');

  legend.selectAll('rect').
  data(color.range().map(function (d) {
    var temp = color.invertExtent(d);
    return [temp[0] || legendScale.domain()[0], temp[1] || legendScale.domain()[1]];
  })).
  enter().append('rect').
  attr('height', 10).
  attr('width', function (d) {return legendScale(d[1]) - legendScale(d[0]);}).
  attr('x', function (d) {return legendScale(d[0]);}).
  attr('fill', function (d) {return color(d[0]);});

  legend.append('text').
  attr('x', legendScale.range()[0]).
  attr('y', 0);

  legend.call(d3.axisBottom(legendScale).
  tickSize(10).
  tickFormat(function (x) {return Math.round(x) + "%";}).
  tickValues(color.domain())).
  select('.domain').
  remove();



  // Add the map

  var path = d3.geoPath();

  svg.
  append("g").
  attr("id", "resize").
  attr("class", "counties").
  selectAll("path").
  data(counties.features).
  enter().
  append("path").
  attr("class", "county").
  attr("d", path).
  attr('data-fips', function (d) {return d.id;}).
  attr('data-education', function (d) {
    return eduData.find(function (el) {return el.fips === d.id;}).bachelorsOrHigher;
  }).
  style("stroke-opacity", .2).
  style("stroke", "black").
  attr("fill", function (d) {
    return color(eduData.find(function (el) {return el.fips === d.id;}).bachelorsOrHigher || 0);
  }).
  on('mouseover', handleMouseOver).
  on('mouseout', handleMouseOut);

  var tooltip = d3.
  select("#graph").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);


  // legend actions on selection


  function handleMouseOver(d) {

    var r = eduData.find(function (el) {return el.fips === d.id;});

    d3.select("#tooltip").
    transition().
    duration(100).
    style("opacity", 0.9).
    style("left", d3.event.pageX + "px").
    style("top", d3.event.pageY + "px");


    d3.select("#tooltip")
    //.data(d)
    .html("State: " + r.state + "<br/>" + "County: " + r.area_name +
    "<br/>" + "Percentage with Bachelors Degrees: " + r.bachelorsOrHigher + "%").
    attr("data-education", function () {
      return r.bachelorsOrHigher;
    });
  }

  function handleMouseOut(d) {

    d3.select("#tooltip").
    transition(100).
    duration(1).
    style("opacity", 0);
  }

  //function for handling errors on loading of data



  function errorFunc(errors) {
    console.log("Error");
    console.log(errors);
  }
}

var q = d3.queue();
q.defer(getdata, eduURL);
q.defer(getdata, mapURL);
q.awaitAll(function (error, files) {
  error ? errorFunc(error) : makeMapFunc(files);
});


// Testing things with a bunch of console logs below
/* */