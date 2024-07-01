import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
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
        <div className="flex items-center gap-6">
          <button
            type="submit"
            onClick={handelGoback}
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
            onClick={handelClick}
            className="inline-flex  justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;
