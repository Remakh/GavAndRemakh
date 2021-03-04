import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { createConnection } from "typeorm";
// import { User } from "./entities/User";
import session from "express-session";
import ConnectPg from "connect-pg-simple";
import { COOKIE_NAME } from "./consts/consts";

const main = async () => {
  const app = express();

  app.use(
    session({
      store: new (ConnectPg(session))(),
      secret: "secret",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
      },
    })
  );
  await createConnection();

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
