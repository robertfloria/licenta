import React, {Component, useState} from 'react';
import BarChart from './Chart1';
import '../App.css';

export default function App () {
    const [data, setData] = useState([12, 5, 6, 6, 9, 10]);
    const [width, setWidth] = useState("700");
    const [height, setHeight] = useState("400");

    return (
      <div className="App">
          <BarChart data={data} width={width} height={height} />
      </div>
    );
}
