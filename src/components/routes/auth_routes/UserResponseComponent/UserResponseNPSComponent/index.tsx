import { useUtils } from "@/app/hooks/useUtils";
import { useEffect, useState } from "react";

const UserResponseNPSComponent = ({ data, flage }) => {
  const { splitEmojiAndText } = useUtils();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  function transformData(mood, optionCounts, responsePercentage) {
    const transformedOptions = mood?.map((option) => ({
      item: option,
      percentage:
        responsePercentage?.find((oo) => oo.item === option)?.percentage ?? 0,
      count: optionCounts?.find((oo) => oo.item === option)?.count ?? 0,
    }));

    return { options: transformedOptions };
  }

  const responseArray =
    data?.response_percentage &&
    Object.entries(data?.response_percentage)?.map(([item, percentage]) => ({
      item,
      percentage,
    }));
  const option_countsArray =
    data?.option_counts &&
    Object.entries(data?.option_counts)?.map(([item, count]) => ({
      item,
      count,
    }));
  const result = transformData(data?.mood, option_countsArray, responseArray);

  useEffect(() => {
    if (result?.options?.length > 0) {
      const maxIndex = result?.options.reduce(
        (maxIdx, option, idx, arr) =>
          option.percentage > arr[maxIdx].percentage ? idx : maxIdx,
        0
      );
      setSelectedOption(maxIndex);
    }
  }, [result]);

  return (
    <div>
      <div
        className={`${flage ? "grid grid-cols-5" : "flex flex-wrap"} gap-3 my-4`}
      >
        {result?.options?.map((option, index) => (
          <div className="flex flex-col items-center gap-2">
            <div
              key={index}
              className={`${flage ? "p-4 gap-3 flex-col justify-between" : "p-2 gap-3 flex "} w-full flex items-center  rounded-lg  text-sm   transition-colors duration-500 ${
                selectedOption === index
                  ? "bg-[#0C6243] text-white border"
                  : "bg-white text-[#333333]"
              }`}
            >
              <p className={`text-2xl ${!flage && "bg-white rounded-md px-1"}`}>
                {splitEmojiAndText(option?.item)?.emoji}
              </p>
              <p className="text-xs">
                {splitEmojiAndText(option?.item)?.title}
              </p>
            </div>
            <div>
              {option?.count} ({option?.percentage}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserResponseNPSComponent;
