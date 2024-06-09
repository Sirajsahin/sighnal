import clsx from "clsx";

import { useFormUtils } from "@/app/hooks/useFormUtils";
import FormFieldErrors from "@/components/ui/Reusable/FromFiledError";
import { IInput } from "@/components/ui/interface";

const InputWithlable: React.FC<IInput> = ({
  fieldError,
  errorMessages,
  className,
  register,
  isMandatory,
  labelName,
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
      <div className="isolate -space-y-px rounded-md shadow-sm">
        <div className="relative rounded-lg  p-2 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
          <label
            htmlFor={labelName?.toLowerCase()}
            className=" text-xs font-medium text-gray-900 flex items-center gap-1"
          >
            {labelName}
            {isMandatory && <span className="text-xs text-red-400">*</span>}
          </label>
          <input
            type="text"
            name={labelName?.toLowerCase()}
            id={labelName?.toLowerCase()}
            {...register}
            {...props}
            autoComplete="false"
            autoCorrect="false"
            className={clsx(
              `block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6 ${props?.inputClassName}`,
              isValid
                ? ""
                : `text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-600`
            )}
          />
        </div>
      </div>
      <FormFieldErrors errors={reducedErrorMessages} />
    </div>
  );
};

export default InputWithlable;
