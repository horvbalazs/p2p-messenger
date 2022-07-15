import styled from "@emotion/styled";
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "../app/hooks";
import { WebsocketContext } from "../contexts/websocket.context";
import { authenticateWithOauth, login } from "../thunks/auth.thunk";

const LoginContainer = styled.div`
  padding-top: 150px;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 350px;
  gap: 10px;
  flex-direction: column;
`;

function Login() {
  const dispatch = useAppDispatch();
  const websocket = useContext(WebsocketContext);

  const handleLogin = () => {
      dispatch(login(websocket));
  };

  const handleLoginWithOAuth = () => {
    dispatch(authenticateWithOauth(websocket));
  }

  return (
    <LoginContainer className="Login">
      <ButtonContainer>
        <Button variant="contained" size="large" onClick={handleLogin} startIcon={<PersonIcon />}>
          Continue as Guest
        </Button>
        <Button variant="contained" size="large" onClick={handleLoginWithOAuth} startIcon={<GoogleIcon />} color="error">
          Sign in with Google
        </Button>
      </ButtonContainer>
    </LoginContainer>
  );
}

export default Login;
