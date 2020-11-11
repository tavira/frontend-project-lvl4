import Emitter from 'component-emitter';
import SocketIoClient from './socket.io-client';


class SocketIoServer extends Emitter {
  constructor() {
    super();
    this.socketIoClient = new SocketIoClient(this);
  }
}

export default SocketIoServer;
