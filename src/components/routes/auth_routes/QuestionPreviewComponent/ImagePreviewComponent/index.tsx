import { useState } from "react";

const ImagePreviewComponent = ({ data, flage, type }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    if (type) {
      // Multiple selection mode
      if (selected.includes(id)) {
        setSelected(selected.filter((item) => item !== id));
      } else {
        setSelected([...selected, id]);
      }
    } else {
      // Single selection mode
      setSelected([id]);
    }
  };

  return (
    <div
      className={`${flage ? "grid-cols-4 grid" : "flex flex-col gap-4 h-44 overflow-auto"} gap-4 my-2`}
    >
      {data.map((item, id) => {
        return (
          <div
            key={id}
            className={`w-full h-36 rounded-md ${selected.includes(id) && "border border-red-500"}`}
            onClick={() => handleSelect(id)}
          >
            <img
              src={item?.link}
              alt={item?.file_name}
              className="w-[100%] h-[100%] rounded-md cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreviewComponent;
