import { connect, disconnect } from "mongoose";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

async function run(): Promise<void> {
  connect(`${process.env.URI_DB}`)
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
