import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";

import graphqlServer from "./http/graphql/server";
import { checkArgv } from "./util/argv";
import db from "../Shared/mongoose";
import App from "./http/express";

dotenv.config();

const type = checkArgv();

type === "rest"
  ? App.listen(process.env.EDOZE_PORT, async () => {
      console.log(
        `Server REST is ready on http://localhost:${process.env.EDOZE_PORT}`
      );
      await db.run();
    })
  : startStandaloneServer(graphqlServer, { listen: { port: 4000 } }).then(
      async ({ url }) => {
        console.log(`Server graphql is ready on ${url}`);
        await db.run();
      }
    );
