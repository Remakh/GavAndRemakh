import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import NavbarLayout from "../components/navbarLayout";
import {
  RegisterMutationVariables,
  useRegisterMutation,
} from "../generated/graphql";

const Login = () => {
  const [register] = useRegisterMutation();
  return (
    <NavbarLayout>
      <Box width={800} mx="auto">
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={(values) => {
            console.log(values);
            register({ variables: { ...values } });
          }}
        >
          {(formik) => (
            <Form>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  {...formik.getFieldProps("username")}
                  placeholder="Username"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  type="password"
                />
              </FormControl>

              <Button type="submit">Login</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </NavbarLayout>
  );
};

export default Login;
