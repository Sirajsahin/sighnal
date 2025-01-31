import { useEffect, useState } from "react";

const UserResponseImageComponent = ({ data }) => {
  const [selected, setSelected] = useState<number[]>([]);
  function transformData(mood, optionCounts, responsePercentage) {
    const transformedOptions = (mood || []).map((option) => {
      // Find the matching count and percentage from the concatenated links
      const matchingOptionCount = optionCounts?.find((oo) =>
        oo.item.split("||").includes(option.link)
      );
      const matchingResponsePercentage = responsePercentage?.find((oo) =>
        oo.item.split("||").includes(option.link)
      );

      return {
        item: option,
        percentage: matchingResponsePercentage?.percentage ?? 0,
        count: matchingOptionCount?.count ?? 0,
      };
    });

    return { options: transformedOptions };
  }

  // Prepare response percentage array (from object to array)
  const responseArray = data?.response_percentage
    ? Object.entries(data?.response_percentage).map(([item, percentage]) => ({
        item,
        percentage,
      }))
    : [];

  // Prepare option counts array (from object to array)
  const optionArray = data?.option_counts
    ? Object.entries(data?.option_counts).map(([item, count]) => ({
        item,
        count,
      }))
    : [];

  // Use the 'image' array instead of the empty 'mood' array
  const result = transformData(data?.image, optionArray, responseArray);

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

  console.log(data, "mood");

  // console.log(data?.response_percentage, "data?.response_percentage");
  return (
    <div className={``}>
      {result?.options?.map((item, id) => (
        <div>
          <div key={id} className={` rounded-xl  relative border-2 bg-white `}>
            {/* Image */}
            <div className="h-auto w-auto">
              <img
                src={item?.item?.link}
                alt={item?.item?.file_name}
                className="w-auto h-auto object-cover rounded-xl"
              />
            </div>
          </div>
          <div
            key={id}
            className={` ${selected === id ? "bg-[#0C6243] text-white" : "bg-gray-200 text-black "}  text-sm  w-full h-auto flex rounded-lg  p-2 justify-between items-center  transition-all duration-600 my-3 `}
          >
            <span className="w-full">{item?.percentage} % </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserResponseImageComponent;
