const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });

const app = require('./app.js');

let DB = '';

console.log(process.env.NODE_ENV, process.env.DATABASE_LOCAL);

if (process.env.NODE_ENV === 'development') {
  // DB = process.env.DATABASE_LOCAL.replace(
  //   '<password>',
  //   process.env.DATABASE_PASSWORD
  // );
  DB = process.env.DATABASE;
} else if (process.env.NODE_ENV === 'production') {
  DB = process.env.DATABASE_LOCAL.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);

    console.log(`Database connected on: ${conn.connection.host}`.black.bgGreen);
  } catch (err) {
    console.log(`Error: ${err.message} ❌❌❌`.white.bgRed);
    process.exit(1);
  }
};

connectDB();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`App connected on port: ${port}`.cyan);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Server shutting down 💣💣💣');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM CALL! Shutdown gracefully ✌✌✌');
  server.close(() => {
    console.log('Process terminated 👍👍👍');
  });
});
