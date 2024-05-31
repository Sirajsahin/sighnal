import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";
import GroupCreateComponent from "./GroupCreateComponent";
import SurveyCreateComponent from "./SurveyCreateComponent";
import CreateSurveryComponent from "./CreateSurveryComponent";

const CreateFeedbackGroupComponent = () => {
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
