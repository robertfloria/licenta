import React, {useRef, useState, useEffect} from 'react';
import * as  d3 from 'd3';

export default function BarChart (props) {

    const myRef = useRef(null);

    useEffect(() => {
      
      drowChart();
    });

    const drowChart = () => {

      const data = props.data;   
      const svg = d3.select(myRef.current)
                    .append("svg")
                    .attr("width", props.width)
                    .attr("height", props.height);
                    
      svg.selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - 10 * d)
         .attr("width", 65)
         .attr("height", (d, i) => d * 10)
         .attr("fill", "green");
  
      svg.selectAll("text")
         .data(data)
         .enter()
         .append("text")
         .text((d) => d)
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - (10 * d) - 3); 
    };

    return (
      <div ref = {myRef}></div>
    )
}



/*
    const drowChart = () => {

      const data = props.data;   
      const svg = d3.select(myRef.current)
                    .append("svg")
                    .attr("width", props.width)
                    .attr("height", props.height);
                    
      svg.selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - 10 * d)
         .attr("width", 65)
         .attr("height", (d, i) => d * 10)
         .attr("fill", "green");
  
      svg.selectAll("text")
         .data(data)
         .enter()
         .append("text")
         .text((d) => d)
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - (10 * d) - 3); 
    };
*/