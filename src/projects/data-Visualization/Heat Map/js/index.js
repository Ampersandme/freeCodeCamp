var dataURL =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

d3.json(dataURL, function(error, data) {
  if (error) return console.warn(error);

  // An Array of English Months for the graph y axis

  var arrMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // A Variable holding most of the data from the data set. Subtracts a Level

  var monthlyData = data.monthlyVariance;

  // Get size for svg or "graph" area based on window dimensions

  var pad = 35;
  var apad = -35;
  var w = document.getElementById('graph').offsetWidth;
  var h = document.getElementById('graph').offsetHeight;
  var len = Math.ceil(data.monthlyVariance.length / 12);
  var barheight = (h - pad * 4) / 12;
  var barwidth = (w - pad * 2) / len;

  // Fix a svg to the that area previously defined

  var svg = d3
    .select('#graph')
    .append('svg')
    .attr('id', 'svg')
    .attr('width', w)
    .attr('height', h)
    .style('fill', function(d, i) {});

  // Adding title and subtitle to svg to

  svg
    .append('text')
    .attr('id', 'title')
    .attr('x', w / 2)
    .attr('y', pad)
    .attr('text-anchor', 'middle')
    .style('font-size', '22px')
    .style('text-decoration', 'underline')
    .text('Monthly Global Land-Surface Temperature');

  svg
    .append('text')
    .attr('id', 'description')
    .attr('x', w / 2)
    .attr('y', pad * 1.75)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .text('(1753 - 2015: base temperature 8.66℃)');

  // Setting up the x and y based on data maxs and mins/ defining range
  /* */
  var yscale = d3
    .scaleBand()
    .domain(arrMonths)
    .range([pad * 3, h - pad]);

  var xscale = d3
    .scaleLinear()
    .domain([
      d3.min(monthlyData, function(d) {
        return d.year;
      }),
      d3.max(monthlyData, function(d) {
        return d.year;
      }),
    ])
    .range([pad, w - pad]);

  // Formating the scales.

  var x_axis = d3
    .axisBottom()
    .scale(xscale)
    .tickFormat(d3.scaleLinear())
    .ticks(20);

  var y_axis = d3.axisLeft().scale(yscale);

  // Adding the scales to the graph, positioning and labels

  svg
    .append('g')
    .attr('transform', 'translate(' + pad + ', ' + parseInt(h - pad) + ')')
    .attr('id', 'x-axis')
    .call(x_axis)
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', pad)
    .attr('x', w / 2)
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .text('Years');

  svg
    .append('g')
    .attr('transform', 'translate(' + pad * 2 + ', ' + 0 + ')')
    .attr('id', 'y-axis')
    .call(y_axis)
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', apad * 1.5)
    .attr('x', (-1 * w) / 2 + pad * 3)
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .attr('transform', 'rotate(-90)')
    .text('Months');

  // Appending Rectangle to fill at correct position

  svg
    .selectAll(null)
    .data(monthlyData)
    .enter()
    .append('g')
    .attr('transform', function(d, i) {
      return (
        'translate(' +
        (pad * 2 + Math.floor(i / 12) * barwidth) +
        ',' +
        (pad * 3 + barheight * (i % 12)) +
        ')'
      );
    })
    .append('rect')
    .attr('class', 'cell')
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut)
    .attr('data-month', function(d, i) {
      return d.month - 1;
    })
    .attr('data-year', function(d, i) {
      return d.year;
    })
    .attr('data-temp', function(d, i) {
      return d.variance + data.baseTemperature;
    })
    .attr('height', barheight)
    .attr('width', barwidth)

    // This adds colour to the rect based on the variance of the temperature. I think I should be able to clean this up
    .style('fill', function(d, i) {
      if (d.variance < -5.86) {
        return 'rgb(49, 54, 149)';
      } else if (d.variance < -4.76) {
        return 'rgb(69, 117, 180)';
      } else if (d.variance < -3.66) {
        return 'rgb(116, 173, 209)';
      } else if (d.variance < -2.56) {
        return 'rgb(171, 217, 233)';
      } else if (d.variance < -1.46) {
        return 'rgb(224, 243, 248)';
      } else if (d.variance < -0.36) {
        return 'rgb(255, 255, 191)';
      } else if (d.variance < 1.26) {
        return 'rgb(254, 224, 144)';
      } else if (d.variance < 2.36) {
        return 'rgb(253, 174, 97)';
      } else if (d.variance < 3.46) {
        return 'rgb(244, 109, 67)';
      } else if (d.variance < 4.56) {
        return 'rgb(215, 48, 39)';
      } else {
        return 'rgb(165, 0, 38)';
      }
    });

  // Adding the tool tip div to the graph

  var tooltip = d3
    .select('#graph')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  // declaring the functions to all mouse hover to update the tooltip

  function onMouseOver(d, i) {
    tooltip
      .transition()
      .duration(300)
      .style('opacity', 0.9)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');
    tooltip
      .html(function(d) {
        return (
          'Year:' +
          monthlyData[i].year +
          '<br/>' +
          'Month: ' +
          arrMonths[monthlyData[i].month - 1] +
          '<br/>' +
          'Temperature: ' +
          (parseFloat(monthlyData[i].variance) + parseFloat(data.baseTemperature)).toFixed(2)
        );
      })
      .attr('data-year', function(d) {
        return monthlyData[i].year;
      });
  }

  function onMouseOut(d, i) {
    // Removing tooltip

    tooltip
      .transition()
      .duration(400)
      .style('opacity', 0);
  }

  // Declaring the items kept within the legend

  var legendItems = [
    { color: 'rgb(49, 54, 149)', text: '2.8' },
    { color: 'rgb(69, 117, 180)', text: '3.9' },
    { color: 'rgb(116, 173, 209)', text: '5.0' },
    { color: 'rgb(171, 217, 233)', text: '6.1' },
    { color: 'rgb(224, 243, 248)', text: '7.2' },
    { color: 'rgb(255, 255, 191)', text: '8.3' },
    { color: 'rgb(254, 224, 144)', text: '9.5' },
    { color: 'rgb(253, 174, 97)', text: '10.6' },
    { color: 'rgb(244, 109, 67)', text: '11.7' },
    { color: 'rgb(215, 48, 39)', text: '12.8' },
    { color: 'rgb(165, 0, 38)' },
  ];

  // Appending the parent element for the legend

  var legend = svg
    .append('g')
    .attr('id', 'legend')
    //.attr("transform", "translate(" +  (w-120) + "," + 0 + ")")
    .attr('transform', 'translate(' + w / 5 + ',' + pad * 2 + ')');

  legend
    .append('rect')
    .attr('width', 120)
    .attr('height', '3em')
    .attr('stroke', 'white')
    .attr('stroke-width', '1')
    .attr('fill', 'none');

  // Filling the legend with legend elements

  legend
    .selectAll('rect')
    .exit()
    .data(legendItems)
    .enter()
    .append('rect')
    .attr('y', '0.25em')
    .attr('x', function(d, i) {
      return 0.25 + i * 3.25 + 'em';
    })
    .attr('width', '1em')
    .attr('height', '1em')
    .style('fill', function(d, i) {
      return d.color;
    });

  legend
    .selectAll('text')
    .exit()
    .data(legendItems)
    .enter()
    .append('text')
    .attr('y', '1.0em')
    .attr('x', function(d, i) {
      return 1.1 + i * 3.25 + 0.5 + 'em';
    })
    .attr('font-size', '1em')
    .text(function(d) {
      return d.text;
    });

  // Testing things with a bunch of console logs below
  /* */
  //console.log(Math.ceil(data.monthlyVariance.length / 12));
  //console.log(monthlyData);
  //console.log(data);
});
