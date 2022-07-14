import Header from "./components/Header";
import Login from "./components/Login";
import styled from "@emotion/styled";
import AppDrawer from "./components/Drawer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { WebsocketContext } from "./contexts/websocket.context";
import { subscribe } from "./thunks";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Alert, Snackbar } from "@mui/material";
import { AlertTypes } from "./models";
import Messages from "./components/Messages";
import websocketService from "./services/websocket.service";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AppContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
`;

function App() {
  const {auth: { loggedIn }} = useAppSelector((state) => state);
  const { Instance: ws } = websocketService;
  const alert = useAppSelector(state => state.alert);
  const dispatch = useAppDispatch();
  ws.onopen = () => {
    dispatch(subscribe(ws));
  };

  const handleClose = () => {
    dispatch({
      type: AlertTypes.HIDE,
    })
  }

  return (
    <AppContainer className="App">
      {ws ?
      <ThemeProvider theme={darkTheme}>
        <WebsocketContext.Provider value={ws}>
          <Header />
          {!loggedIn ? <Login /> : <ContentContainer>
            <AppDrawer />
            <Messages />
          </ContentContainer>}
          <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </WebsocketContext.Provider>
      </ThemeProvider> : <></>}
    </AppContainer>
  );
}

export default App;
