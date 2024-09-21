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
import QuestionPreviewComponent from "../QuestionPreviewComponent";

const LiveCampaignPageComponent = () => {
  const [params, _setparams] = useSearchParams();

  const { getRouteKey } = useRouter();

  const { groupDetails } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;

  const { execute: fetchGroupDetails } = useGroupDetailsAPI();
  const { execute: fetchSurveyList } = useSurveyListAPI();

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
          <div className="col-span-8 bg-red-500">
            <QuestionPreviewComponent />
          </div>
          <div className="cols-span-4 gap-4">
            <div className=" bg-red-500 w-full">02</div>
            <div className=" bg-red-500 w-full">03</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveCampaignPageComponent;
