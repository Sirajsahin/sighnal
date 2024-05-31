import {
  IFormFieldErrorMessages,
  ISelectMenuItemData,
  ReducedErrorMessages,
} from "@/components/ui/interface";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type useFormUtilsReturnType = {
  deduceFormFieldErrors: (
    errorMessages: IFormFieldErrorMessages[],
    fieldError:
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
      | undefined
  ) => ReducedErrorMessages;
  isFormFieldValid: (errorMessages: ReducedErrorMessages) => boolean;
};

export const useFormUtils = (): useFormUtilsReturnType => {
  /* Reduces any form field errors used in react-hook-forms */
  const deduceFormFieldErrors = (
    errorMessages: IFormFieldErrorMessages[],
    fieldError:
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<ISelectMenuItemData>>
      | undefined
  ): ReducedErrorMessages => {
    return errorMessages.reduce((final, err) => {
      if (fieldError?.type === err.type) {
        final[err.type] = err.message;
      }
      return final;
    }, {} as ReducedErrorMessages);
  };

  const isFormFieldValid = (errorMessages: ReducedErrorMessages): boolean => {
    return Object.keys(errorMessages).length === 0;
  };

  /* Redux States Utils Ends */

  return {
    isFormFieldValid,

    deduceFormFieldErrors,
  };
};
