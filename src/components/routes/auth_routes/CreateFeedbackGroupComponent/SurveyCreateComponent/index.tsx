import StatsCardComponent from "@/components/ui/StatsCardComponent";

const data = [
  {
    item: "Live",
    number: "0",
  },
  {
    item: "Upcoming",
    number: "0",
  },
  {
    item: "Completed",
    number: "0",
  },
  {
    item: "Total",
    number: "0",
  },
];
const SurveyCreateComponent = () => {
  return (
    <div className=" grid grid-cols-4 gap-4">
      {data.map((val, id) => {
        return (
          <div key={id}>
            <StatsCardComponent cardText={val?.item} cardValue={val?.number} />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyCreateComponent;
