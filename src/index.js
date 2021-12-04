import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import './index.css';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
