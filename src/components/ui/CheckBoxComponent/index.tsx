import { Checkbox } from "@headlessui/react";
import { IoMdCheckmark } from "react-icons/io";

import { useState } from "react";

export default function CheckBoxComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className={`group size-5 border rounded-md  ring-1 ring-inset flex justify-center items-center ${
        enabled ? "bg-black ring-black" : "bg-white ring-white"
      }`}
    >
      <IoMdCheckmark
        className={` h-4 w-4 ${
          enabled
            ? "fill-white   text-white"
            : "fill-green-600 hidden group-data-[checked]:block"
        }`}
      />
    </Checkbox>
  );
}
