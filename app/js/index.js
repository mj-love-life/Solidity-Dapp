import React from 'react';
import { render } from 'react-dom';
import eth from './getWeb3';
import App2 from './lib/App2';



let temp2 = <App2 web3 = {eth.web3} todo={eth.todo2} />;


render(
  temp2,
  document.getElementById('test')
);

const jump1 = () => {
    document.getElementById('app').style.display = 'none';
};

const dis = () => {
    document.getElementById('app').style.display = '';
};