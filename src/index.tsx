import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.scss";
import firebase from 'firebase/compat/app';
import { FIREBASE_CONFIG } from "./firebase.config";

const container = document.getElementById("root")!;
const root = createRoot(container);
firebase.initializeApp(FIREBASE_CONFIG);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
