class WebsocketService {
  private static _instance: WebSocket;

  public static get Instance(): WebSocket {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new WebSocket("ws://localhost:7071/ws");
    return this._instance;
  }

  public static reset(): WebSocket {
    this._instance = new WebSocket("ws://localhost:7071/ws");
    return this._instance;
  }
}

export default WebsocketService;