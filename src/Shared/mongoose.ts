import { connect, disconnect } from 'mongoose';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.set('strictQuery', false);

async function run(): Promise<void> {
  connect(`${process.env.URI_DB}`, options)
    .then(() => {
      console.log(`Database is ready`);
    })
    .catch((err) => {
      console.log(`Holy s***, troubles! ${err}`);
    });
}

async function stop(): Promise<void> {
  disconnect()
    .then(() => {
      console.log(`Database is disconnected`);
    })
    .catch((err) => {
      console.log(`Holy s***, troubles! ${err}`);
    });
}

export default { run, stop };
