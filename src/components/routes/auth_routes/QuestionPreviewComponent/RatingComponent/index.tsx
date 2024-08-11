import { useState } from "react";

const RatingComponent = ({ data }) => {
  const [selected, setSelected] = useState<number>(null);

  const createRatingData = (value: string) => {
    const item = [];
    for (let i = 1; i <= parseInt(value); i++) {
      item.push(`${i}`);
    }
    return item;
  };
  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        {createRatingData(data)?.map((val, index) => {
          return (
            <div
              key={index}
              className={`text-sm font-semibold  ${selected === index ? "bg-black text-white" : "bg-white "} p-3 rounded-lg text-center py-3  cursor-pointer `}
              onClick={() => setSelected(index)}
            >
              {val}
            </div>
          );
        })}
      </div>
      <div className="text-sm justify-between flex items-center my-3">
        <p>Very unsatisfied</p>
        <p>Very Satisfied</p>
      </div>
    </div>
  );
};

export default RatingComponent;
