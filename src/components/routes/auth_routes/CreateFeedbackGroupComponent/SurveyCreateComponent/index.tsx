import {
  ISurveyListProps,
  useSurveyListAPI,
} from "@/app/hooks/api_hooks/Group/useSurveyListAPI";
import { useSurveyStatsListAPI } from "@/app/hooks/api_hooks/Group/useSurveyStatsListAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SurveyStatsComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchGroupStats, groupStats } = useSurveyStatsListAPI();
  const [selectedStatus, setSelectedStatus] = useState("total");
  const { execute: fetchSurveyList } = useSurveyListAPI();

  const groupId = params.get("group_id");

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupStats(groupId);
    }
  }, [params.get("group_id")]);

  const handleCardClick = (status) => {
    setSelectedStatus(status);
    const constructedData: ISurveyListProps = {
      status: status,
      group_id: groupId,
    };
    fetchSurveyList(constructedData);
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
