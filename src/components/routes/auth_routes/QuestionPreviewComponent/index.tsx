import { useQuestionPreviewAPI } from "@/app/hooks/api_hooks/Group/useQuestionPreviewAPI";
import { useSurveyDetailsAPI } from "@/app/hooks/api_hooks/Group/useSurveyDetailsAPI";
import { useOrganizationDetailsAPI } from "@/app/hooks/api_hooks/user/useOrganizationDetailsAPI";
import { useEffect, useState } from "react";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImagePreviewComponent from "./ImagePreviewComponent";
import MultipleOptionComponent from "./MultipleOptionComponent";
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
  const { execute: fetchOrganizationDetailsAPI, organization } =
    useOrganizationDetailsAPI();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [prevFlage, setPrevFlage] = useState<boolean>(true);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Maximum length for truncated text

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

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
        return <OptionComponent data={currentQuestion?.options} />;
      case "multiple_choice":
        return <MultipleOptionComponent data={currentQuestion?.options} />;
      case "mood_scale":
        return <NPSComponent data={currentQuestion?.mood} flage={prevFlage} />;
      case "rating_scale":
        return (
          <RatingComponent
            data={currentQuestion?.rating_scale}
            flage={prevFlage}
          />
        );
      case "open_text_response":
        return <OpenTextArea />;
      case "image_single_choice":
        return (
          <ImagePreviewComponent
            data={currentQuestion?.image}
            flage={prevFlage}
            type={false}
          />
        );
      case "image_multiple_choice":
        return (
          <ImagePreviewComponent
            data={currentQuestion?.image}
            flage={prevFlage}
            type={true}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchServeyDetails(params.get("survey_id"));
    fetchOrganizationDetailsAPI();
  }, []);

  const handelBack = () => {
    navigate(
      `/app/campaign/create-survey?step_id=3&group_id=${params.get("group_id")}&survey_id=${params.get("survey_id")}`
    );
  };
  console.log(currentQuestionIndex, "currentQuestionIndex");
  return (
    <div className="">
      <div className="grid-cols-3 grid items-center border-b  pb-4 ">
        <div className=" flex items-center gap-3 font-bold cursor-pointer">
          <button
            type="submit"
            className="w-auto justify-center flex items-center gap-1 rounded-md bg-white text-[#333333]  px-4 py-2 text-sm font-medium"
            onClick={() => handelBack()}
          >
            <MdOutlineKeyboardBackspace className="w-4 h-4" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center  bg-black w-[100px] justify-center p-2 rounded-lg gap-4">
            <SlScreenDesktop
              className={`w-6 h-6 fill-white cursor-pointer p-1 rounded-md ${prevFlage && "bg-white bg-opacity-20 "}`}
              onClick={() => setPrevFlage(true)}
            />
            <CiMobile1
              className={`w-6 h-6 fill-white cursor-pointer p-1 rounded-md ${!prevFlage && "bg-white bg-opacity-20 "}`}
              onClick={() => setPrevFlage(false)}
            />
          </div>
        </div>
        <div></div>
      </div>
      {prevFlage ? (
        <div className="grid grid-cols-3 gap-14 my-10 mx-14">
          <div className="grid grid-cols-4">
            <div className="col-span-4">
              <div className="mb-4">
                <div className="h-20 w-20 rounded-full bg-[#D9D9D9] flex items-center justify-center relative overflow-hidden cursor-pointer">
                  {organization?.icon && (
                    <img
                      src={organization?.icon}
                      alt="Company Logo"
                      className="h-full w-full object-cover rounded-full cursor-pointer"
                    />
                  )}
                </div>
              </div>
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
              Question {currentQuestionIndex + 1} to{" "}
              {prevQuestionDetails?.length}
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
                {prevQuestionDetails?.length ===
                currentQuestionIndex + 1 ? null : (
                  <button
                    type="submit"
                    onClick={handleContinue}
                    className="inline-flex justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white cursor-pointer border"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full my-10">
          <div className="border-[5px] border-opacity-20 border-gray-500 w-[370px] min-h-[700px] p-4 rounded-2xl">
            <div>
              <div className="">
                <div className="h-20 w-20 rounded-full bg-[#D9D9D9] flex items-center justify-center relative overflow-hidden cursor-pointer">
                  {organization?.icon && (
                    <img
                      src={organization?.icon}
                      alt="Company Logo"
                      className="h-full w-full object-cover rounded-full cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <h3 className="font-bold text-xl my-3">
                {serveyDetails?.survey_name}
              </h3>
              <p className="text-sm my-3 text-[#475467] font-normal">
                {isExpanded
                  ? serveyDetails?.survey_description
                  : serveyDetails?.survey_description?.slice(0, 100)}
                {serveyDetails?.survey_description?.length > maxLength &&
                  !isExpanded && (
                    <span
                      onClick={toggleExpansion}
                      className="text-sm text-[#0C6243] font-medium underline cursor-pointer"
                    >
                      {isExpanded ? "Read Less" : "Read More"} ...
                    </span>
                  )}
              </p>
            </div>
            <div>
              <p className="text-xs mt-3">
                Question {currentQuestionIndex + 1} to{" "}
                {prevQuestionDetails?.length}
              </p>
              <div className="h-auto bg-[#4754670D] p-5 rounded-xl flex flex-col gap-4 mt-2">
                <p className="text-sm text-[#333333] font-medium">
                  {currentQuestion?.question}
                </p>
                {renderQuestionComponent()}
                <div
                  className={`flex items-center gap-${currentQuestion?.can_skipped === "true" && "5"} `}
                >
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
                      className="inline-flex justify-center rounded-md text-[#333333] px-6 py-2 text-sm font-semibold  cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  {prevQuestionDetails?.length ===
                  currentQuestionIndex + 1 ? null : (
                    <button
                      type="submit"
                      onClick={handleContinue}
                      className="inline-flex justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white cursor-pointer border-transparent"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPreviewComponent;
