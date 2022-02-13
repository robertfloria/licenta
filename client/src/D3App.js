import './App.css';
import React from 'react';
import * as  d3 from 'd3';
import { schemeBrBG } from 'd3';

class D3App extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    
    //this.dataset = [];
    /*for(var i = 0; i < 100; i++){
      this.dataset[i] = i; 
    }*/
    //this.dataset = [100, 200, 300, 400, 500];
    
  }
  componentDidMount(){
    d3.select('div')
    .selectAll('p')
    .data([1, 2 ,3])
    .enter()
    .append('p')
    .text(dta => dta);
  }
  render(){
    
  return (
    <div ref={this.myRef}></div>
  );
  }
}

export default D3App;
