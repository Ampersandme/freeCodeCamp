 // Trying to get the data

/*

req = new XMLHttpRequest();
req.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  true
);
req.send();
req.onload = function() {
  var test = JSON.parse(req.responseText);
  console.log(test);
};

*/

var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.select("h1").style("color", "green");




function BarChart(dataset) {

  var twoDData = dataset.data;


  var padding = 50;
  var inversePad = padding * -1;
  var w = document.getElementById('graph').offsetWidth;
  var h = document.getElementById('graph').offsetHeight;
  var length = twoDData.length;
  var barWidth = (w - padding) / length;

  // Create scales

  var yscale = d3.scaleLinear().
  domain([d3.max(twoDData, function (d) {return d[1];}), 0]).
  range([padding, h]);

  var xscale = d3.scaleLinear().
  domain([0, length]).
  range([0, w - padding]);


  // Add scales to axis

  var x_axis = d3.axisBottom().
  scale(xscale);


  var y_axis = d3.axisLeft().
  scale(yscale);



  var svg = d3.select("#graph").
  append("svg").
  attr("width", w).
  attr("height", h);

  svg.append("g").
  attr("transform", "translate(" + padding + ", " + parseInt(h - padding) + ")").
  attr("id", "x-axis").
  call(x_axis.tickFormat(function (d) {
    var test = twoDData[d][0].match(/\d{4}/);
    return test;
  }).
  ticks(10)).
  append("text").
  attr("y", padding * 2 / 3).
  attr("x", (w - padding) / 2).
  attr("text-anchor", "end").
  attr("stroke", "black").
  text("x-axis");

  svg.append("g").
  attr("transform", "translate(" + padding + "," + inversePad + ")").
  attr("id", "y-axis").
  call(y_axis).
  append("text").
  attr("transform", "rotate(-90)").
  attr("y", padding / 2).
  attr("x", h * -1 / 2).
  attr("text-anchor", "end").
  attr("stroke", "black").
  text("y-axis");


  /*
                                     .attr("transform", "translate(50, 10)")
                                   .call(y_axis);
                                   
                                   
                                   yscale(d[1])
                                   
                              var g = svg.selectAll("g")                        
                   */

  var tooltip = svg.append("g").
  attr("id", "test").
  append("text").
  attr("id", "tooltip").
  style("opacity", 0).
  attr("y", 300).
  attr("x", 300).
  html('Hello123');


  svg.selectAll(null)
  //.selectAll(null)
  .data(twoDData).
  enter().
  append("g").
  attr("transform", function (d, i) {
    return "translate(" + (padding + i * barWidth) + "," + inversePad + ")";
  }).

  append("rect").
  attr("class", "bar").
  on("mouseover", onMouseOver).
  on("mouseout", onMouseOut).
  attr("data-date", function (d, i) {return d[0];}).
  attr("data-gdp", function (d, i) {return d[1];}).
  attr("value", function (d, i) {return i;}).
  attr("y", function (d, i) {return yscale(d[1]);}).
  attr("height", function (d) {
    return h - yscale(d[1]);
  }).
  attr("width", barWidth);


  function onMouseOver(d, i) {
    d3.select(this).attr('class', 'highlight');

    tooltip.html(function (d) {return twoDData[i][0];}).
    attr('data-date', twoDData[i][0]).
    style("opacity", 1);
    //.select('#title')
    //.append('text')
    //.style("color", "blue")
    //.text()
    //.attr('data-date', twoDData[i][0])
    //.attr("y", 200)
    //.attr("x", 300)
    //.html((d) => twoDData[d][0])
    //.html((d) => twoDData[d][0]);

  }

  function onMouseOut(d, i) {
    d3.select(this).attr('class', 'bar');

    tooltip.style("opacity", 0);
  }

  console.log(twoDData[0]);
  console.log("height" + h);
  console.log("width" + w);

}




document.addEventListener("DOMContentLoaded", function (event) {
  fetch(url).
  then(function (response) {return response.json();}).
  then(function (data) {
    BarChart(data);
  });
});