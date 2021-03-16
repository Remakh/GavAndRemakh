import { UserErrors } from "../generated/graphql";

export const convertApiErrorToFormik = (apiErrors: UserErrors[]) => {
  const errorMap: Record<string, string> = {};
  apiErrors.forEach(({ type, message }) => {
    errorMap[type] = message;
  });

  return errorMap;
};
