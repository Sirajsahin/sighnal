import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const OptionComponent = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/app/campaign/survey-preview?step_id=2");
  };
  return (
    <div>
      <p className="text-xs ">Question 1 to 3</p>
      <div className="h-auto bg-[#4754670D] p-5 rounded-xl flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        <div className="bg-white p-2 w-full flex items-center justify-between rounded-lg px-3">
          Bad <XMarkIcon className="h-4 w-4" />
        </div>
        <div className="bg-white p-2 w-full flex items-center justify-between rounded-lg px-3">
          Bad <XMarkIcon className="h-4 w-4" />
        </div>
        <div className="bg-white p-2 w-full flex items-center justify-between rounded-lg px-3">
          Bad <XMarkIcon className="h-4 w-4" />
        </div>
        <div className="bg-white p-2 w-full flex items-center justify-between rounded-lg px-3">
          Bad <XMarkIcon className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-8 mx-5">
          <button className="text-[#333333] font-medium cursor-pointer">
            Skip
          </button>

          <button
            type="submit"
            onClick={() => handelClick()}
            className="inline-flex   justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionComponent;
