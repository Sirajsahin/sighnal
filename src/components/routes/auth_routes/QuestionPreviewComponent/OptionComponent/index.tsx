import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OptionComponent = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<boolean | null>(false);
  const [currentPercentages, setCurrentPercentages] = useState<number[]>(
    new Array(5).fill(0)
  );

  const handleClick = () => {
    navigate("/app/campaign/survey-preview?step_id=2");
  };

  const handleOptionClick = () => {
    setSelectedOption(true); // Reset selected option
    const newCurrentPercentages = new Array(option.length).fill(0);
    setCurrentPercentages(newCurrentPercentages);

    const interval = setInterval(() => {
      setCurrentPercentages((prev) => {
        const newPercentages = [...prev];
        let allFilled = true;
        for (let i = 0; i < option.length; i++) {
          if (newPercentages[i] < option[i].persion) {
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

  const option = [
    { item: "Bad", persion: 20 },
    { item: "Good", persion: 30 },
    { item: "Very Good", persion: 40 },
    { item: "Nice", persion: 60 },
    { item: "Outstanding", persion: 70 },
  ];

  return (
    <div>
      <p className="text-xs ">Question 1 to 3</p>
      <div className="h-auto bg-[#4754670D] p-5 rounded-xl flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        {option.map((option, index) => (
          <div
            key={index}
            className={`bg-white w-full flex items-center justify-between rounded-lg cursor-pointer transition-colors duration-300`}
            onClick={handleOptionClick}
          >
            <div
              className={`${selectedOption ? "bg-red-500 text-white" : "bg-white text-black "}  w-full h-auto flex  p-2 justify-between items-center rounded-full transition-all duration-600`}
              style={{
                width: `${selectedOption ? currentPercentages[index] : "20"}%`,
              }}
            >
              <span className="w-full">{option.item}</span>
            </div>
            <XMarkIcon className="h-4 w-4" />
          </div>
        ))}
        <div className="flex items-center gap-8 mx-5">
          <button className="text-[#333333] font-medium cursor-pointer">
            Skip
          </button>

          <button
            type="submit"
            onClick={handleClick}
            className="inline-flex justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionComponent;
