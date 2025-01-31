import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ThreeDotComponent from "../FeedbackCampaignSurveyComponent/ThreeDotComponent";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserResponseOptionComponent from "../UserResponseComponent/UserResponseOptionComponent";
import UserResponseNPSComponent from "../UserResponseComponent/UserResponseNPSComponent";
import UserResponseRatingComponent from "../UserResponseComponent/UserResponseRatingComponent";
import UserResponseOpenTextArea from "../UserResponseComponent/UserResponseOpenTextArea";
import UserResponseImageComponent from "../UserResponseComponent/UserResponseImageComponent";
import { useQuestionResponseAPI } from "@/app/hooks/api_hooks/Group/useQuestionResponseAPI";

const LiveCampaignPageComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchQuestionDetails, prevQuestionDetails } =
    useQuestionResponseAPI();

  useEffect(() => {
    const survey_id = params.get("survey_id");
    if (survey_id) {
      fetchQuestionDetails(survey_id);
    }
  }, [params.get("survey_id")]);

  return (
    <div>
      <div className="grid grid-cols-8 mb-3 sticky top-0">
        <div className="col-span-7">
          <GroupHeaderComponent
            header={prevQuestionDetails?.survey_name}
            para={prevQuestionDetails?.survey_description}
          />
        </div>
        <div className="col-span-1">
          <div className="flex justify-end">
            <ThreeDotComponent />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 grid-flow-col gap-4">
          <div className="col-span-8 h-[83vh] overflow-auto">
            {prevQuestionDetails?.result?.map((question, id) => {
              return (
                <div className="py-3">
                  <Disclosure key={id} defaultOpen={true}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={` px-3 py-5 items-center flex w-full justify-between ${open ? "rounded-t-lg rounded-tl-lg" : "rounded-lg"}  bg-[#F5F5F5] text-left text-sm font-medium  focus:outline-none `}
                        >
                          <div className="flex flex-row gap-16 items-center">
                            <div className="flex flex-col gap-1 text-sm">
                              Question {id + 1}
                            </div>
                          </div>
                          <ChevronDownIcon
                            className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-5  text-sm text-gray-500 bg-[#F5F5F5] rounded-b-lg rounded-bl-lg -mt-2">
                          <p className="text-sm text-[#333333] font-medium pb-4">
                            {question?.question}
                          </p>
                          {question.question_type_id === "single_choice" && (
                            <div>
                              <UserResponseOptionComponent data={question} />
                            </div>
                          )}
                          {question.question_type_id === "multiple_choice" && (
                            <div>
                              <UserResponseOptionComponent data={question} />
                            </div>
                          )}
                          {question.question_type_id === "mood_scale" && (
                            <div>
                              <UserResponseNPSComponent
                                data={question}
                                flage={true}
                              />
                            </div>
                          )}
                          {question.question_type_id === "rating_scale" && (
                            <div>
                              <UserResponseRatingComponent data={question} />
                            </div>
                          )}
                          {question.question_type_id ===
                            "open_text_response" && (
                            <div>
                              <UserResponseOpenTextArea />
                            </div>
                          )}
                          {question.question_type_id ===
                            "image_single_choice" && (
                            <div>
                              <UserResponseImageComponent data={question} />
                            </div>
                          )}
                          {question.question_type_id ===
                            "image_multiple_choice" && (
                            <div>
                              <UserResponseImageComponent data={question} />
                            </div>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              );
            })}
          </div>
          <div className="col-span-4 gap-4 mt-3">
            <div className="flex flex-col gap-4">
              <div className=" bg-[#F5F5F5] h-[20vh] w-full rounded-lg"></div>
              <div className=" bg-[#F5F5F5] h-[60vh] w-full rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveCampaignPageComponent;
