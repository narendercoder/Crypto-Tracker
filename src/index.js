import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./cryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
ReactDOM.render(
<CryptoContext>
  <BrowserRouter>
   <App />
   </BrowserRouter>
   </CryptoContext>
,
document.getElementById("root")

)
