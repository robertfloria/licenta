import React, {Component, useState} from 'react';
import '../App.css';

export default function App () {

    const [margin, setMargin] = useState({top: 20, bottom: 10});
    const [width3, setWidth3] = useState(750);
    const [height3, setHeight3] = useState(400 - margin.top - margin.bottom);   

    return (
      <div>
             
      </div>
    );
}
