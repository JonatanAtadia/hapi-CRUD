import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost/testdb')
  .then((db) => console.log('Db is connected'))
  .catch((err) => console.log(err));
