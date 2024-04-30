import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/intialState";
import reducer from "./context/reducer";
import { Toaster } from "sonner";

import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_URI}/api/v1`;
axios.defaults.headers.common["Authorization"] = "Auth Token";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </StateProvider>
  </React.StrictMode>
);
reportWebVitals();
