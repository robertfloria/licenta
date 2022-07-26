import React, {useRef, useState, useEffect, useCallback} from 'react';
import * as  d3 from 'd3';
import * as dataJson from './data/population.json';
import * as dataJson2 from './data/ImportedData.json';

export default function Chart2 (){

	var dataset1 = [[90, 20], [20, 100], [66, 44], [53, 80], 
	[24, 182], [80, 72], [10, 76], [33, 150], [100, 15],
	[120, 13], [23, 432], [232, 442], [32, 23], [442, 123],
	[212, 321], [323, 123], [109, 341], [99, 121], [112, 34],
	[232, 321], [323, 113], [129, 311], [255, 255], [265, 34],
	[412, 321], [444, 444], [441, 441], [77, 121], [23, 34],
	[95, 20], [24, 140], [26, 44], [59, 89], 
	[44, 132], [450, 72], [30, 76], [31, 130], [100, 55],
	[130, 13], [13, 432], [232, 442], [32, 23], [432, 123],
	[96, 23], [22, 109], [46, 44], [52, 82], 
	[14, 182], [30, 72], [16, 26], [332, 150], [180, 15],
	[130, 133], [223, 132], [232, 242], [321, 23], [242, 123],
	[262, 321], [383, 123], [149, 341], [99, 21], [112, 324],
	[232, 341], [123, 213], [129, 211], [155, 255], [265, 334],
	[112, 421], [444, 44], [41, 441], [177, 121], [423, 34],
	[95, 202], [324, 140], [261, 434], [9, 89], 
	[14, 132], [250, 72], [302, 76], [1, 130], [400, 55],
	[430, 13], [113, 32], [32, 442], [321, 323], [432, 223]];

	//const data = dataJson3;
    const myRef = useRef(null); 

	const width = 500;
	const height = 400;
	var margin = {top: 10, right: 30, bottom: 30, left: 60};

	const drowChart = () => {

		
		var svg = d3.select(myRef.current)
  					.append("svg")
    				.attr("width", width + margin.left + margin.right)
    				.attr("height", height + margin.top + margin.bottom)
  					.append("g")
    				.attr("transform","translate(" + margin.left + "," + margin.top + ")");
        

		var xScale = d3.scaleLinear().domain([0, 450]).range([0, width]);
        var yScale = d3.scaleLinear().domain([0, 500]).range([height, 0]);

		svg.append("g")
         .attr("transform", "translate(0," + height + ")")
		 .style('font-size', 20)
		 .style('color', 'rgb(22, 188, 163)')
         .call(d3.axisBottom(xScale));
        
        svg.append("g")
		    .style('font-size', 20)
			.style('color', 'rgb(22, 188, 163)')
            .call(d3.axisLeft(yScale));

        
        // X label
        svg.append('text')
        .attr('x', width/2)
        .attr('y', height - 15 + 65)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 15)
		.style('fill', 'rgb(204, 204, 204)')
        .text('Independant');
        
        // Y label
        svg.append('text')
		.attr('x', height/2)
        .attr('y', height - 450)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0,' + height  +')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 15)
		.style('fill', 'rgb(204, 204, 204)')
        .text('Dependant');

		
		 svg.append('g')
        .selectAll("dot")
        .data(dataset1)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0]); } )
        .attr("cy", function (d) { return yScale(d[1]); } )
        .attr("r", 4)  
        .style("fill", "rgb(135, 60, 255)");
	
  };

		  
	
	  
    
    useEffect(()=> {
		
		drowChart();
    }, []);

    return (
    <div id="app1">
      	<div id='piechart' ref={myRef}>
      </div>
    </div>
    );
}
