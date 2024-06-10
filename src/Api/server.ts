import dotenv from "dotenv";

import { startApolloServer } from "./http/graphql/server";
import db from "../Shared/mongoose";

dotenv.config();

startApolloServer().then(async (url) => {
  console.log(`Server is ready ${url}`);
  await db.run();
});
