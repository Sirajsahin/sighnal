import { useEffect, useState } from "react";

const UserResponseOptionComponent = ({ data }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  function transformData(responsePercentage, options) {
    const transformedOptions = options?.map((option) => {
      const percentage = responsePercentage[option] || 0;
      return { item: option, percentage };
    });

    return { options: transformedOptions };
  }

  // Transforming Data
  const result = transformData(data?.response_percentage, data?.options);

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
            className={`relative text-lg p-3 ${
              index === selectedOptionIndex ? "text-white" : "text-gray-500 "
            }`}
            style={{
              width: "80px",
            }}
          >
            {`${option.percentage}%`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserResponseOptionComponent;
