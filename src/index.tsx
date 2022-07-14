import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

const ws = new WebSocket("ws://localhost:7071/ws");

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App ws={ws}/>
    </Provider>
  </React.StrictMode>
);
