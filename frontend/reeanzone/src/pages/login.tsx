import { useApolloClient } from "@apollo/client";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormikError } from "../components/formikError";
import NavbarLayout from "../components/navbarLayout";
import { useLoginMutation } from "../generated/graphql";
import { convertApiErrorToFormik } from "../util/apiErrorToFormik";

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const history = useHistory();
  const apolloClient = useApolloClient();

  return (
    <NavbarLayout>
      <Box width={800} mx="auto">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ variables: { ...values } });

            if (response.data?.login.errors) {
              const errorMap = convertApiErrorToFormik(
                response.data.login.errors
              );
              setErrors(errorMap);
              return;
            }
            apolloClient.resetStore();
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
                <FormikError type="username" />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...formik.getFieldProps("password")}
                  placeholder="Password"
                  type="password"
                />
                <FormikError type="password" />
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
