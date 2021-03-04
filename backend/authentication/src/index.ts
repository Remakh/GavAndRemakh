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
  await createConnection();

  const app = express();

  const postgresqlConnection = {
    host: "localhost",
    port: 5432,
    user: "remakh",
    password: "password",
    database: "gavbase",
  };

  app.use(
    session({
      store: new (ConnectPg(session))({
        conObject: postgresqlConnection,
      }),
      name: COOKIE_NAME,
      secret: "reean and gav secret",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(8888);
};

main();
