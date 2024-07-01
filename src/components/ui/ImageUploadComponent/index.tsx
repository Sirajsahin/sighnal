// src/components/FileUpload.js
import { TrashIcon } from "@heroicons/react/24/outline";
import Papa, { ParseResult } from "papaparse";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import { LuUploadCloud } from "react-icons/lu";

type FileUploadProps = {
  onFileUploaded: (data: any[]) => void;
};

export function bytesToKB(bytes) {
  return (bytes / 1024).toFixed(3); // Convert bytes to kilobytes (KB) and round to 3 decimal places
}

export function bytesToMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(3); // Convert bytes to megabytes (MB) and round to 3 decimal places
}

const ImageUploadComponent: React.FC<FileUploadProps> = ({
  onFileUploaded,
}) => {
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: number;
    data: ParseResult<any>;
  } | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result as string;
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            setFileDetails({
              name: file.name,
              size: file.size,
              data: result,
            });
            onFileUploaded(result.data);
          },
          error: (error) => {
            console.error("CSV Parsing Error:", error);
          },
        });
      };

      reader.readAsText(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });
  const convertByteToMBKB = (fileSize: number) => {
    let sizeDisplay = "";
    if (fileSize < 1024) {
      sizeDisplay = `${fileSize} bytes`;
    } else if (fileSize >= 1024) {
      sizeDisplay = `${bytesToKB(fileSize)} KB`;
    }

    if (fileSize >= 1024 * 1024) {
      sizeDisplay = `${bytesToMB(fileSize)} MB`;
    }
    return sizeDisplay;
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border my-5 shadow-sm border-[#EAECF0] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="border-[#EAECF0] border p-3 rounded-xl">
            <LuUploadCloud className="w-5 h-5" />
          </div>
          <p className="text-[#34A853] text-sm font-semibold ">
            Click to upload{" "}
            <span className="text-[#475467] font-normal">
              or drag and drop CSV File
            </span>
          </p>
        </div>
      </div>
      {fileDetails?.name && (
        <div
          className={`border my-4 shadow-sm border-[#EAECF0] rounded-xl p-3 py-4 `}
        >
          <div className="flex  justify-between">
            <div className="flex items-start gap-2">
              <CiFileOn className="w-4 h-4" />
              <div className="flex flex-col -mt-1">
                <p className="text-sm font-medium text-[#475467]">
                  {fileDetails?.name}
                </p>
                <p className="text-sm text-[#475467]">
                  {convertByteToMBKB(fileDetails?.size)}
                </p>
              </div>
            </div>
            <TrashIcon
              className="mr-3 h-5 w-5 text-[#475467] cursor-pointer "
              onClick={() => setFileDetails(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
