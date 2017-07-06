import * as mongoose from 'mongoose';

// mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
db.once('open', () => {
  console.log('database connection established');
  const accountSchema = new mongoose.Schema({
    id: String
  });
});