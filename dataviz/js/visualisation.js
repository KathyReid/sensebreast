

var margin = {top: 40, right: 40, bottom: 40, left: 200},
    width = innerWidth - margin.left - margin.right,
    height = innerHeight - margin.top - margin.bottom;

// this should take the lowest time stamp and the highest time stamp
// https://javascript.info/date
var x = d3.scaleTime()
    .range([0, width])
    .domain([(d3.timeMinute(Date.parse('2019-06-08 16:00:02'))), (d3.timeMinute(Date.parse('2019-06-08 16:05:02')))]);

// the domain should be temperature in celsius
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([27, 33]);

// trying to put a second y-axis in for pressure
var y2 = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 1200]);

// trying to put a second y-axis in for pressure
var y3 = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);


// define colors so we can call them programmatically rather than individually
var color = d3.scaleOrdinal()
  .range([
    '#8CB5C5','#5BE0E2', '#82FF9E', '#F487FF', '#680F77'
  ])
  .domain([
    'Temperature', 'Pressure', 'Humidity'
  ]);

// https://github.com/pshrmn/notes/blob/master/d3/axes.md
// https://github.com/d3/d3-time-format
var xAxis = d3.axisBottom(x);
xAxis.ticks(30);
xAxis.tickFormat(d3.timeFormat("%M %S"));
xAxis.tickSize(8);
//xAxis.tickValues('2019-05-25-11:20:00', '2019-05-25-11:20:30', '2019-05-25-11:21:00')


var yAxis = d3.axisLeft(y);
var y2Axis = d3.axisLeft(y2);
var y3Axis = d3.axisLeft(y3);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("test.json", function(error, data) {
  if (error) throw error;

// x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("y", 35)
      .attr("x", width/2)
      //.attr("transform", "rotate(-65)")
      .style("text-anchor", "end")
      .text("Time (graph is over 5 minute period)");

 // y axis - temperature
  svg.append("g")
      .attr("class", "y axis temperature")
      .attr("transform", "translate(0, 0)") // move the axis visually
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height/2)
      .style("text-anchor", "end")
      .text("Temperature (° Celsius)");

  // y2 axis - pressure
  svg.append("g")
      .attr("class", "y axis pressure")
      .attr("transform", "translate(-70, 0)")
      .call(y2Axis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height/2)
      .style("text-anchor", "end")
      .text("Pressure (Millibars)");

      // y3 axis - humidity
      svg.append("g")
          .attr("class", "y axis humidity")
          .attr("transform", "translate(-140, 0)")
          .call(y3Axis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height/2)
        .style("text-anchor", "end")
        .text("Humidity (%)");


  // Visualise temperature
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot temperature")
      .attr("r", 1)
      .attr("cx", function(d) { return x(Date.parse(d.datestamp)); })
      .attr("cy", function(d) { return y(d.temperature); })
      .style("fill", function(d) { return color('Temperature'); });

    // Visualise pressure
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot pressure")
        .attr("r", 0.7)
        .attr("cx", function(d) { return x(Date.parse(d.datestamp)); })
        .attr("cy", function(d) { return y2(d.pressure); })
        .style("fill", function(d) { return color('Pressure'); });

// Visualise humidity
svg.selectAll(".dot")
  .data(data)
.enter().append("circle")
  .attr("class", "dot humidity")
  .attr("r", 0.7)
  .attr("cx", function(d) { return x(Date.parse(d.datestamp)); })
  .attr("cy", function(d) { return y3(d.humidity); })
  .style("fill", function(d) { return color('Humidity'); });


  // Draw the legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});

// Helper functions
function log(sel,msg) {
  console.log(msg,sel);
}
