import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
// import { User } from "./entities/User";
import cors from "cors";
import { ProductResolver } from "./resolvers/productResolver";

const main = async () => {
  await createConnection();

  const app = express();

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(8887);
};

main();
