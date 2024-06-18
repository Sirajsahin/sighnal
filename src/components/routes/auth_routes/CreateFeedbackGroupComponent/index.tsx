import { useCategoryListAPI } from "@/app/hooks/api_hooks/Campaign/useCampaignListApi";
import GroupHeaderComponent from "@/components/ui/GroupHeaderComponent";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import GroupListComponent from "./GroupListComponent";
import GroupListTableComponent from "./GroupListTableComponent";
import GroupStatsComponent from "./GroupStatsComponent";
import ViewAllGroupModalComponent from "./ViewAllGroupModalComponent";

const CreateFeedbackGroupComponent = () => {
  const { categoryList, execute: fetchCategory } = useCategoryListAPI();
  const [viewAll, setViewAll] = useState<boolean>(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  console.log(categoryList, "categoryList");

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <GroupHeaderComponent
          header="Group"
          para="Streamline your product feedback process with Product Feedback Surveys."
        />
        <div className="w-full flex justify-end">
          <p
            className="text-sm font-medium float-right text-[#333333] items-center flex gap-1 cursor-pointer"
            onClick={() => setViewAll(true)}
          >
            View all <MdChevronRight className="w-4 h-4 text-sm" />
          </p>
        </div>
      </div>
      <div className="my-2 mt-4">
        <GroupListComponent />
      </div>
      <div className="my-5 mt-10">
        <GroupHeaderComponent
          header="Survey"
          para="You can monitor your Live, Upcoming and Completed surveys from all the groups."
        />
      </div>
      <GroupStatsComponent />
      <GroupListTableComponent />
      {viewAll && (
        <ViewAllGroupModalComponent open={viewAll} setOpen={setViewAll} />
      )}
    </div>
  );
};

export default CreateFeedbackGroupComponent;
