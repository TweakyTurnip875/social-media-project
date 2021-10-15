import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";

import '../src/style/main.scss'
import App from '../src/Components/App'

function main() {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  ) 
}

document.addEventListener("DOMContentLoaded", main);
