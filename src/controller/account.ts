import { ILoginRequestBody } from '../auth.d';
import { events } from '../constants';
import { Account } from '../models/Account';

export const register = (socket: SocketIO.Socket, body: ILoginRequestBody) => {
  const account = new Account({
    username: body.username,
    password: body.password
  });

  Account.findOne({ username: body.username }, (err, existingAccount) => {
    handleError(socket, err);
    if (existingAccount) {
      socket.emit(events.ERROR, `username ${body.username} is already in use`);
    }
    account.save(err => {
      handleError(socket, err);
      socket.emit(events.REGISTER_SUCCESS);
    });
  });
};

export const login = (socket: SocketIO.Socket, body: ILoginRequestBody) => {

};

const handleError = (socket: SocketIO.Socket, err: any): boolean => {
  if (err) {
    socket.emit(events.ERROR, err);
  }

  return !!err;
};