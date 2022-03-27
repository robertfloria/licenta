import React, {useRef, useState, useEffect} from 'react';
import * as  d3 from 'd3';

export default function Chart1 (props) {

    const myRef = useRef(null);

    useEffect(() => {
      
        drowChart();
    },[]);

    const drowChart = () => {

      const data = props.data;   
      const svg = d3.select(myRef.current)
                    .append("svg")
                    .attr("width", props.width)
                    .attr("height", props.height)
                    .style("background-color","rgba(12, 12, 12, 0.897)")
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
         .attr("y", (d, i) => props.height - 11 * d)
         .attr("width", 60)
         .attr("height", (d, i) => d * 14)
         .attr("fill", (d, i) => d <= 5 ? "red" : "rgba(226, 53, 0, 0.938)");
  
      svg.selectAll("text")
         .data(data)
         .enter()
         .append("text")
         .text((d) => d)
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => props.height - (11 * d) - 3)
         .attr("fill", "white"); 
    };

    return (
      <div ref = {myRef}></div>
    )
}
