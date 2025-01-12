import { useState, useEffect } from "react";

const UserResponseOptionComponent = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const dataItem = [
    { text: "Great", percentage: 80 },
    { text: "Okay", percentage: 20 },
    { text: "Okay", percentage: 2 },
    { text: "Okay", percentage: 100 },
    { text: "Okay", percentage: 60 },
  ];

  useEffect(() => {
    if (dataItem.length > 0) {
      const highestIndex = dataItem.reduce(
        (maxIndex, item, index, arr) =>
          item.percentage > arr[maxIndex].percentage ? index : maxIndex,
        0
      );
      setSelectedOptionIndex(highestIndex);
    }
  }, [dataItem]);
  console.log(selectedOptionIndex, "selectedOptionIndex");
  return (
    <div className="p-4">
      {dataItem?.map((option, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between rounded-lg h-[50px] overflow-hidden bg-white transition-colors duration-300 mb-3 ${
            index === selectedOptionIndex ? "" : ""
          }`}
          // style={{ background: "bg-white" }} // Gray background for the bar
        >
          {/* Dynamic Background Fill */}
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

          {/* Content on Top */}
          <div
            className={`relative flex-1 text-sm px-2  ${index === selectedOptionIndex ? "text-white" : "text-[#333333]"}`}
          >
            {option.text}
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
