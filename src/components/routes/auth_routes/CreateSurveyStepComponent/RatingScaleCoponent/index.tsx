const RatingScaleComponent = ({ data, setSelected, selected }) => {
  return (
    <div>
      <div className="flex items-center gap-4 pt-4">
        {data?.map((val, index) => {
          return (
            <div
              key={index}
              className={`text-sm font-medium rounded-xl ${selected === index ? "bg-[#333333] text-white" : "bg-white border"} p-3 rounded-lg text-center  cursor-pointer h-12 w-12`}
              onClick={() => setSelected(index)}
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
