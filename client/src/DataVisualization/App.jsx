import React, {Component, useState} from 'react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import AllCharts from './AllCharts';
import Chart5 from './Chart5';
import '../App.css';

import ReactComponent from './Experimental/ChartTest';

export default function App () {

    const [margin, setMargin] = useState({top: 20, bottom: 10});
    const [width3, setWidth3] = useState(750);
    const [height3, setHeight3] = useState(400 - margin.top - margin.bottom);
    

    return (
      <div>
           <AllCharts />
           
      </div>
    );
}
//<Chart1 data={data} width={width} height={height} />
//<Chart2 data={data2} width={width} height={height} />
//<Chart3 data={data3} width={width3} height={height3} />
//<Chart3 data={data3} width={width3} height={height3} margin={margin} />
// <Chart4 />
// <Chart5 />