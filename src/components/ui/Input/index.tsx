import clsx from "clsx";

import { useFormUtils } from "@/app/hooks/useFormUtils";
import FormFieldErrors from "@/components/ui/Reusable/FromFiledError";
import { IInput } from "@/components/ui/interface";

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
    <div className={clsx(" relative w-full mt-1", className)}>
      <div className="w-full relative  flex justify-start items-center rounded-md border ">
        {props?.startIcon && (
          <div className="pointer-events-none  inset-y-0 left-0 flex justify-center items-center pl-2 pr-2">
            {props?.startIcon}
          </div>
        )}
        <input
          {...register}
          {...props}
          autoComplete="off"
          autoCorrect="false"
          className={clsx(
            `  border  outline-none p-2 text-sm focus:border-[#333333]   disabled:bg-gray-200 disabled:text-gray-600  sm:leading-6 w-full ${props?.inputClassName}`,
            isValid
              ? `text-gray-900  placeholder:text-gray-400  w-full `
              : `text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-600`,
            props?.startIcon
              ? "rounded-r-md"
              : props?.endIcon
                ? "rounded-l-md"
                : "rounded-md"
          )}
        />
      </div>
      <div className="absolute">
        <FormFieldErrors errors={reducedErrorMessages} />
      </div>
    </div>
  );
};

export default Input;
