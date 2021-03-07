import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import NavbarLayout from "../components/navbarLayout";
import { useLoginMutation } from "../generated/graphql";

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const history = useHistory();
  return (
    <NavbarLayout>
      <Box width={800} mx="auto">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ variables: { ...values } });

            if (!response.data?.login.success) {
              let message = "";
              if (response.data?.login.message) {
                message = response.data?.login.message;
              }
              setErrors({ password: message });
              return;
            }

            history.push("/");
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
                <ErrorMessage name="username">
                  {(errorMessage) => (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </ErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  type="password"
                />
                <ErrorMessage name="password">
                  {(errorMessage) => (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </ErrorMessage>
              </FormControl>

              <Button mt={2} type="submit" isLoading={loading}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </NavbarLayout>
  );
};

export default Login;
