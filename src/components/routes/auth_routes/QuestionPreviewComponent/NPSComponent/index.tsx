import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NPSComponent = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  const handleContinueClick = () => {
    if (selectedOption !== null) {
      navigate("/app/campaign/survey-preview?step_id=3");
    } else {
      alert("Please select an option before continuing.");
    }
  };

  const handleGoback = () => {
    navigate("/app/campaign/survey-preview?step_id=1");
  };

  return (
    <div>
      <p className="text-xs">Question 2 to 3</p>
      <div className="h-auto bg-[#4754670D] p-5 rounded-md flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        <div className="grid grid-cols-5 gap-3 my-4">
          {[
            { emoji: "😍", label: "Very Satisfied" },
            { emoji: "😃", label: "Satisfied" },
            { emoji: "😐", label: "It's Okay" },
            { emoji: "😕", label: "Unsatisfied" },
            { emoji: "😡", label: "Very unsatisfied" },
          ].map((option, index) => (
            <div
              key={index}
              className={`p-3 w-full flex items-center justify-between rounded-lg gap-3 text-sm flex-col cursor-pointer transition-colors duration-500 ${
                selectedOption === index
                  ? "border-[#333333] text-black bg-white border"
                  : "bg-white text-[#333333]"
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <p className="text-2xl">{option.emoji}</p>
              <p className="text-xs">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button
            type="submit"
            onClick={handleGoback}
            className={`w-auto justify-center flex items-center gap-1 rounded-md bg-white text-[#333333] border px-4 py-2 text-sm font-medium  `}
          >
            <MdOutlineKeyboardBackspace className="w-4 h-4" />
            Back
          </button>
          <button className="text-[#333333] font-medium cursor-pointer">
            Skip
          </button>
          <button
            type="button"
            onClick={handleContinueClick}
            className="inline-flex  justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NPSComponent;
