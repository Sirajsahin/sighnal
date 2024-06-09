import { useState } from "react";
import { useNavigate } from "react-router-dom";
const data = [
  {
    item: "1",
  },
  {
    item: "2",
  },
  {
    item: "3",
  },
  {
    item: "4",
  },
  {
    item: "5",
  },
  {
    item: "6",
  },
  {
    item: "7",
  },
  {
    item: "8",
  },
  {
    item: "9",
  },
  {
    item: "10",
  },
];
const RatingComponent = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number>(null);

  const handelClick = () => {
    navigate("/app/thankyou");
  };
  const handelGoback = () => {
    navigate("/app/campaign/survey-preview?step_id=2");
  };
  return (
    <div>
      <p className="text-xs ">Question 3 to 3</p>
      <div className="h-auto bg-[#4754670D] p-5 rounded-md flex flex-col gap-4 mt-2">
        <p className="text-sm text-[#333333]">
          Have you satisfied with the appointment booking through application?
        </p>
        <div className="grid grid-cols-12 gap-3">
          {data?.map((val, index) => {
            return (
              <div
                key={index}
                className={`text-sm font-semibold  ${selected === index ? "bg-black text-white" : "bg-white hover:bg-indigo-200"} p-3 rounded-lg text-center py-3  cursor-pointer `}
                onClick={() => setSelected(index)}
              >
                {val?.item}
              </div>
            );
          })}
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
