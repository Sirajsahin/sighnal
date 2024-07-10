import { useSurveyStatsListAPI } from "@/app/hooks/api_hooks/Group/useSurveyStatsListAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SurveyStatsComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchGroupStats, groupStats } = useSurveyStatsListAPI();
  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupStats(groupId);
    }
  }, [params.get("group_id")]);

  return (
    <div className=" grid grid-cols-5 gap-6">
      {groupStats?.map((val, id) => {
        return (
          <div key={id}>
            <StatsCardComponent cardText={val?.status} cardValue={val?.count} />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyStatsComponent;
