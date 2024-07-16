import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";

import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CreateSurveryComponent from "../CreateFeedbackGroupComponent/CreateSurveryComponent";

import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import GroupListTableComponent from "../CreateFeedbackGroupComponent/GroupListTableComponent";
import SurveyStatsComponent from "../CreateFeedbackGroupComponent/SurveyCreateComponent";
import AddGroupUserComponent from "./AddGroupUserComponent";
import ThreeDotComponent from "./ThreeDotComponent";
const FeedbackCampaignSurveyComponent = () => {
  const [params, _setparams] = useSearchParams();

  const { getRouteKey } = useRouter();

  const { surveyList } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;

  const { execute: fetchGroupDetails, groupDetails } = useGroupDetailsAPI();
  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupDetails(groupId);
    }
  }, [params.get("group_id")]);

  console.log(surveyList?.length === 0, "surveyList");

  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-span-7">
          <GroupHeaderComponent
            header={groupDetails?.group_name}
            para={groupDetails?.group_description}
          />
          <AddGroupUserComponent />
        </div>
        <div className="col-span-1">
          <div className="flex justify-end">
            <ThreeDotComponent />
          </div>
        </div>
      </div>
      <div className="my-5 mt-10 flex justify-between ">
        <GroupHeaderComponent header="Survey" />
        {surveyList?.length > 0 && <CreateSurveryComponent flage={true} />}
      </div>
      <SurveyStatsComponent />
      <GroupListTableComponent source={false} />
      {surveyList?.length === 0 && <CreateSurveryComponent flage={false} />}
    </div>
  );
};
export default FeedbackCampaignSurveyComponent;
