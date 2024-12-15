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
      className={`${flage ? "grid grid-cols-2" : "flex flex-col gap-4"} gap-4 my-2 ${
        !flage ? "overflow-auto max-h-[500px]" : ""
      }`}
    >
      {data?.map((item, id) => (
        <div
          key={id}
          className={`${flage ? "max-w-[400px] h-[500px]" : "h-[300px]"} rounded-xl cursor-pointer relative border-2 bg-white `}
          onClick={() => handleSelect(id)}
        >
          {/* Image */}
          <img
            src={item?.link}
            alt={item?.file_name}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 rounded-xl flex justify-center items-center transition-opacity duration-300 ${
              selected.includes(id) ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Checkmark */}
            <MdDone className="w-8 h-8 text-white bg-black rounded-full p-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewComponent;
