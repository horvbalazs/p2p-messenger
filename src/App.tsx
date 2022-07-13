import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header";
import Login from "./components/Login";
import { WebsocketContext } from "./contexts/websocket.context";
import { connect, subscribe } from "./thunks";


function App() {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const dispatch = useAppDispatch();
  const ws = new WebSocket("ws://localhost:7071/ws");
  ws.onopen = () => {
    dispatch(connect(ws));
    dispatch(subscribe(ws));
  };

  return (
    <div className="App">
      <WebsocketContext.Provider value={ws}>
        <Header />
        {!loggedIn ? <Login /> : <span></span>}
      </WebsocketContext.Provider>
    </div>
  );
}

export default App;
