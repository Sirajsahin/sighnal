import { useUtils } from "@/app/hooks/useUtils";
import { useState } from "react";

const NPSComponent = ({ data }) => {
  const { splitEmojiAndText } = useUtils();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-3 my-4">
        {data?.map((option, index) => (
          <div
            key={index}
            className={`p-3 w-full flex items-center justify-between rounded-lg gap-3 text-sm flex-col cursor-pointer transition-colors duration-500 ${
              selectedOption === index
                ? "border-[#333333] text-black bg-white border"
                : "bg-white text-[#333333]"
            }`}
            onClick={() => handleOptionClick(index)}
          >
            <p className="text-2xl">{splitEmojiAndText(option)?.emoji}</p>
            <p className="text-xs">{splitEmojiAndText(option)?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NPSComponent;
