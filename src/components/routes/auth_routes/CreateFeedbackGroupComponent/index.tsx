import { useCategoryListAPI } from "@/app/hooks/api_hooks/Campaign/useCampaignListApi";
import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";
import { useEffect } from "react";
import CreateSurveryComponent from "./CreateSurveryComponent";
import GroupCreateComponent from "./GroupCreateComponent";
import SurveyCreateComponent from "./SurveyCreateComponent";

const CreateFeedbackGroupComponent = () => {
  const { categoryList, execute: fetchCategory } = useCategoryListAPI();

  useEffect(() => {
    fetchCategory();
  }, []);

  console.log(categoryList, "categoryList");

  return (
    <div>
      <GroupHeaderComponent header="Group" />
      <div className="my-2 mt-4">
        <GroupCreateComponent />
      </div>
      <div className="my-5 mt-10">
        <GroupHeaderComponent header="Survey" />
      </div>
      <SurveyCreateComponent />
      <CreateSurveryComponent />
    </div>
  );
};

export default CreateFeedbackGroupComponent;
