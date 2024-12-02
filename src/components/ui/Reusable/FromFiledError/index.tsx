import clsx from "clsx";

import { ReducedErrorMessages } from "../../interface";

const FormFieldErrors: React.FC<{
  errors: ReducedErrorMessages;
  className?: string;
}> = (props) => {
  return Object.keys(props.errors).map((err) => {
    return (
      <span
        key={err}
        className={clsx("text-xs  text-red-500", props?.className)}
      >
        {props.errors[err]}
      </span>
    );
  });
};

export default FormFieldErrors;
