import { IFeedbackStatsComponentProps } from "./interface";
const StatsCardComponent: React.FC<IFeedbackStatsComponentProps> = ({
  cardText,
  cardValue,
  handelCallback,
  isSelected,
}) => {
  return (
    <div
      className={`p-4 bg-[#F5F5F5] w-auto rounded-xl cursor-pointer ${isSelected ? "border-gray-300 border" : "border-gray-300"}`}
      onClick={handelCallback}
    >
      <div className="flex  items-center gap-3">
        <div className="bg-white h-14 w-14 rounded-xl"></div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal text-[#475467] capitalize">
            {cardText}
          </p>
          <h2 className="text-2xl font-bold text-[#333333]">{cardValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCardComponent;
