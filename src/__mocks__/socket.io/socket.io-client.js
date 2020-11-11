import Emitter from 'component-emitter';

class SocketIoClient extends Emitter {
  constructor(socketIoServer) {
    super();
    this.socketIoServer = socketIoServer;
  }

  // eslint-disable-next-line class-methods-use-this
  on(event, fn) {
    Emitter.prototype.on(event, fn);
  }
}

export default SocketIoClient;
