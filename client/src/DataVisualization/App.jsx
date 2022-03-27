import React, {Component, useState} from 'react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Chart5 from './Chart5';

import ReactComponent from './Experimental/ChartTest';

export default function App () {
    const [data, setData] = useState([21,4,12,6,3,12,16,19,1,2,16,2,5,6]);
    const [data2, setData2] = useState([22,12,5,2,3,12,5,16,14,11,7,2,3,5,2,1,8,9]);
    const [width, setWidth] = useState("1350");
    const [height, setHeight] = useState("250");

    const [data3, setData3] = useState([
      {id: 'd1', region: 'USA', value: 17},
      {id: 'd2', region: 'India', value: 12},
      {id: 'd3', region: 'China', value: 17},
      {id: 'd4', region: 'Germany', value: 6},
      {id: 'd5', region: 'Romania', value: 2},
      {id: 'd6', region: 'France', value: 6},
      {id: 'd7', region: 'SUA', value: 16},
      {id: 'd8', region: 'Japan', value: 10},
      {id: 'd9', region: 'Spain', value: 5},
      {id: 'd10', region: 'Italy', value: 5},
      {id: 'd11', region: 'Holand', value: 4},
      {id: 'd12', region: 'Brasil', value: 7},
      {id: 'd13', region: 'Australia', value: 7},
      {id: 'd14', region: 'Canada', value: 17},
      {id: 'd15', region: 'Argentina', value: 11},
      {id: 'd16', region: 'Kazakhstan', value: 11},
      {id: 'd17', region: 'Antarctica', value: 19}
    ]);

    const [margin, setMargin] = useState({top: 20, bottom: 10});
    const [width3, setWidth3] = useState(750);
    const [height3, setHeight3] = useState(400 - margin.top - margin.bottom);
    

    return (
      <div>
           <Chart5 />
           
      </div>
    );
}
//<Chart1 data={data} width={width} height={height} />
//<Chart2 data={data2} width={width} height={height} />
//<Chart3 data={data3} width={width3} height={height3} />
//<Chart3 data={data3} width={width3} height={height3} margin={margin} />
// <Chart4 />