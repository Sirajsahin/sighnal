import clsx from "clsx";

import FormFieldErrors from "@/components/ui/Reusable/FromFiledError";
import { ITextarea } from "@/components/ui/interface";
import { useFormUtils } from "@/app/hooks/useFormUtils";
import { Textarea } from "@headlessui/react";

const TextareaComponent: React.FC<ITextarea> = ({
  fieldError,
  errorMessages,
  className,
  register,
  endIcon,
  startIcon,
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
      <div className="w-full relative mt-2 flex justify-start items-center rounded-md shadow-sm border">
        {startIcon && (
          <div className="pointer-events-none inset-y-0 left-0 flex justify-center items-center pl-2 pr-2">
            {startIcon}
          </div>
        )}
        <Textarea
          {...register}
          {...props}
          rows={4}
          autoComplete="off"
          autoCorrect="off"
          className={clsx(
            "border-0 py-1.5 p-2 ring-1 ring-inset text-xs focus:ring-2 focus:ring-inset disabled:bg-gray-200 disabled:text-gray-600 sm:leading-6 w-full",
            inputClassName,
            isValid
              ? "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
              : "text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-600",
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
