import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
// import 'core-js/stable/index.js'  for Map, Set... can import only specific parts i need
import 'regenerator-runtime/runtime.js'// need for async await

import PromisePolyfill from 'promise-polyfill';

if (!window.Promise) { // to make promise work in IE
  window.Promise = PromisePolyfill;
}

const el = document.getElementById("app");

ReactDOM.createRoot(el).render(<App />);  // This is the new API