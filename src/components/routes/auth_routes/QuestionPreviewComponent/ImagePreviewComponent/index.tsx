import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";

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
  useEffect(() => {
    setSelected([]);
  }, [type]);

  return (
    <div
      className={`${flage ? "grid-cols-4 grid" : "flex flex-col gap-4 h-44 overflow-auto"} gap-4 my-2`}
    >
      {data?.map((item, id) => (
        <div
          key={id}
          className={`relative w-full h-36 rounded-md cursor-pointer ${
            selected.includes(id) ? " border-black border-2" : ""
          }`}
          onClick={() => handleSelect(id)}
        >
          <img
            src={item?.link}
            alt={item?.file_name}
            className="w-full h-full rounded-md object-cover"
          />
          {selected.includes(id) && (
            <div className="absolute flex justify-center items-center inset-0 ">
              <MdDone className="w-8 h-8 text-black bg-white rounded-full p-1" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewComponent;
