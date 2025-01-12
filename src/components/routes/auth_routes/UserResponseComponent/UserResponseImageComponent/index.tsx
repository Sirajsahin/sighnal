import { useEffect, useState } from "react";

const UserResponseImageComponent = ({ data, type }) => {
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
    <div className={``}>
      {data?.map((item, id) => (
        <div>
          <div
            key={id}
            className={` rounded-xl  relative border-2 bg-white `}
            onClick={() => handleSelect(id)}
          >
            {/* Image */}
            <div className="h-auto w-auto">
              <img
                src={item?.link}
                alt={item?.file_name}
                className="w-auto h-auto object-cover rounded-xl"
              />
            </div>
          </div>
          <div
            className={`bg-[#0C6243] text-white text-sm  w-full h-auto flex rounded-lg  p-2 justify-between items-center  transition-all duration-600 my-3 `}
          >
            <span className="w-full">70%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserResponseImageComponent;
