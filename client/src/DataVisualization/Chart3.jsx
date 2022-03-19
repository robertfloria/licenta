import React, {useRef, useState, useEffect} from 'react';
import * as  d3 from 'd3';
import './D3.css';

export default function Chart3 (props) {

    const myRef = useRef(null);
    let selectedData = props.data;
    let unselectedIds = []; 
    const x = d3.scaleBand().rangeRound([0, props.width]).padding(0.3);
    const y = d3.scaleLinear().range([props.height, 0]);
    

    useEffect(() => {
      
      drowChart();
    },[]);

    const drowChart = () => {
                 
        const svg = d3.select(myRef.current)
                    .append("svg")  // adauga
                    .attr("width", props.width)
                    .attr("height", props.height + props.margin.top + props.margin.bottom);
                    
        x.domain(props.data.map((d) => d.region));   //transforms array of object into array of strings
        y.domain([0, d3.max(props.data, (d) => d.value) + 3]);
        
        const chart = svg.append('g'); // ce se afla in interiorul svg-ului, patratului
        
        chart.append('g')
             .call(d3.axisBottom(x).tickSizeOuter(0)) // extract data in x and put at the bottom; install d3-axis
             .attr('transform',`translate(0, ${props.height})`)  //move the axis down
             .attr('color','black');
             
        function renderChart() {

            chart.selectAll('.bar')
                 .data(selectedData, (data) => data.id)
                 .enter()
                 .append('rect')
                 //.classed('bar', true)
                 .attr("width", x.bandwidth())
                 .attr("height", (data) => props.height - y(data.value))
                 .attr('x', (data) => x(data.region))
                 .attr('y', (data) => y(data.value))       
                 .attr("fill", (data, i) => {
                     if(data.value < 3)
                        return "rgba(145, 0, 198, 0.932)";
                     else
                        if(data.value >= 3 && data.value <=5)
                            return "rgba(128, 105, 30, 0.932)";
                    else
                        if(data.value > 5 && data.value <=9)
                            return "rgba(20, 0, 236, 0.483)";
                    else
                        if(data.value > 9 && data.value <=12)
                            return "rgba(4, 0, 52, 0.7)";
                    else
                        if(data.value > 12)
                            return "rgba(64, 0, 226, 0.932)";           
                    });
  
            

            chart.selectAll('.bar') // for removing data when we unselect
                 .data(selectedData, (data) => data.id)
                 .enter()
                 .exit()
                 .remove();

            chart.selectAll('.label')
                 .data(selectedData, (data) => data.id)
                 .enter()
                 .append('text')
                 .text((data) => data.value)
                 .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
                 .attr('y', (data) => y(data.value) - 10)
                 .attr('text-anchor', 'middle')
                 .classed('label', true);           

            chart.selectAll('.label') // for removing data when we unselect
                 .data(selectedData, (data) => data.id)
                 .enter()
                 .exit()
                 .remove();
        }
                   
        renderChart();      
        
        const listItems = d3.select('#data')
                            .select('ul')                           
                            .selectAll('li')
                            .data(props.data)
                            .enter()                          
                            .append('li');
                            
        listItems.append('span')
                 .text((data) => data.region);

        listItems.append('input')
                 .attr('type', 'checkbox')
                 .attr('checked', true)
                 .on('change', (data) => {                          // eventListener
                    if (unselectedIds.indexOf(data.id) === -1){
                        unselectedIds.push(data.id); 
                    } else {
                        unselectedIds = unselectedIds.filter((id) => id !== data.id);
                    }
                    
                    selectedData = props.data.filter(
                        (d) => unselectedIds.indexOf(d.id) === -1
                    );
                    
                    renderChart();   
                });
    }

    return (
        <div id="app">
            <div id="chart" ref = {myRef}></div>
            <div id="data">
                <ul></ul>
            </div>
        </div>
    );
}
