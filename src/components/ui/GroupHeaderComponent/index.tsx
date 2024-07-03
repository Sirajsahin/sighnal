import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IFeedbackHeaderComponentProps } from "./interface";

const GroupHeaderComponent: React.FC<IFeedbackHeaderComponentProps> = (
  props
) => {
  return (
    <div className="flex  gap-2 flex-col w-full">
      <div className="flex items-center gap-3 ">
        <div className="bg-[#F5F5F5] h-9 w-9 rounded-lg"></div>
        <p className="text-xl font-bold text-[#333333] flex items-center gap-2">
          {props?.header}{" "}
          <span>
            <AiOutlineExclamationCircle className="w-4 h-4 " />
          </span>{" "}
        </p>
      </div>
      {props?.para && (
        <p className="text-sm font-normal text-[#475467] my-1 w-full ">
          {props?.para}
        </p>
      )}
    </div>
  );
};

export default GroupHeaderComponent;
