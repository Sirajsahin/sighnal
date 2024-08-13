import { LuUploadCloud } from "react-icons/lu";

type SignalImageUploadComponentProps = {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  index: number;
};

const SignalImageUploadComponent: React.FC<SignalImageUploadComponentProps> = ({
  handleFileChange,
  index,
}) => {
  return (
    <label
      htmlFor={`file-input-${index}`}
      className="m-3 w-full h-[160px] border border-gray-400 rounded-lg my-5 flex items-center justify-center relative cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        className="hidden" // Hide the input, we don't need it to be visible
        multiple
        id={`file-input-${index}`}
        onChange={(e) => handleFileChange(e, index)}
      />
      <div className="flex items-center justify-center flex-col">
        <LuUploadCloud className="w-5 h-5 " />

        <p className="text-[#34A853] text-sm font-medium pt-1">
          Click to upload Image Files
        </p>
        <p className="text-gray-400 text-sm font-medium ">
          you can upload upto 4 image
        </p>
      </div>
    </label>
  );
};

export default SignalImageUploadComponent;
