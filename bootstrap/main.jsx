import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";

import '../src/static/style/index.css'
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
