import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function CheckBoxComponent() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group size-6  border rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
    >
      <CheckIcon className="hidden size-4 fill-green-600 group-data-[checked]:block" />
    </Checkbox>
  );
}
