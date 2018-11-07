// Url of JSON data

var url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

d3.json(url, function(error, data) {
  if (error) return console.warn(error);

  // Didn't need to make this, I guess.
  /*
    const customParse = data.map(clock => {
      var nClock = {};
      var inter = clock.Time;
      var min = inter.replace(/(\d\d):(\d\d)/, "$1");
      var secs = inter.replace(/(\d\d):(\d\d)/, "$2");
      nClock["Time"] = parseInt(secs) + 60 * parseInt(min);
      return nClock;
    });
  */
  // constants from the pages attributes

  var pad = 35;
  var w = document.getElementById('graph').offsetWidth;
  var h = document.getElementById('graph').offsetHeight;

  var svg = d3
    .select('#graph')
    .append('svg')
    .attr('id', 'svg')
    .attr('width', w)
    .attr('height', h);

  // This is for setting the axis and dot parameters. Formats everything into Date objects to pass the tests

  var parseDate = d3.timeParse('%Y');
  var formatDate = d3.timeFormat('%Y');
  var parseTime = d3.timeParse('%M:%S');
  var formatTime = d3.timeFormat('%M:%S');

  //making the scales. I have set the bounds to the data max and mins, with the chart covering the area of the graph, which is relative to the window size

  var yscale = d3
    .scaleTime()
    .domain([
      d3.min(data, function(d) {
        return parseTime(d.Time);
      }),
      d3.max(data, function(d) {
        return parseTime(d.Time);
      }),
    ])
    .range([pad, h - pad]);

  var xscale = d3
    .scaleTime()
    .domain([
      d3.min(data, function(d) {
        return parseDate(d.Year - 1);
      }),
      d3.max(data, function(d) {
        return parseDate(d.Year + 1);
      }),
    ])
    .range([pad, w - pad]);

  // Formating scale tick numbering and number of ticks

  var x_axis = d3
    .axisBottom()
    .scale(xscale)
    .tickFormat(d3.scaleTime().tickFormat(10, '%Y'));

  var y_axis = d3
    .axisLeft()
    .scale(yscale)
    .tickFormat(d3.scaleTime().tickFormat(10, '%M:%S'));

  svg
    .append('g')
    .attr('transform', 'translate(' + 0 + ', ' + parseInt(h - pad) + ')')
    .attr('id', 'x-axis')
    .call(x_axis)
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', pad)
    .attr('x', w / 2)
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .text('Year');

  svg
    .append('g')
    .attr('transform', 'translate(' + pad + ', ' + 0 + ')')
    .attr('id', 'y-axis')
    .call(y_axis)
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', pad / 2)
    .attr('x', pad)
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .text('Minutes');

  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', function(d, i) {
      return d['Doping'] !== '' ? 'dot Doping' : 'dot Not-Doping';
    })
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut)
    .attr('data-xvalue', function(d, i) {
      return parseDate(d.Year);
    })
    .attr('data-yvalue', function(d, i) {
      return parseTime(d.Time);
    })
    .attr('cx', function(d, i) {
      return xscale(parseDate(d.Year));
    })
    .attr('cy', function(d, i) {
      return yscale(parseTime(d.Time));
    })
    .attr('r', 5);
  /*
                  .attr("transform", function (d, i) {
                  var inter = parseInt(data[i].Time);
                return "translate(" + data[i].Year + ", " + inter + ")"
                });
                */

  var legendItems = [{ color: 'yellow', text: 'Doping' }, { color: 'blue', text: 'Not-Doping' }];

  var legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', 'translate(' + (w - 120) + ',' + 50 + ')');

  legend
    .append('rect')
    .attr('width', 120)
    .attr('height', '3em')
    .attr('stroke', 'white')
    .attr('stroke-width', '1')
    .attr('fill', 'none');

  legend
    .selectAll('rect')
    .exit()
    .data(legendItems)
    .enter()
    .append('rect')
    .attr('class', function(d) {
      return d.text;
    })
    .attr('x', '0.25em')
    .attr('y', function(d, i) {
      return 0.25 + i * 1.5 + 'em';
    })
    .attr('width', '1em')
    .attr('height', '1em');

  legend
    .selectAll('text')
    .exit()
    .data(legendItems)
    .enter()
    .append('text')
    .attr('x', '1.5em')
    .attr('y', function(d, i) {
      return 1.1 + i * 1.5 + 'em';
    })
    .attr('font-size', '1em')
    .text(function(d) {
      return d.text;
    });

  // Created tooltip div

  var tooltip = d3
    .select('#graph')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  function onMouseOver(d, i) {
    // Highlight dot on selection

    d3.select(this).attr('class', function(d, i) {
      return d['Doping'] !== '' ? 'highlight dot' : 'hightlight dot';
    });

    // Create tooltip for dot selected

    tooltip
      .transition()
      .duration(300)
      .style('opacity', 0.9)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');
    tooltip
      .html(function(d) {
        return (
          data[i].Name +
          ': ' +
          data[i].Nationality +
          '<br/>' +
          'Year: ' +
          data[i].Year +
          ', Time: ' +
          data[i].Time +
          (data[i].Doping ? '<br/><br/>' + data[i].Doping : '')
        );
      })
      .attr('data-year', function(d) {
        return parseDate(data[i].Year);
      });
  }

  function onMouseOut(d, i) {
    // Removing Hightlight

    d3.select(this).attr('class', function(d, i) {
      return d['Doping'] !== '' ? 'dot Doping' : 'dot Not-Doping';
    });

    // Removing tooltip

    tooltip
      .transition()
      .duration(400)
      .style('opacity', 0);
  }
});
