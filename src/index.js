import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

//const appId = "nKfyEf0x0ruK7MbNybUUbxECp4fAoFdOMUP8E1Ms";

//const serverUrl = "https://pgd0qtzhcwsq.usemoralis.com:2053/server";
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={process.env.REACT_APP_serverUrl} appId={process.env.REACT_APP_appId}>
    <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
