import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormikError } from "../components/formikError";
import NavbarLayout from "../components/navbarLayout";
import { useRegisterMutation } from "../generated/graphql";
import { convertApiErrorToFormik } from "../util/apiErrorToFormik";

const Register = () => {
  const [register, { loading }] = useRegisterMutation();
  const history = useHistory();

  return (
    <NavbarLayout>
      <Box width={800} mx="auto">
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await register({ variables: { ...values } });

            if (response.data?.register.errors) {
              const errors = convertApiErrorToFormik(
                response.data.register.errors
              );
              setErrors(errors);
              return;
            }

            history.push("/login");
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
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...formik.getFieldProps("email")} placeholder="email" />
                <FormikError type="email" />
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

              <Button isLoading={loading} mt={2} type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </NavbarLayout>
  );
};

export default Register;
