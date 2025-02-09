import { useEffect, useState } from "react";

const UserResponseOptionComponent = ({ data }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  function transformData(responsePercentage, options, optionCounts: any) {
    const transformedOptions = options?.map((option) => {
      const percentage = responsePercentage[option] || 0;
      const count = optionCounts?.find((oo) => oo.item === option)?.count ?? 0;
      return { item: option, percentage, count };
    });

    return { options: transformedOptions };
  }

  // Transforming Data

  const option_countsArray =
    data?.option_counts &&
    Object.entries(data?.option_counts)?.map(([item, count]) => ({
      item,
      count,
    }));

  const result = transformData(
    data?.response_percentage,
    data?.options,
    option_countsArray
  );

  useEffect(() => {
    if (result?.options?.length > 0) {
      const highestIndex = result?.options?.reduce(
        (maxIndex, item, index, arr) =>
          item.percentage > arr[maxIndex].percentage ? index : maxIndex,
        0
      );
      setSelectedOptionIndex(highestIndex);
    }
  }, [result]);

  console.log(data, "data");

  return (
    <div className="p-4">
      {result?.options?.map((option, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between rounded-lg h-[40px] overflow-hidden bg-white transition-colors duration-300 mb-3 ${
            index === selectedOptionIndex ? "" : ""
          }`}
        >
          {index === selectedOptionIndex ? (
            <div
              className="absolute top-0 left-0 h-full bg-[#0C6243] rounded-lg text-white"
              style={{ width: `${option.percentage}%` }}
            ></div>
          ) : (
            <div
              className="absolute top-0 left-0 h-full bg-[#F5F5F5] rounded-lg text-[#333333] border"
              style={{ width: `${option.percentage}%` }}
            ></div>
          )}

          <div
            className={`relative flex-1 text-sm px-2  ${index === selectedOptionIndex ? "text-white" : "text-[#333333]"}`}
          >
            {option.item}
          </div>
          <div
            className={`relative text-lg p-3 flex  justify-end ${
              option.percentage === 100 ? "text-white" : "text-gray-500 "
            }`}
            style={{
              width: "auto",
            }}
          >
            {option?.count} ({`${option.percentage}%`})
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserResponseOptionComponent;
