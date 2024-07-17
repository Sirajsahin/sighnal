import { TrashIcon } from "@heroicons/react/24/outline";
import { ParseResult } from "papaparse";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiFileOn } from "react-icons/ci";
import { LuUploadCloud } from "react-icons/lu";
import * as XLSX from "xlsx";

type FileUploadProps = {
  onFileUploaded: (file: File) => void;
  type?: string;
  isFileRequired?: boolean;
};

export function bytesToKB(bytes: number) {
  return (bytes / 1024).toFixed(3);
}

export function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(3);
}

const XlsxUploadComponent: React.FC<FileUploadProps> = ({
  onFileUploaded,
  isFileRequired,
  type,
}) => {
  const [fileDetails, setFileDetails] = useState<
    { name: string; size: number; data: ParseResult<any> | string }[]
  >([]);

  const handleFileUpload = (file: File) => {
    onFileUploaded(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setFileDetails([{ name: file.name, size: file.size, data: jsonData }]);
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => handleFileUpload(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
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
      {(fileDetails.length === 0 || type === "image") && (
        <div
          {...getRootProps()}
          className={`border my-8 shadow-sm border-[#EAECF0] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer ${
            isFileRequired ? "border-red-500" : ""
          } ${isDragActive ? "bg-gray-200" : ""}`}
        >
          <input {...getInputProps()} hidden />
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="border-[#EAECF0] border p-3 rounded-xl">
              <LuUploadCloud className="w-5 h-5" />
            </div>
            <p className="text-[#34A853] text-sm font-semibold ">
              {isDragActive
                ? "Drop the files here ..."
                : "Click to upload or drag and drop"}
              <span className="text-[#475467] font-normal">
                {type === "image" ? " Image Files" : " XLSX File"}
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

export default XlsxUploadComponent;
