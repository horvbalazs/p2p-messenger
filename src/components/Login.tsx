import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { WebsocketContext } from "../contexts/websocket.context";
import { logInAsGuest } from "../thunks/auth.thunk";

const LoginContainer = styled.div`
  padding-top: 150px;
  display: flex;
  justify-content: center;
`;

function Login() {
  const dispatch = useAppDispatch();
  const websocket = useContext(WebsocketContext);
  const guestId = useAppSelector(state => state.auth).clientId;

  const handleLogin = () => {
    dispatch(logInAsGuest(websocket, guestId));
  };
  return (
    <LoginContainer className="Login">
      <Button variant="contained" size="large" onClick={handleLogin}>
        Continue as Guest
      </Button>
    </LoginContainer>
  );
}

export default Login;
