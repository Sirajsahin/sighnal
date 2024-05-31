import { IFeedbackStatsComponentProps } from "./interface";
const StatsCardComponent: React.FC<IFeedbackStatsComponentProps> = ({
  cardText,
  cardValue,
}) => {
  return (
    <div className=" p-3 bg-[#F5F5F5] w-56 rounded-xl">
      <div className="flex  items-center gap-3">
        <div className="bg-white h-14 w-14 rounded-xl"></div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal text-[#475467]">{cardText}</p>
          <h2 className="text-2xl font-bold text-[#333333]">{cardValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCardComponent;
