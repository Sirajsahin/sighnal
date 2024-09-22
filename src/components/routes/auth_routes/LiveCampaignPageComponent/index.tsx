import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";

import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  ISurveyListProps,
  useSurveyListAPI,
} from "@/app/hooks/api_hooks/Group/useSurveyListAPI";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import ThreeDotComponent from "../FeedbackCampaignSurveyComponent/ThreeDotComponent";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useQuestionPreviewAPI } from "@/app/hooks/api_hooks/Group/useQuestionPreviewAPI";
import OptionComponent from "../QuestionPreviewComponent/OptionComponent";
import MultipleOptionComponent from "../QuestionPreviewComponent/MultipleOptionComponent";
import NPSComponent from "../QuestionPreviewComponent/NPSComponent";
import RatingComponent from "../QuestionPreviewComponent/RatingComponent";
import OpenTextArea from "../QuestionPreviewComponent/OpenTextArea";
import ImagePreviewComponent from "../QuestionPreviewComponent/ImagePreviewComponent";

const LiveCampaignPageComponent = () => {
  const [params, _setparams] = useSearchParams();

  const { getRouteKey } = useRouter();

  const { groupDetails } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;

  const { execute: fetchGroupDetails } = useGroupDetailsAPI();
  const { execute: fetchSurveyList } = useSurveyListAPI();
  const { execute: fetchQuestionDetails, prevQuestionDetails } =
    useQuestionPreviewAPI();

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupDetails(groupId);
      const cc: ISurveyListProps = {
        group_id: groupId,
        status: "total",
      };
      fetchSurveyList(cc);
    }
  }, [params.get("group_id")]);

  useEffect(() => {
    const survey_id = params.get("survey_id");
    const group_id = params.get("group_id");
    if (group_id && survey_id) {
      fetchQuestionDetails(group_id, survey_id);
    }
  }, [params.get("survey_id")]);

  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-span-7">
          <GroupHeaderComponent
            header={groupDetails?.group_name}
            para={groupDetails?.group_description}
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
          <div className="col-span-8 ">
            {prevQuestionDetails?.map((question, id) => {
              return (
                <div className="py-3">
                  <Disclosure key={id} defaultOpen={id === 0}>
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
                              <OptionComponent data={question?.options} />
                            </div>
                          )}
                          {question.question_type_id === "multiple_choice" && (
                            <div>
                              <MultipleOptionComponent
                                data={question?.options}
                              />
                            </div>
                          )}
                          {question.question_type_id === "mood_scale" && (
                            <div>
                              <NPSComponent
                                data={question?.mood}
                                flage={true}
                              />
                            </div>
                          )}
                          {question.question_type_id === "rating_scale" && (
                            <div>
                              <RatingComponent
                                data={question?.mood}
                                flage={true}
                              />
                            </div>
                          )}
                          {question.question_type_id ===
                            "open_text_response" && (
                            <div>
                              <OpenTextArea />
                            </div>
                          )}
                          {question.question_type_id ===
                            "image_single_choice" && (
                            <div>
                              <ImagePreviewComponent
                                data={question?.image}
                                flage={false}
                                type={false}
                              />
                            </div>
                          )}
                          {question.question_type_id ===
                            "image_multiple_choice" && (
                            <div>
                              <ImagePreviewComponent
                                data={question?.image}
                                flage={false}
                                type={false}
                              />
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
