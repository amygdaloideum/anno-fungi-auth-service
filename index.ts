import * as mongoose from 'mongoose';
import * as socketIo from 'socket.io';
import { validateToken } from './src/auth';
import { ILoginRequestBody } from './src/auth.d';
import { events } from './src/constants';
import { login, register } from './src/controller/account';
import { getDecks } from './src/controller/deck';

const PORT = 8097;

// connect mongoose
// mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
db.once('open', () => {
  console.log('connected to mongoDB');
});

// setup socket.io

const io = socketIo.listen(PORT);
console.log(`server listening at port ${PORT}`);

io.sockets.on('connection', socket => {
  console.log(`client ${socket.id} connected`);
  const auth: { token: string } = { token: '' };

  socket.on(events.LOGIN, (body: ILoginRequestBody) => {
    login(socket, body, (token: string) => {
      auth.token = token;
    });
  });

  socket.on(events.REGISTER, (body: ILoginRequestBody) => {
    register(socket, body);
  });

  socket.on(events.GET_DECKS, (token: string) => {
    getDecks(socket, token);
  });
});