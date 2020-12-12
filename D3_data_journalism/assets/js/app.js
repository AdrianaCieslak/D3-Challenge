// @TODO: YOUR CODE HERE!

//SVG area dimentions
var svgWidth = 900;
var svgHeight = 500;

//Chart marings as an object
var chartMargin = {
    top: 30,
    right: 30, 
    bottom: 70,
    left: 50
};

//Chart area dimentions
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var scatterGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
  

//Load the data
d3.csv("assets/data/data.csv").then(function(peopleData) {
    console.log(peopleData);

peopleData.forEach(function(d) {
    d.healthcare = +d.healthcare;
    d.poverty = +d.poverty;
});

var xScale = d3.scaleLinear()
    .domain(d3.extent(peopleData, d => d.poverty))
    .range([0, chartWidth]);

var yScale = d3.scaleLinear()
    .domain(d3.extent(peopleData, d => d.healthcare))
    .range([chartHeight, 0]);

var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);


scatterGroup.append("g")
    .call(leftAxis);

scatterGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);



//Code to build scatter chart
scatterGroup.selectAll("circle")
    .data(peopleData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "14")
    .classed("stateCircle", true);

//Circle Labels
scatterGroup.selectAll()
    .data(peopleData)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare) +5)
    .text(d => d.abbr)
    .classed("stateText", true);

//X-axis Label
scatterGroup.append("text")
    .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.top + 20})`)
    .text("In Poverty (%)")
    .classed("aText", true)
    .attr("font-weight", "bold");

//Y-axis Label
scatterGroup.append("text")
    .text("Lacks Healthcare (%)")
    .attr("transform", "rotate(-90)")
    .attr("font-weight", "bold")
    .attr("x", 0 - (chartHeight/2))
    .attr("y", 0 - (chartMargin.left -20))    
    .classed("aText", true);
    


}).catch(function(error) {
    console.log(error);
  
});

