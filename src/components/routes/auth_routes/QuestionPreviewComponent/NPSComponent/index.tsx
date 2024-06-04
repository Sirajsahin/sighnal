import { useNavigate } from "react-router-dom";

const NPSComponent = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/app/campaign/survey-preview?step_id=3");
  };
  const handelGoback = () => {
    navigate("/app/campaign/survey-preview?step_id=1");
  };
  return (
    <div>
      <p className="text-xs ">Question 2 to 3</p>
      <div className="h-auto bg-[#3333] p-4 rounded-md flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        <div className="grid grid-cols-5 gap-3 my-4">
          <div className="bg-white p-3 w-full flex items-center  rounded-lg gap-3 flex-col cursor-pointer hover:bg-indigo-200">
            <p className="text-2xl">😍</p>
            <p className="text-sm text-[#333333]">Very Satisfied</p>
          </div>
          <div className="bg-white p-3 w-full flex items-center  rounded-lg gap-3 flex-col cursor-pointer hover:bg-indigo-200">
            <p className="text-2xl">😃</p>
            <p className="text-sm text-[#333333]">Satisfied</p>
          </div>
          <div className="bg-white p-3 w-full flex items-center  rounded-lg gap-3 flex-col cursor-pointer hover:bg-indigo-200">
            <p className="text-2xl">😐</p>
            <p className="text-sm text-[#333333]">It’s Okay</p>
          </div>
          <div className="bg-white p-3 w-full flex items-center  rounded-lg gap-3 flex-col cursor-pointer hover:bg-indigo-200">
            <p className="text-2xl">😕</p>
            <p className="text-sm text-[#333333]">Unsatisfied</p>
          </div>
          <div className="bg-white p-3 w-full flex items-center  rounded-lg gap-3 flex-col cursor-pointer hover:bg-indigo-200">
            <p className="text-2xl">😡</p>
            <p className="text-sm text-[#333333]">Very unsatisfied</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            onClick={() => handelGoback()}
            className="inline-flex  w-36 justify-center rounded-md bg-blue-500  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Go Back
          </button>
          <button
            type="submit"
            onClick={() => handelClick()}
            className="inline-flex  w-36 justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NPSComponent;
