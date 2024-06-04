import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const OptionComponent = () => {
  const navigate=useNavigate()
  const handelClick=()=>{
    navigate("/app/campaign/survey-preview?step_id=2")
  }
  return (
    <div>
      <p className="text-xs ">Question 1 to 3</p>
      <div className="h-auto bg-[#3333] p-4 rounded-md flex flex-col gap-4 mt-2">
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
        <button
          type="submit"
            onClick={() => handelClick()}
          className="inline-flex  w-36 justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OptionComponent;
