import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";

import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateSurveryComponent from "../CreateFeedbackGroupComponent/CreateSurveryComponent";

import {
  ISurveyListProps,
  useSurveyListAPI,
} from "@/app/hooks/api_hooks/Group/useSurveyListAPI";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import GroupuserTableComponent from "@/components/ui/Modal/GroupUploadUsersModalComponent/GroupuserTableComponent";
import GroupListTableComponent from "../CreateFeedbackGroupComponent/GroupListTableComponent";
import SurveyStatsComponent from "../CreateFeedbackGroupComponent/SurveyCreateComponent";
import AddGroupUserComponent from "./AddGroupUserComponent";
import ThreeDotComponent from "./ThreeDotComponent";
const FeedbackCampaignSurveyComponent = () => {
  const [params, _setparams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);

  const { getRouteKey } = useRouter();

  const { surveyList, groupDetails } = useRouteInfo(
    getRouteKey("HOME_PAGE", "id")
  )?.routeState?.state as ISurvetSliceState;

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
          {groupDetails?.tags?.length > 0 ? (
            <div className="flex items-center gap-2">
              <div className="w-auto flex gap-2 items-center my-4 flex-wrap">
                {[...new Set(groupDetails?.tags)]?.map((category) => (
                  <p
                    key={category}
                    className={`p-2 w-auto rounded-2xl text-xs items-center flex justify-center font-medium 
                    bg-[#F5F5F5]
                  }`}
                  >
                    {category}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setOpen(true)}
                className={`p-1 px-2 w-auto rounded-2xl text-xs items-center text-white flex justify-center font-medium cursor-pointer
                    bg-[#333333]
                  }`}
              >
                View All
              </button>
            </div>
          ) : (
            <AddGroupUserComponent />
          )}
        </div>
        <div className="col-span-1">
          <div className="flex justify-end">
            <ThreeDotComponent />
          </div>
        </div>
      </div>
      {open && <GroupuserTableComponent setOpen={setOpen} open={open} />}

      <div className="my-5 mt-10 flex justify-between ">
        <GroupHeaderComponent header="Survey" />
        <div className="w-48">
          {surveyList?.length > 0 && <CreateSurveryComponent flage={true} />}
        </div>
      </div>
      <SurveyStatsComponent />
      {surveyList?.length > 0 && <GroupListTableComponent source={false} />}
      {surveyList?.length === 0 && <CreateSurveryComponent flage={false} />}
    </div>
  );
};
export default FeedbackCampaignSurveyComponent;
