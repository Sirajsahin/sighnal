import { useSurveyListAPI } from "@/app/hooks/api_hooks/Group/useSurveyListAPI";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const tableHeader = [
  {
    item: "S.No",
  },
  {
    item: "Group Name",
  },
  {
    item: "Survey Name",
  },
  {
    item: "Category of User",
  },
  {
    item: "Start Time - End Time",
  },
  {
    item: "Number of Responders",
  },
  {
    item: "Status",
  },
  {
    item: "Action",
  },
];
const tableHeader2 = [
  {
    item: "S.No",
  },
  {
    item: "Survey Name",
  },
  {
    item: "Category of User",
  },
  {
    item: "Start Time - End Time",
  },
  {
    item: "Number of Responders",
  },
  {
    item: "Status",
  },
  {
    item: "Action",
  },
];

const GroupListTableComponent = ({ source }) => {
  const { getRouteKey } = useRouter();
  const [params, _setparams] = useSearchParams();

  const { surveyList } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;
  const { execute: fetchSurveyList } = useSurveyListAPI();

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchSurveyList({ status: "total", group_id: groupId });
    } else {
      fetchSurveyList({ status: "total" });
    }
  }, [params.get("group_id")]);

  const handelResponderPercentage = (
    response_count: number,
    total_sent: number
  ) => {
    const percentage = response_count / total_sent / 100;
    return percentage;
  };

  return (
    <>
      {surveyList?.length > 0 && (
        <div className="overflow-x-auto overflow-y-auto mt-3 max-h-[438px] shadow-md rounded-md">
          <table className="min-w-full divide-y divide-gray-200 rounded-md">
            <thead className="bg-[#F6F6F7] sticky top-0">
              <tr>
                {source
                  ? tableHeader?.map((key, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-6 py-4 text-left whitespace-nowrap text-sm font-medium text-[#475467] capitalize tracking-wider sticky top-0 z-40  ${key.item === "Action" && "sticky right-0 bg-gray-50 "}`}
                      >
                        {key.item}
                      </th>
                    ))
                  : tableHeader2?.map((key, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-6 py-4 text-left whitespace-nowrap text-sm font-medium text-[#475467] capitalize tracking-wider sticky top-0 z-40  ${key.item === "Action" && "sticky right-0 bg-gray-50 "}`}
                      >
                        {key.item}
                      </th>
                    ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {surveyList?.map((item, id) => (
                <tr key={id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                    <div className="flex flex-col">{id + 1}</div>
                  </td>
                  {source && (
                    <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                      {item?.group_name}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                    {item?.survey_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                    {item?.tags && (
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#333333] text-sm">
                          {item?.tags[0]}
                        </p>
                        <p className="font-medium text-[#333333] text-sm">
                          {item?.tags[1]}
                        </p>

                        {item?.tags?.length > 3 && (
                          <div className="bg-black text-white rounded-xl p-1 text-xs cursor-pointer">
                            {item?.tags?.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-[#333333] text-sm">
                        {item?.start_date}
                      </p>
                      <p className="font-medium text-[#333333] text-sm">
                        {item?.start_time}
                      </p>
                    </div>
                    <div className="px-4">-</div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-[#333333] text-sm">
                        {item?.end_date}
                      </p>
                      <p className="font-medium text-[#333333] text-sm">
                        {item?.end_time}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                    <div className="flex gap-4 items-center">
                      {item?.response_count}{" "}
                      <span
                        className={`${
                          handelResponderPercentage(
                            item?.response_count,
                            item?.total_sent
                          ) < 50
                            ? "bg-[#FFD7CA] text-[#CA6100]"
                            : "bg-[#C6FFDD] text-[#129045] "
                        } rounded-full px-2 py-1 font-semibold `}
                      >
                        {handelResponderPercentage(
                          item?.response_count,
                          item?.total_sent
                        )}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium">
                    . &nbsp;{item?.status}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium sticky  right-0 bg-gray-50 -z-10"
                    style={{ width: "100px" }}
                  >
                    Book
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GroupListTableComponent;
