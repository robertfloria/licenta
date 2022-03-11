import React, {Component, useState} from 'react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import './D3.css';
import ReactComponent from './Experimental/ChartTest';

export default function App () {
    const [data, setData] = useState([21,4,12,6,3,12,16,19,1,2,16,2,5,6]);
    const [data2, setData2] = useState([22,12,5,2,3,12,5,16,14,11,7,2,3,5,2,1,8,9]);
    const [width, setWidth] = useState("1350");
    const [height, setHeight] = useState("250");

    const [data3, setData3] = useState([
      {id: 'd1', region: 'USA', value: 10},
      {id: 'd2', region: 'India', value: 12},
      {id: 'd3', region: 'China', value: 11},
      {id: 'd4', region: 'Germany', value: 6}
    ]);
    const [width3, setWidth3] = useState(600);
    const [height3, setHeight3] = useState(400);

    return (
      <div className="App12">
           <Chart3 data={data3} width={width3} height={height3} />     
      </div>
    );
}
//<Chart1 data={data} width={width} height={height} />
//<Chart2 data={data2} width={width} height={height} />
//<Chart3 data={data3} width={width3} height={height3} />
//<ReactComponent /> 