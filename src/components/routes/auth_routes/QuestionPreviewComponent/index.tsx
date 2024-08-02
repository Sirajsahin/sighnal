import { useQuestionPreviewAPI } from "@/app/hooks/api_hooks/Group/useQuestionPreviewAPI";
import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import NPSComponent from "./NPSComponent";
import OptionComponent from "./OptionComponent";
import RatingComponent from "./RatingComponent";

const QuestionPreviewComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchQuestionDetails } = useQuestionPreviewAPI();
  const step_id = params.get("step_id");

  useEffect(() => {
    const survey_id = params.get("survey_id");
    const group_id = params.get("group_id");
    if (group_id && survey_id) {
      fetchQuestionDetails(group_id, survey_id);
    }
  }, [params.get("survey_id")]);

  return (
    <div>
      <div className="my-6 flex items-center gap-3 font-bold cursor-pointer">
        <button
          type="submit"
          className={`w-auto justify-center flex items-center gap-1 rounded-md bg-white text-[#333333] border px-4 py-2 text-sm font-medium  `}
        >
          <MdOutlineKeyboardBackspace className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-14 my-10 mx-14 ">
        <div className="grid grid-cols-4">
          <div className="col-span-4">
            <div className="mb-4">LOGO</div>
            <h3 className="font-medium text-base">Application Feedback</h3>
            <p className="text-sm my-3 text-[#475467]">
              Streamline your product feedback process with Product Feedback
              Surveys. Group surveys by product lines or individual products to
              gather detailed feedback from users. Analyze feedback to make
              informed product decisions, prioritize features, and enhance
              overall product satisfaction.
            </p>
          </div>
        </div>
        <div className="col-span-2">
          {step_id === "1" && <OptionComponent />}
          {step_id === "2" && <NPSComponent />}
          {step_id === "3" && <RatingComponent />}
        </div>
      </div>
    </div>
  );
};

export default QuestionPreviewComponent;
