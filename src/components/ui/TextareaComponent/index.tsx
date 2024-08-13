import clsx from "clsx";

import { useFormUtils } from "@/app/hooks/useFormUtils";
import FormFieldErrors from "@/components/ui/Reusable/FromFiledError";
import { ITextarea } from "@/components/ui/interface";
import { Textarea } from "@headlessui/react";

const TextareaComponent: React.FC<ITextarea> = ({
  fieldError,
  errorMessages,
  className,
  register,
  endIcon,
  startIcon,
  rows,
  inputClassName,
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
      <div className="w-full relative mt-1 flex justify-start items-center rounded-md ">
        {startIcon && (
          <div className="pointer-events-none inset-y-0 left-0 flex justify-center items-center pl-2 pr-2">
            {startIcon}
          </div>
        )}
        <Textarea
          {...register}
          {...props}
          rows={rows | 3}
          autoComplete="off"
          autoCorrect="off"
          className={clsx(
            " py-1.5 p-2 border outline-none ring-1 focus:border-[#333333] ring-inset text-sm  disabled:bg-gray-200 disabled:text-gray-600 sm:leading-6 w-full",
            inputClassName,
            isValid
              ? "text-gray-900 ring-gray-300 placeholder:text-gray-400"
              : "text-red-900 ring-red-300 placeholder:text-red-400 border-none ",
            startIcon ? "rounded-r-md" : endIcon ? "rounded-l-md" : "rounded-md"
          )}
        />
        {endIcon && (
          <div className="pointer-events-none inset-y-0 right-0 flex items-center justify-center pl-2 pr-2 text-xs">
            {endIcon}
          </div>
        )}
      </div>
      <FormFieldErrors errors={reducedErrorMessages} />
    </div>
  );
};

export default TextareaComponent;
