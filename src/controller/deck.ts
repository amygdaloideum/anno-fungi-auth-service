import * as jwt from 'jsonwebtoken';
import { ILoginRequestBody } from '../auth.d';
import { events } from '../constants';
import { Deck } from '../models/Deck/Deck';

export const getDecks = (socket: SocketIO.Socket, token: ConstrainDOMString) => {

    /*Deck.find({ username: body.username }, (err, existingAccount) => {
    handleError(socket, err);
    if (existingAccount) {
      socket.emit(events.ERROR, `username ${body.username} is already in use`);
    }
    account.save(err => {
      handleError(socket, err);
      socket.emit(events.REGISTER_SUCCESS);
    });
  });*/
};

const handleError = (socket: SocketIO.Socket, err: any): boolean => {
  if (err) {
    socket.emit(events.ERROR, err);
  }

  return !!err;
};