import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import NPSComponent from "./NPSComponent";
import OptionComponent from "./OptionComponent";
import RatingComponent from "./RatingComponent";

const QuestionPreviewComponent = () => {
  const [params, _setparams] = useSearchParams();
  const step_id = params.get("step_id");

  return (
    <div>
      <div className="my-6 flex items-center gap-3 font-bold cursor-pointer">
        <ArrowLeftIcon className="w-4 h-4" /> Survey Preview
      </div>

      <div className="grid grid-cols-2 gap-2 mt-10 items-center">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="my-10">LOGO</div>
            <h3 className="font-medium text-base">Application Feedback</h3>
            <p className="text-sm my-3 text-[#475467]">
              Streamline your product feedback process with Product Feedback
              Surveys. Group surveys by product lines or individual products to
              gather detailed feedback from users. Analyze feedback to make
              informed product decisions, prioritize features, and enhance
              overall product satisfaction.
            </p>
          </div>
          <div></div>
        </div>
        <div>
          {step_id === "1" && <OptionComponent />}
          {step_id === "2" && <NPSComponent />}
          {step_id === "3" && <RatingComponent />}
        </div>
      </div>
    </div>
  );
};

export default QuestionPreviewComponent;
