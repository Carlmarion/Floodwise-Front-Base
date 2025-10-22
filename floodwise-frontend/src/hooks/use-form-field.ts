import * as React from "react";
import { useFormContext, useFormState } from "react-hook-form";

type FormFieldContextValue = {
  name: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used withing <FormField>");
  }

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

export { FormFieldContext };
