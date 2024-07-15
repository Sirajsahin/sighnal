import { useSurveyStatsListAPI } from "@/app/hooks/api_hooks/Group/useSurveyStatsListAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SurveyStatsComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchGroupStats, groupStats } = useSurveyStatsListAPI();
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupStats(groupId);
    }
  }, [params.get("group_id")]);

  const handleCardClick = (status) => {
    setSelectedStatus(status);
    // Call the filter API here with the status
    // For example:
    console.log(`Filter API called with status: ${status}`);
    // Add the actual API call logic here
  };
  return (
    <div className=" grid grid-cols-5 gap-6">
      {groupStats?.map((val, id) => {
        const isSelected = selectedStatus === val?.status;

        return (
          <div key={id}>
            <StatsCardComponent
              cardText={val?.status}
              cardValue={val?.count}
              handelCallback={() => handleCardClick(val.status)}
              isSelected={isSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyStatsComponent;
