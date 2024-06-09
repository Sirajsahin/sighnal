import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NPSComponent = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
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
            { emoji: "😐", label: "It’s Okay" },
            { emoji: "😕", label: "Unsatisfied" },
            { emoji: "😡", label: "Very unsatisfied" },
          ].map((option, index) => (
            <div
              key={index}
              className={`bg-white p-3 w-full flex items-center justify-between rounded-lg gap-3 text-sm flex-col cursor-pointer ${
                selectedOption === index
                  ? "border-2 border-gray-400 "
                  : "border-none transparent"
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <p className="text-2xl">{option.emoji}</p>
              <p className="text-xs text-[#333333]">{option.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGoback}
            className="inline-flex w-36 justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleContinueClick}
            className="inline-flex w-36 justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NPSComponent;
