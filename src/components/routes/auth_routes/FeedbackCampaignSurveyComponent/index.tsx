import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";

import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CreateSurveryComponent from "../CreateFeedbackGroupComponent/CreateSurveryComponent";

import SurveyStatsComponent from "../CreateFeedbackGroupComponent/SurveyCreateComponent";
import AddGroupUserComponent from "./AddGroupUserComponent";
import ThreeDotComponent from "./ThreeDotComponent";
const FeedbackCampaignSurveyComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchGroupDetails, groupDetails } = useGroupDetailsAPI();
  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupDetails(groupId);
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
          <AddGroupUserComponent />
        </div>
        <div className="col-span-1">
          <div className="flex justify-end">
            <ThreeDotComponent />
          </div>
        </div>
      </div>
      <div className="my-5 mt-10">
        <GroupHeaderComponent header="Survey" />
      </div>
      <SurveyStatsComponent />
      <CreateSurveryComponent />
    </div>
  );
};
export default FeedbackCampaignSurveyComponent;
