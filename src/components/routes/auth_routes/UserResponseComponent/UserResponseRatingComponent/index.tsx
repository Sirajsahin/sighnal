import { useState } from "react";

const ratingRangeData5 = [
  {
    item: "1",
  },
  {
    item: "2",
  },
  {
    item: "3",
  },
  {
    item: "4",
  },
  {
    item: "5",
  },
];

const UserResponseRatingComponent = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  console.log(data, "data");
  const handleOptionClick = (option: number) => {
    setSelected(option);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 pt-2">
        {ratingRangeData5?.map((val, index) => {
          return (
            <div>
              <div>50 (60%)</div>

              <div
                key={index}
                className={`text-sm mt-2 font-semibold  ${selected === index ? "bg-[#0C6243] text-white" : "bg-white "} px-6 rounded-lg text-center py-3  cursor-pointer `}
                onClick={() => handleOptionClick(index)}
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

// const UserResponseRatingComponent = ({ data, flage }) => {
//   const [selected, setSelected] = useState<number>(null);

//   const createRatingData = (value: string) => {
//     const item = [];
//     for (let i = 1; i <= parseInt(value); i++) {
//       item.push(`${i}`);
//     }
//     return item;
//   };
//   return (
//     <div>
//       <div className={`grid grid-cols-${flage ? "12" : "5"} gap-3  `}>
//         {createRatingData(data)?.map((val, index) => {
//           return (
//             <div
//               key={index}
//               className={`text-sm font-semibold  ${selected === index ? "bg-[#0C6243] text-white" : "bg-white "} p-3 rounded-lg text-center py-3  cursor-pointer `}
//               onClick={() => setSelected(index)}
//             >
//               {val}
//             </div>
//           );
//         })}
//       </div>
//       {flage && (
//         <div className="w-2/5">
//           <div className="text-sm justify-between flex items-center my-3 w-full">
//             <p>Very unsatisfied</p>
//             <p>Very Satisfied</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserResponseRatingComponent;
