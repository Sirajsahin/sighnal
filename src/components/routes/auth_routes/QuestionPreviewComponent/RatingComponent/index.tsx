import { useNavigate } from "react-router-dom";

const RatingComponent = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/app/thankyou");
  };
  const handelGoback = () => {
    navigate("/app/campaign/survey-preview?step_id=2");
  };
  return (
    <div>
      <p className="text-xs ">Question 3 to 3</p>
      <div className="h-auto bg-[#3333] p-4 rounded-md flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        <div className="grid grid-cols-12 gap-3">
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            1
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            2
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            3
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            4
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            5
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            6
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            7
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            8
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            9
          </div>
          <div className="text-sm font-semibold bg-white p-3 rounded-xl text-center py-4  cursor-pointer hover:bg-indigo-200">
            10
          </div>
        </div>
        <div className="text-sm justify-between flex items-center my-3">
          <p>Very unsatisfied</p>
          <p>Very Satisfied</p>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;
