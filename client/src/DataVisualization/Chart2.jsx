import React, {useRef, useState, useEffect} from 'react';
import * as  d3 from 'd3';

export default function Chart2 (props) {

    const myRef = useRef(null);

    useEffect(() => {
      
        drowChart();
    },[]);

    const drowChart = () => {

      const data = props.data;   
      const svg = d3.select(myRef.current)    //<svg> element is a container for SVG graphics. SVG has several methods for drawing paths, boxes, circles, text, and graphic images.
                    .append("svg")
                    .attr("width", props.width)
                    .attr("height", props.height)
                    .style("background-color","rgba(0, 0, 0, 0.53)")
                    .style("padding-left",60)
                    .style("padding-right",60)  
                    .style("padding-bottom",60)                                           
                    .style("position","static")
                    .style("display","flex")
                    .style("margin-left",0);
                    
      svg.selectAll("rect") // rect = rectangular
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - 10 * d)
         .attr("width", 60)
         .attr("height", (d, i) => d * 10)         
         .attr("fill", (d, i) => d <= 5 ? "rgba(78, 0, 204, 0.685)" : "rgba(155, 155, 155, 0.849)");
  
      svg.selectAll("text")
         .data(data)
         .enter()
         .append("text")
         .text((d) => d)
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - (10 * d) - 3)
         .attr("fill","white"); 
    };

    return (
      <div ref = {myRef}></div>
    )
}
