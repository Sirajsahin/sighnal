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
const customerBookings = [
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
  {
    id: 1,
    group_name: "App Feedback",
    survey_name: "App Feedback",
    group_category: ["Gromming", "Clinic", "Opd Consultation"],
    startDate: "22 Jun 2024",
    endDate: "22 Jun 2024",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    responders: "455",
    percenteofresponder: "20%",
    status: "Live",
  },
];

const GroupListTableComponent = () => {
  return (
    <div className="overflow-y-scroll mt-3 ">
      <table className="min-w-full divide-y divide-gray-200 rounded-md">
        <thead className="bg-[#F6F6F7] sticky top-0   ">
          <tr>
            {tableHeader?.map((key, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-4  text-left whitespace-nowrap text-sm font-medium text-[#475467] capitalize tracking-wider sticky top-0 z-40 ${key.item === "Action" ? "sticky right-0 bg-gray-50 " : ""}`}
              >
                {key.item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className=" divide-y divide-gray-200  ">
          {customerBookings?.map((item) => (
            <tr key={item.id} className="border-b">
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                <div className="flex flex-col ">{item.id}</div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                {item.group_name}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                {item.survey_name}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                <div className="flex items-center gap-2">
                  {item.group_category.map((cc) => {
                    return (
                      <p className="font-medium text-[#333333] text-sm">{cc}</p>
                    );
                  })}
                  <div className="bg-black text-white rounded-xl p-1 text-xs cursor-pointer">
                    +2
                  </div>
                </div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium flex items-center gap-2`}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-[#333333] text-sm">
                    {item.startDate}
                  </p>
                  <p className="font-medium text-[#333333] text-sm">
                    {item.startTime}
                  </p>
                </div>
                <div className="px-4">-</div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-[#333333] text-sm">
                    {item.endDate}
                  </p>
                  <p className="font-medium text-[#333333] text-sm">
                    {item.endTime}
                  </p>
                </div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                <div className="flex gap-4 items-center">
                  {item.responders}{" "}
                  <span className="bg-red-300 rounded-full px-2 py-1 text-red-400">
                    {item.percenteofresponder}
                  </span>
                </div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium `}
              >
                {item.status}
              </td>

              <td
                className={`px-6 py-4 whitespace-nowrap text-[#333333] text-sm font-medium  sticky right-0 bg-gray-50 `}
              >
                Book
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupListTableComponent;
