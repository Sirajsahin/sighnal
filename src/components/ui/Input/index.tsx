import clsx from "clsx";

import FormFieldErrors from "@/components/ui/Reusable/FromFiledError";
import { IInput } from "@/components/ui/interface";
import { useFormUtils } from "@/app/hooks/useFormUtils";

const Input: React.FC<IInput> = ({
  fieldError,
  errorMessages,
  className,
  register,
  ...props
}) => {
  const { deduceFormFieldErrors, isFormFieldValid } = useFormUtils();
  const fieldErrorLite = fieldError ? fieldError : null;
  const reducedErrorMessages = deduceFormFieldErrors(
    errorMessages,
    fieldErrorLite
  );

  const isValid = isFormFieldValid(reducedErrorMessages);

  return (
    <div className={clsx("", className)}>
      <div className="w-full relative mt-2 flex justify-start items-center rounded-md shadow-sm border ">
        {props?.startIcon && (
          <div className="pointer-events-none  inset-y-0 left-0 flex justify-center items-center pl-2 pr-2">
            {props?.startIcon}
          </div>
        )}
        <input
          {...register}
          {...props}
          autoComplete="false"
          autoCorrect="false"
          className={clsx(
            ` border-0 py-1.5 p-2 ring-1 ring-inset text-xs  focus:ring-2 focus:ring-inset disabled:bg-gray-200 disabled:text-gray-600  sm:leading-6 w-full ${props?.inputClassName}`,
            isValid
              ? `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 w-full `
              : `text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-600`,
            props?.startIcon
              ? "rounded-r-md"
              : props?.endIcon
                ? "rounded-l-md"
                : "rounded-md"
          )}
        />
        {props?.endIcon && (
          <div className="pointer-events-none  inset-y-0 right-0 flex items-center justify-center pl-2 pr-2 text-xs">
            {props?.endIcon}
          </div>
        )}
      </div>
      <FormFieldErrors errors={reducedErrorMessages} />
    </div>
  );
};

export default Input;
