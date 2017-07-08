import * as jwt from 'jsonwebtoken';
import { ILoginRequestBody } from '../auth.d';
import { events } from '../constants';
import { Account } from '../models/Account/Account';

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

export const login = (socket: SocketIO.Socket, body: ILoginRequestBody, successCallback: Function) => {
  Account.findOne({ username: body.username }, (err, account) => {
    handleError(socket, err);
    if (!account) {
      socket.emit(events.ERROR, `user ${body.username} not found`);
      return;
    }
    account.comparePassword(body.password, (err, isMatch) => {
      if(!isMatch) {
        socket.emit(events.ERROR, `incorrect password`);
      } else {
        const tokenData = {
          userId: account.userId,
          username: account.username,
        };
        const token = jwt.sign(tokenData, 'secret');
        socket.emit(events.LOGIN_SUCCESS, { token });
        successCallback(token);
        console.log(`user ${account.username} signed in and recieved token ${token}`);
      }
    });
  });
};

const handleError = (socket: SocketIO.Socket, err: any): boolean => {
  if (err) {
    socket.emit(events.ERROR, err);
  }

  return !!err;
};