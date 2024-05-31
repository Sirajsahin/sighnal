import { useState } from "react";
import CreateSurveyModal from "../CreateSurveyModal";

export default function GroupCreateComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-1/3 p-4 rounded-xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]">
        <div className="flex  items-center gap-3">
          <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
          <p className="text-sm font-bold text-black">Create a New Group</p>
        </div>
        <div className="py-4">
          <hr className="border-solid border-1  border-[#F5F5F5]" />
        </div>

        <p className="text-[#475467] text-xs">
          Create a group and launch your survey to receive responses in minutes.
        </p>
        <div className="mt-6">
          <button
            className="text-white bg-[#0C6545] w-full font-bold p-3 rounded-lg text-sm border-transparent"
            onClick={() => setOpen(true)}
          >
            Create Group
          </button>
        </div>
      </div>

      {open && <CreateSurveyModal open={open} setOpen={setOpen} />}
    </>
  );
}
