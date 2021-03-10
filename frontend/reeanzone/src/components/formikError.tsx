import { ErrorMessage } from "formik";

interface FormikErrorProps {
  type: string;
}

export const FormikError: React.FC<FormikErrorProps> = ({ type }) => {
  return (
    <ErrorMessage name={type}>
      {(errorMessage) => <div style={{ color: "red" }}>{errorMessage}</div>}
    </ErrorMessage>
  );
};
