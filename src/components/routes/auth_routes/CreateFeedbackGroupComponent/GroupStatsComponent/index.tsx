import { useGroupStatsAPI } from "@/app/hooks/api_hooks/Group/useGroupStatsAPI";
import StatsCardComponent from "@/components/ui/StatsCardComponent";
import { useEffect } from "react";

const GroupStatsComponent = () => {
  const { execute: fetchGroupStats, groupStats } = useGroupStatsAPI();

  useEffect(() => {
    fetchGroupStats();
  }, []);

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
