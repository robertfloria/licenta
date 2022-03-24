import React, {useRef, useState, useEffect, useCallback} from 'react';
import * as  d3 from 'd3';
import './D3chart4.css';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

export default function Chart4 (props) {
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
      const [data2, setData2] = useState([22,12,5,2,3,12,5,16,14,11,7,2,3,5,2,1,8,9]);
      const [width, setWidth] = useState("1350");
      const [height, setHeight] = useState("250");
      const [margin, setMargin] = useState({top: 20, bottom: 10});
      const [width3, setWidth3] = useState(750);
      const [height3, setHeight3] = useState(400 - margin.top - margin.bottom);

    return (
    <div class="wrapper">
        <div class="one">
            <Chart3 data={data3} width={width3} height={height3} margin={margin} />
        </div>
        <div class="two">Two</div>
        <div class="three">
            <Chart2 data={data2} width={width} height={height} />
        </div>
        <div class="four">Four</div>
    </div>
    );
}
