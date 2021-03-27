import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarLayout from "./components/navbarLayout";
import Login from "./pages/login";
import Register from "./pages/register";
import ProductImageCarousel from "./components/productImageCarousel";
import { RestLink } from "apollo-link-rest";
import Product from "./pages/product";

const urls = new RestLink({
  uri: "http://localhost:8888/graphql",
  endpoints: {
    user: "http://localhost:8888/graphql",
    product: "http://localhost:8887/graphql",
  },
});
const client = new ApolloClient({
  uri: "http://localhost:8887/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <Switch>
            <Route exact path="/">
              <NavbarLayout children={null} />
            </Route>

            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/test">
              <Product />
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
