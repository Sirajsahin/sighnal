import { useState } from "react";

const MoodScaleComponent = ({ data, setValue, fieldPath }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (option: number, title: string) => {
    setSelectedOption(option);
    setValue(fieldPath, title);
  };

  return (
    <div className="grid grid-cols-5 gap-3 my-4">
      {data?.map((option, index) => (
        <div
          key={index}
          className={`p-3 w-full flex items-center border justify-between rounded-lg gap-3 text-sm flex-col cursor-pointer transition-colors duration-500 ${
            selectedOption === index
              ? "border-[#333333] text-black bg-white border"
              : "bg-white text-[#333333]"
          }`}
          onClick={() => handleOptionClick(index, option?.label)}
        >
          <p className="text-2xl">{option.emoji}</p>
          <p className="text-xs">{option.label}</p>
        </div>
      ))}
    </div>
  );
};
export default MoodScaleComponent;
