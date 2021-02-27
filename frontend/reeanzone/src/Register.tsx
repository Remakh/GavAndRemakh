import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

const Register = () => {
  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={(values) => console.log(values)}
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

            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
