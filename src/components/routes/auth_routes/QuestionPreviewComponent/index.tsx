import { useQuestionPreviewAPI } from "@/app/hooks/api_hooks/Group/useQuestionPreviewAPI";
import { useSurveyDetailsAPI } from "@/app/hooks/api_hooks/Group/useSurveyDetailsAPI";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import NPSComponent from "./NPSComponent";
import OpenTextArea from "./OpenTextArea";
import OptionComponent from "./OptionComponent";
import RatingComponent from "./RatingComponent";

const QuestionPreviewComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchQuestionDetails, prevQuestionDetails } =
    useQuestionPreviewAPI();
  const navigate = useNavigate();

  const { execute: fetchServeyDetails, serveyDetails } = useSurveyDetailsAPI();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const survey_id = params.get("survey_id");
    const group_id = params.get("group_id");
    if (group_id && survey_id) {
      fetchQuestionDetails(group_id, survey_id);
    }
  }, [params.get("survey_id")]);

  const handleContinue = () => {
    if (currentQuestionIndex < prevQuestionDetails?.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handlePreviews = () => {
    if (currentQuestionIndex < prevQuestionDetails?.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentQuestion = prevQuestionDetails[currentQuestionIndex];

  const renderQuestionComponent = () => {
    switch (currentQuestion?.question_type_id) {
      case "single_choice":
      case "multiple_choice":
        return <OptionComponent data={currentQuestion?.options} />;
      case "mood_scale":
        return <NPSComponent data={currentQuestion?.mood} />;
      case "rating_scale":
        return <RatingComponent data={currentQuestion?.rating_scale} />;
      case "open_text_response":
        return <OpenTextArea />;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchServeyDetails(params.get("survey_id"));
  }, []);

  const handelBack = () => {
    navigate(
      `/app/campaign/create-survey?step_id=3&group_id=${params.get("group_id")}&survey_id=${params.get("survey_id")}`
    );
  };

  return (
    <div>
      <div className="my-6 flex items-center gap-3 font-bold cursor-pointer">
        <button
          type="submit"
          className="w-auto justify-center flex items-center gap-1 rounded-md bg-white text-[#333333] border px-4 py-2 text-sm font-medium"
          onClick={() => handelBack()}
        >
          <MdOutlineKeyboardBackspace className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-14 my-10 mx-14">
        <div className="grid grid-cols-4">
          <div className="col-span-4">
            <div className="mb-4">LOGO</div>
            <h3 className="font-medium text-base">
              {serveyDetails?.survey_name}
            </h3>
            <p className="text-sm my-3 text-[#475467]">
              {serveyDetails?.survey_description}
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-xs ">
            Question {currentQuestionIndex + 1} to {prevQuestionDetails?.length}
          </p>
          <div className="h-auto bg-[#4754670D] p-5 rounded-xl flex flex-col gap-4 mt-2">
            <p className="text-sm text-[#333333]">
              {currentQuestion?.question}
            </p>
            {renderQuestionComponent()}
            <div className="flex items-center gap-8 mx-5">
              {currentQuestion?.can_skipped === "true" && (
                <button
                  className="text-[#333333] font-medium cursor-pointer"
                  onClick={handleContinue}
                >
                  Skip
                </button>
              )}

              {currentQuestionIndex !== 0 && (
                <button
                  type="submit"
                  onClick={handlePreviews}
                  className="inline-flex justify-center rounded-md text-[#333333] px-6 py-2 text-sm font-semibold bg-white border cursor-pointer"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                onClick={handleContinue}
                className="inline-flex justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white cursor-pointer border"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPreviewComponent;
