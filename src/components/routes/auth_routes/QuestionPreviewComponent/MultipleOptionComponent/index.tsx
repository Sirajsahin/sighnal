import { useState } from "react";

const MultipleOptionComponent = ({ data }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  return (
    <div>
      {data?.map((option, index) => {
        // Check if the option is "Select All"

        return (
          <div
            key={index}
            className={`bg-white w-full flex items-center justify-between rounded-lg cursor-pointer transition-colors duration-300 mb-3`}
            onClick={() => handleOptionClick(index)}
          >
            <div
              className={`${
                selectedOptions.includes(index)
                  ? "bg-[#0C6243] text-white"
                  : "bg-white text-black"
              } text-sm w-full h-auto flex rounded-lg p-2 justify-between items-center transition-all duration-600`}
            >
              <span className="w-full">{option}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleOptionComponent;
