import { useGroupStatsAPI } from "@/app/hooks/api_hooks/Group/useGroupStatsAPI";
import {
  ISurveyListProps,
  useSurveyListAPI,
} from "@/app/hooks/api_hooks/Group/useSurveyListAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect, useState } from "react";

const GroupStatsComponent = () => {
  const { execute: fetchGroupStats, groupStats } = useGroupStatsAPI();
  const [selectedStatus, setSelectedStatus] = useState("total");
  const { execute: fetchSurveyList } = useSurveyListAPI();

  useEffect(() => {
    fetchGroupStats();
  }, []);

  const handleCardClick = (status) => {
    setSelectedStatus(status);
    const constructedData: ISurveyListProps = {
      status: status,
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

export default GroupStatsComponent;
