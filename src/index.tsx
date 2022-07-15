import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.scss";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import WebsocketService from "./services/websocket.service";
import { loginWithOAuth } from "./thunks";
import { FIREBASE_CONFIG } from "./firebase.config";

const container = document.getElementById("root")!;
const root = createRoot(container);

firebase.initializeApp(FIREBASE_CONFIG);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    }
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult: any) => {
      const profile = authResult.additionalUserInfo.profile;
      const ws = WebsocketService.Instance;
      store.dispatch(loginWithOAuth(profile.id, profile.name, ws));
      return true;
    }
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
