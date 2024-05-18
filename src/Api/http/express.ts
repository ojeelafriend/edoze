import express from "express";
import { ApolloServer } from "@apollo/server";

const app = express();

app.use(
  express.json({ limit: "50mb" }),
  express.urlencoded({ extended: false })
);
app.use(express.static("./public"));

// injection routes.
//here...

export default app;
