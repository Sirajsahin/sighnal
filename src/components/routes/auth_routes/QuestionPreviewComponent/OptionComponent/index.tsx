import { useState } from "react";

const OptionComponent = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div>
      {data?.map((option, index) => (
        <div
          key={index}
          className={`bg-white w-full flex items-center justify-between rounded-lg  cursor-pointer transition-colors duration-300 mb-3`}
          onClick={() => setSelectedOption(index)}
        >
          <div
            className={`${selectedOption === index ? "bg-[#0C6243] text-white" : "bg-white text-black "} text-sm  w-full h-auto flex rounded-lg  p-2 justify-between items-center  transition-all duration-600`}
          >
            <span className="w-full">{option}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionComponent;
