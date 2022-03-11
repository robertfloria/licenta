import React, {useRef, useState, useEffect} from 'react';
import * as  d3 from 'd3';
import { schemeGnBu } from 'd3';

export default function Chart3 (props) {

    const myRef = useRef(null);

    useEffect(() => {
      
      drowChart();
    },[]);

    const drowChart = () => {

        const data = props.data;   
        const svg = d3.select(myRef.current)
                    .append("svg")  // adauga
                    .attr("width", props.width)
                    .attr("height", props.height);
                    
                    
        const chart = svg.append('g');
        chart.selectAll('.bar')
             .data(props.data)
             .enter()
             .append('rect')
             .classed('bar', true);        
    };

    return (
        <div id="app" ref = {myRef}>
            <div id="chart">
                <svg></svg>
            </div>
            <div id="data">
                <ul></ul>
            </div>
        </div>
    )
}
