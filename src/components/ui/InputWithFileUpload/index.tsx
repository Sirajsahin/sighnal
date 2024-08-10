import { useFormUtils } from "@/app/hooks/useFormUtils";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

import { IInputWithFileUpload } from "../interface";
import FormFieldErrors from "../Reusable/FromFiledError";

const RenderFiles: React.FC<{
  files: FileList;
  onClearCallback?: () => void;
  onRemoveCallback?: (newFileList?: File[]) => void;
  isMultiple: boolean;
}> = ({ files, onClearCallback, onRemoveCallback, isMultiple }) => {
  const removeFileFromFileList = (
    fileList: FileList,
    fileNameToRemove: string
  ) => {
    const newFileList: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name !== fileNameToRemove) {
        newFileList.push(fileList[i]);
      }
    }
    return newFileList;
  };

  const handleRemoveFile = (fileName: string) => {
    const newFileList = removeFileFromFileList(files, fileName);
    if (onRemoveCallback) {
      onRemoveCallback(newFileList);
    }
  };

  return (
    <div>
      {isMultiple && (
        <div className="text-right w-full">
          <button
            data-tooltip-id="remove_all"
            data-tooltip-content="Remove All Images"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onClearCallback) {
                onClearCallback();
              }
            }}
          >
            <TrashIcon className="w-3 h-3 text-red-500" />
          </button>
          <Tooltip id="remove_all" style={{ fontSize: "10px" }} />
        </div>
      )}
      {Array.from(files)?.map((file) => {
        return (
          <div
            key={file.name}
            className="flex justify-start items-start gap-x-2 bg-blue-50 p-2"
          >
            <span className="text-xs">{file.name}</span>
            {!isMultiple && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onClearCallback) {
                    isMultiple
                      ? handleRemoveFile(file.name)
                      : onClearCallback();
                  }
                }}
              >
                <TrashIcon className="w-3 h-3 text-red-500" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

const InputWithFileUpload: React.FC<IInputWithFileUpload> = ({
  fieldError,
  errorMessages,
  className,
  dragAndDropIcon,
  dragAndDropDescription,
  register,
  variant,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { deduceFormFieldErrors, isFormFieldValid } = useFormUtils();
  const reducedErrorMessages = deduceFormFieldErrors(errorMessages, fieldError);
  const isValid = isFormFieldValid(reducedErrorMessages);

  useEffect(() => {
    setIsDragging(false);
  }, []);

  return variant === "DRAG_AND_DROP" ? (
    <div
      className={clsx(
        "relative rounded-lg",
        className,
        isDragging && "border-indigo-500 border-2"
      )}
    >
      <div className="w-full">
        <div
          className={clsx(
            "flex  justify-center rounded-lg border border-dashed  px-6 py-10",
            isValid
              ? !fieldError?.message
                ? "border-gray-900/25"
                : "border-red-500 border-2"
              : "border-red-500 border-2"
          )}
        >
          {props?.files && props?.files.length > 0 ? (
            <RenderFiles
              onRemoveCallback={(files) => console.log(files)}
              isMultiple={props?.isMultiple ?? false}
              files={props.files}
              onClearCallback={props.onClear}
            />
          ) : (
            <div className="text-center">
              {dragAndDropIcon ?? (
                <PhotoIcon
                  className={clsx(
                    "mx-auto h-12 w-12 ",
                    isValid ? "text-gray-300" : "text-red-500"
                  )}
                  aria-hidden="true"
                />
              )}
              <div className="flex mt-4 text-gray-600 text-sm leading-6">
                <label
                  htmlFor={register.name}
                  className={clsx(
                    "relative cursor-pointer rounded-md bg-white font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500",

                    isValid
                      ? !fieldError?.message
                        ? "text-indigo-500"
                        : "text-red-500"
                      : "text-red-500"
                  )}
                >
                  <span>Upload a file</span>
                  <input
                    {...register}
                    {...props}
                    multiple={props?.isMultiple ?? false}
                    autoComplete="false"
                    autoCorrect="false"
                    className={clsx(`sr-only ${props?.inputClassName}`)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {dragAndDropDescription && (
                <p className="text-gray-600 text-xs leading-5">
                  {dragAndDropDescription?.allowedFormats?.join(",")} up to{" "}
                  {dragAndDropDescription?.maxFileSize}
                </p>
              )}
              <p className="text-xs text-gray-600">
                You can upload only 4 images
              </p>
            </div>
          )}
        </div>
      </div>
      {fieldError?.message && (
        <p className="items-center mt-2 font-medium text-red-400">
          {fieldError?.message}
        </p>
      )}
      <div className="bottom-0 left-1/2 absolute -translate-x-1/2">
        <FormFieldErrors errors={reducedErrorMessages} />
      </div>
    </div>
  ) : (
    <div className="flex text-gray-600 text-sm leading-6">
      <label
        htmlFor={register.name}
        className={clsx(
          "relative cursor-pointer rounded-md bg-white font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500",
          isValid
            ? !fieldError?.message
              ? "text-indigo-500"
              : "text-red-500"
            : "text-red-500"
        )}
      >
        {props?.files && props?.files?.length > 0 ? (
          <RenderFiles
            isMultiple={props?.isMultiple ?? false}
            files={props.files}
            onClearCallback={props.onClear}
          />
        ) : (
          <div>
            <div className="flex justify-start items-center gap-x-2">
              {" "}
              <FaUpload className="w-4 h-4" /> <span>Upload a file</span>{" "}
            </div>
            <input
              {...register}
              {...props}
              autoComplete="false"
              autoCorrect="false"
              className={clsx(`sr-only ${props?.inputClassName}`)}
            />
          </div>
        )}
      </label>
    </div>
  );
};

export default InputWithFileUpload;
