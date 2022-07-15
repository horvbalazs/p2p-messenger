import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.scss";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { AuthTypes } from "./models";
import WebsocketService from "./services/websocket.service";
import { loginWithOAuth } from "./thunks";

const container = document.getElementById("root")!;
const root = createRoot(container);

firebase.initializeApp({
  apiKey: "AIzaSyDGxa_1VfBG1tfGh7kige5W6on_B49RuB8",
  authDomain: "p2pm-frontend.firebaseapp.com",
  projectId: "p2pm-frontend",
  storageBucket: "p2pm-frontend.appspot.com",
  messagingSenderId: "427121465075",
  appId: "1:427121465075:web:b9ae99c47f1cbbe91d0986"
});
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
