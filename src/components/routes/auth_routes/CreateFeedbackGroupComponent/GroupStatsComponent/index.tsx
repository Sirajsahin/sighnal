import { useGroupStatsListAPI } from "@/app/hooks/api_hooks/Group/useGroupStatsListAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GroupStatsComponent = () => {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchGroupStats, groupStats } = useGroupStatsListAPI();
  useEffect(() => {
    const buisnessId = params.get("business_id");
    const groupId = params.get("group_id");
    if (buisnessId && groupId) {
      fetchGroupStats(buisnessId, groupId);
    }
  }, [params.get("business_id"), params.get("group_id")]);

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

export default GroupStatsComponent;
