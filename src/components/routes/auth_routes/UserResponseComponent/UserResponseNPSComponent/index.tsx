import { useUtils } from "@/app/hooks/useUtils";
import { useState } from "react";

const UserResponseNPSComponent = ({ data, flage }) => {
  const { splitEmojiAndText } = useUtils();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div
        className={`${flage ? "grid grid-cols-5" : "flex flex-wrap"} gap-3 my-4`}
      >
        {data?.map((option, index) => (
          <div className="flex flex-col items-center gap-2">
            <div
              key={index}
              className={`${flage ? "p-4 gap-3 flex-col justify-between" : "p-2 gap-3 flex "} w-full flex items-center  rounded-lg  text-sm   transition-colors duration-500 ${
                selectedOption === index
                  ? "bg-[#0C6243] text-white border"
                  : "bg-white text-[#333333]"
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <p className={`text-2xl ${!flage && "bg-white rounded-md px-1"}`}>
                {splitEmojiAndText(option)?.emoji}
              </p>
              <p className="text-xs">{splitEmojiAndText(option)?.title}</p>
            </div>
            <div>50 (60%)</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserResponseNPSComponent;
