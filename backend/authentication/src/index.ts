import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import {createConnection} from "typeorm";
import { User } from "./entities/User";




const main = async () => {
  const app = express();
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "remakh",
    password: "password",
    database: "gavBase",
    synchronize: true,
    logging: false,
    entities: [
      User
    ]
})

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(8888);
};

main();
