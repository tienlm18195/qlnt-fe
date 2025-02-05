import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, RouterProvider, createBrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "*",
    Component: App,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
