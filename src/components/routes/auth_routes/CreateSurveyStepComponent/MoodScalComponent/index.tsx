import { useUtils } from "@/app/hooks/useUtils";
import { useState, useEffect } from "react";

const MoodScaleComponent = ({ data }) => {
  const { splitEmojiAndText } = useUtils();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showMood, setShowMood] = useState([]);

  // Correct order to ensure data is always displayed in the same sequence
  const correctOrder = [
    "😡 Very unsatisfied",
    "😕 Unsatisfied",
    "😐 It's Okay",
    "😃 Satisfied",
    "😍 Very Satisfied",
  ];

  // Sync the `showMood` state with sorted `data`
  useEffect(() => {
    if (data?.length > 0) {
      // Sort data according to the correct order
      const sortedData = correctOrder.filter((item) => data.includes(item));
      setShowMood(sortedData);
    } else {
      setShowMood([]); // Handle empty data gracefully
    }
  }, [data]); // Re-run when `data` changes

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div className="grid grid-cols-5 gap-3 my-4">
      {showMood?.map((option, index) => (
        <div
          key={index}
          className={`p-3 w-full flex items-center border justify-between rounded-lg gap-3 text-sm flex-col cursor-pointer transition-colors duration-500 ${
            selectedOption === index
              ? "bg-white text-[#333333] border"
              : "bg-white text-[#333333]"
          }`}
          onClick={() => handleOptionClick(index)}
        >
          <p className="text-2xl">{splitEmojiAndText(option)?.emoji}</p>
          <p className="text-xs">{splitEmojiAndText(option)?.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MoodScaleComponent;
