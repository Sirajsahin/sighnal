// src/components/FileUpload.js
import { TrashIcon } from "@heroicons/react/24/outline";
import Papa, { ParseResult } from "papaparse";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import { LuUploadCloud } from "react-icons/lu";

type FileUploadProps = {
  onFileUploaded: (data: any[]) => void;
  type?: string;
  fileType?: string;
  setIsFileRequired?: (r: boolean) => void;
  isFileRequired?: boolean;
};

export function bytesToKB(bytes) {
  return (bytes / 1024).toFixed(3); // Convert bytes to kilobytes (KB) and round to 3 decimal places
}

export function bytesToMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(3); // Convert bytes to megabytes (MB) and round to 3 decimal places
}

const ImageUploadComponent: React.FC<FileUploadProps> = ({
  onFileUploaded,
  type,
  fileType,
  setIsFileRequired,
  isFileRequired,
}) => {
  const [fileDetails, setFileDetails] = useState<
    { name: string; size: number; data: ParseResult<any> | string }[]
  >([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsFileRequired(false); // Reset the required state on file drop
      const files = acceptedFiles.map((file) => {
        const reader = new FileReader();
        return new Promise<{ name: string; size: number; data: string }>(
          (resolve, reject) => {
            reader.onload = () => {
              resolve({
                name: file.name,
                size: file.size,
                data: reader.result as string,
              });
            };
            reader.onerror = reject;

            if (type === "image") {
              reader.readAsDataURL(file);
            } else {
              reader.readAsText(file);
            }
          } 
        );
      });

      Promise.all(files)
        .then((fileDetails) => {
          setFileDetails((prevDetails) => [...prevDetails, ...fileDetails]);
          if (type === "image") {
            onFileUploaded(fileDetails.map((file) => file.data));
          } else {
            const csvData = fileDetails[0].data as string;
            Papa.parse(csvData, {
              header: true,
              complete: (result) => {
                setFileDetails([
                  {
                    name: fileDetails[0].name,
                    size: fileDetails[0].size,
                    data: result,
                  },
                ]);
                onFileUploaded(result.data);
              },
              error: (error) => {
                console.error("CSV Parsing Error:", error);
              },
            });
          }
        })
        .catch((error) => {
          console.error("File Reading Error:", error);
        });
    },
    [onFileUploaded, type]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type === "image" ? { "image/*": [] } : { "text/csv": [] },
    multiple: fileType === "multiple" && type === "image",
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
      {(fileDetails.length === 0 || type === "image") && (
        <div
          {...getRootProps()}
          className={`border my-8 shadow-sm border-[#EAECF0] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          } ${isFileRequired ? "border-red-500" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="border-[#EAECF0] border p-3 rounded-xl">
              <LuUploadCloud className="w-5 h-5" />
            </div>
            <p className="text-[#34A853] text-sm font-semibold ">
              Click to upload{" "}
              <span className="text-[#475467] font-normal">
                or drag and drop {type === "image" ? "Image Files" : "CSV File"}
              </span>
            </p>
            {isFileRequired && (
              <p className="text-red-500 text-sm">File upload is required</p>
            )}
          </div>
        </div>
      )}
      {fileDetails.length > 0 && (
        <div
          className={`border my-8 shadow-sm border-[#EAECF0] rounded-xl p-3 py-4`}
        >
          {fileDetails.map((file, index) => (
            <div key={index} className="flex justify-between mb-2">
              <div className="flex items-start gap-2">
                <CiFileOn className="w-4 h-4" />
                <div className="flex flex-col -mt-1">
                  <p className="text-sm font-medium text-[#475467]">
                    {file.name}
                  </p>
                  <p className="text-sm text-[#475467]">
                    {convertByteToMBKB(file.size)}
                  </p>
                </div>
              </div>
              <TrashIcon
                className="mr-3 h-5 w-5 text-[#475467] cursor-pointer"
                onClick={() =>
                  setFileDetails((prev) => prev.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
