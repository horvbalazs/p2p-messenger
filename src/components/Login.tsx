import { Button } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WebsocketContext } from "../contexts/websocket.context";
import { logInAsGuest } from "../thunks/auth.thunk";

function Login() {
  const dispatch = useAppDispatch();
  const websocket = useContext(WebsocketContext);
  const guestId = useAppSelector(state => state.auth).clientId;

  const handleLogin = () => {
    dispatch(logInAsGuest(websocket, guestId));
  };
  return (
    <div className="Login">
      <Button variant="contained" size="large" onClick={handleLogin}>
        Continue as Guest
      </Button>
    </div>
  );
}

export default Login;
