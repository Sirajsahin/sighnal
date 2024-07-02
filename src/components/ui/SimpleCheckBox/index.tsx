import clsx from "clsx";
import React from "react";
interface CustomHTMLProps extends React.HTMLProps<HTMLInputElement> {
  colorClassName: string;
  descriptionContent?: React.ReactNode;
  containerClassName?: string;
}
type MergedProps = React.HTMLProps<HTMLElement> & CustomHTMLProps;
const SimpleCheckbox: React.FC<MergedProps> = ({
  colorClassName,
  containerClassName,
  descriptionContent,
  ...props
}) => {
  return (
    <div className={clsx("relative flex items-start", containerClassName)}>
      <div className="flex h-6 items-center">
        <input
          {...props}
          type="checkbox"
          className={clsx(
            "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",

            colorClassName
          )}
        />
      </div>
      <div className="ml-0 text-sm leading-6">
        {descriptionContent && descriptionContent}
      </div>
    </div>
  );
};

export default SimpleCheckbox;
