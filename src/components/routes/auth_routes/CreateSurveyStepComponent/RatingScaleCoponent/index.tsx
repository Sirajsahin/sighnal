import { useState } from "react";

const RatingScaleComponent = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleOptionClick = (option: number) => {
    setSelected(option);
  };

  return (
    <div>
      <div className="flex items-center gap-4 pt-4">
        {data?.map((val, index) => {
          return (
            <div
              key={index}
              className={`text-sm font-medium rounded-xl ${selected === index ? "bg-white text-black border" : "bg-white border"} p-3 rounded-lg text-center  cursor-pointer h-12 w-12`}
              onClick={() => handleOptionClick(index)}
            >
              {val?.item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingScaleComponent;
