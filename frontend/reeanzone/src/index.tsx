import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Register from "./Register";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8888/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <React.StrictMode>
        <Register />
      </React.StrictMode>
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
