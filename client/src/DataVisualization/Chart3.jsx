import React, {useRef, useState, useEffect, useCallback} from 'react';
import * as  d3 from 'd3';
import '../App.css';

export default function Chart3 (props) {

    const myRef = useRef(null); 
    const x = d3.scaleBand().rangeRound([0, props.width]).padding(0.30);
    const y = d3.scaleLinear().range([props.height, 0]);
    let selectedData = props.data;


    const drowChart = () => {
        
        const svg = d3.select(myRef.current)
                    .append("svg")  // adauga
                    .attr("width", props.width)
                    .attr("height", props.height + props.margin.top + props.margin.bottom).attr('overflow','scroll');
                    
        x.domain(props.data.map((d) => d.region));   //transforms array of object into array of strings
        y.domain([0, d3.max(props.data, (d) => d.value) + 2]);
        
        const chart = svg.append('g'); // ce se afla in interiorul svg-ului, patratului The <g> SVG element is a container used to group other SVG elements.
                         
        chart.append('g')
             .call(d3.axisBottom(x).tickSizeOuter(18)) // extract data in x and put at the bottom; install d3-axis
             .attr('transform',`translate(0, ${props.height + 2})`)  //move the axis down
             .attr('color','#cdcdcd')
             .style('font-weight','bold')
             .style('font-size','0.15cm');
             
             
        const renderChart = () => {

            chart.selectAll('rect')
                 .data(selectedData, data => data.id)
                 .enter()
                 .append('rect')
                 .attr("width", x.bandwidth())
                 .attr("height", (data) => props.height - y(data.value))
                 .attr('x', (data) => x(data.region))
                 .attr('y', (data) => y(data.value))       
                 .attr("fill", (data, i) => {
                     if(data.value < 3)
                        return "rgba(136, 132, 160, 0.693)";
                     else
                        if(data.value >= 3 && data.value <=5)
                            return "#ff863bf5";
                    else
                        if(data.value > 5 && data.value <=9)
                            return "#c2c2c2";
                    else
                        if(data.value > 9 && data.value <=12)
                            return "#e90000f5";
                    else
                        if(data.value > 12)
                            return "rgba(86, 56, 255, 0.975)";           
                    });             

            chart.selectAll('rect') // for removing data when we unselect
                 .data(selectedData, data => data.id)
                 .exit()
                 .remove();

            chart.selectAll('.label')
                 .data(selectedData, data => data.id)
                 .enter()
                 .append('text')
                 .text((data) => data.value)
                 .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
                 .attr('y', (data) => y(data.value) - 10)
                 .attr('text-anchor', 'middle')
                 .classed('label', true);           

            chart.selectAll('.label') // for removing data when we unselect
                 .data(selectedData, data => data.id)
                 .exit()
                 .remove();
        };
                   
        renderChart();                        
        let unselectedIds = []; 

        const listItems = d3.select('#data')
                            .select('ul')                           
                            .selectAll('li')
                            .data(props.data)
                            .enter()                          
                            .append('li');
 
        listItems.append('span')
                 .text((data) => data.region)
                 .style('font-size','0.3cm');

        listItems.append('input')
                 .attr('type', 'checkbox')
                 .attr('checked', true)
                 .attr('id', (data) => data.id)
                 .on('change', (data) => {                          // eventListener
                    if (unselectedIds.indexOf(data.target.id) === -1){
                        unselectedIds.push(data.target.id);
                    } else {
                        unselectedIds = unselectedIds.filter((id) => id !== data.target.id);
                    }
                    
                    selectedData = props.data.filter(
                        (d) => unselectedIds.indexOf(d.id) === -1
                    );
                                 
                    renderChart();   
                });
    };
 
    useEffect(() => {

        drowChart();
      },[drowChart]);

    return (
        <div id="app">
            <div id="chart" ref = {myRef}></div>
            <div id="data">
                <ul></ul>
            </div>
        </div>
    );
}
