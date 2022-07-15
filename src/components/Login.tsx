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

const ButtonContainer = styled.div`
  display: flex;
  max-width: 200px;
  flex-direction: column;
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
      <ButtonContainer>
        <Button variant="contained" size="large" onClick={handleLogin}>
          Continue as Guest
        </Button>
        <div id="firebaseui-auth-container"></div>
      </ButtonContainer>
    </LoginContainer>
  );
}

export default Login;
