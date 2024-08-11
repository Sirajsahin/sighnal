import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const OptionComponent = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState<boolean | null>(false);
  const [currentPercentages, setCurrentPercentages] = useState<number[]>(
    new Array(5).fill(0)
  );

  const handleOptionClick = () => {
    setSelectedOption(true); // Reset selected option
    const newCurrentPercentages = new Array(data?.length).fill(0);
    setCurrentPercentages(newCurrentPercentages);

    const interval = setInterval(() => {
      setCurrentPercentages((prev) => {
        const newPercentages = [...prev];
        let allFilled = true;
        for (let i = 0; i < data?.length; i++) {
          if (newPercentages[i] < data[i].persion) {
            newPercentages[i] += 0.5; // Increment percentage
            allFilled = false;
          }
        }
        if (allFilled) {
          clearInterval(interval);
        }
        return newPercentages;
      });
    }, 10); // Adjust the interval time for smoother or faster transition
  };

  return (
    <div>
      {data?.map((option, index) => (
        <div
          key={index}
          className={`bg-white w-full flex items-center justify-between rounded-lg cursor-pointer transition-colors duration-300 mb-2`}
          onClick={handleOptionClick}
        >
          <div
            className={`${selectedOption ? "bg-red-500 text-white" : "bg-white text-black "} text-sm  w-full h-auto flex  p-2 justify-between items-center rounded-full transition-all duration-600`}
            style={{
              width: `${selectedOption ? currentPercentages[index] : "20"}%`,
            }}
          >
            <span className="w-full">{option}</span>
          </div>
          <div className="mr-2">
            <XMarkIcon className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionComponent;
