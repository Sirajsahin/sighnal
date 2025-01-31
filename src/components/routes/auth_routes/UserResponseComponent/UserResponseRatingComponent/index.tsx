import { useEffect, useState } from "react";

const UserResponseRatingComponent = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);

  function transformData(mood, optionCounts, responsePercentage) {
    const transformedOptions = (mood || []).map((option) => ({
      item: option,
      percentage:
        responsePercentage?.find((oo) => oo.item === option)?.percentage ?? 0,
      count: optionCounts?.find((oo) => oo.item === option)?.count ?? 0,
    }));

    return { options: transformedOptions };
  }

  const responseArray =
    (data?.response_percentage &&
      Object.entries(data?.response_percentage)?.map(([item, percentage]) => ({
        item,
        percentage,
      }))) ||
    [];

  const options = Array.from(
    { length: parseInt("5") },
    (_, index) => `${index + 1}`
  );

  const option_countsArray =
    data?.option_counts &&
    Object.entries(data?.option_counts)?.map(([item, count]) => ({
      item,
      count,
    }));

  const result = transformData(options, option_countsArray, responseArray);

  useEffect(() => {
    if (result?.options?.length > 0) {
      const maxIndex = result?.options.reduce(
        (maxIdx, option, idx, arr) =>
          option.percentage > arr[maxIdx].percentage ? idx : maxIdx,
        0
      );
      setSelected(maxIndex);
    }
  }, [result]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 pt-2">
        {result?.options?.map((val, index) => {
          return (
            <div>
              <div>
                {val?.count} ({val?.percentage})
              </div>

              <div
                key={index}
                className={`text-sm mt-2 font-semibold  ${selected === index ? "bg-[#0C6243] text-white" : "bg-white "} px-6 rounded-lg text-center py-3  cursor-pointer `}
              >
                {val?.item}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-2/5">
        <div className="text-sm justify-between flex items-center my-3 w-full">
          <p>Very unsatisfied</p>
          <p>Very Satisfied</p>
        </div>
      </div>
    </div>
  );
};

export default UserResponseRatingComponent;
