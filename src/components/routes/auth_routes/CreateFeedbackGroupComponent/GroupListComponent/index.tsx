import { useState } from "react";
import GroupCreateModalComponent from "../GroupCreateModalComponent";

export default function GroupListComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className=" p-4 rounded-2xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]">
          <div className="flex  items-center gap-3">
            <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
            <p className="text-sm font-bold text-[#333333]">
              Create a New Group
            </p>
          </div>
          <div className="py-4">
            <hr className="border-solid border-1  border-[#F5F5F5]" />
          </div>

          <p className="text-[#475467] text-xs">
            Create a group and launch your survey to receive responses in
            minutes.
          </p>
          <div className="mt-8">
            <button
              className="text-white bg-[#0C6545] w-full font-bold p-3 rounded-lg text-sm border-transparent"
              onClick={() => setOpen(true)}
            >
              Create Group
            </button>
          </div>
        </div>
        <div className=" p-4 rounded-2xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]">
          <div className="flex  items-center gap-3">
            <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
            <p className="text-sm font-bold text-[#333333]">App Feedback</p>
          </div>
          <div className="py-4">
            <hr className="border-solid border-1  border-[#F5F5F5]" />
          </div>

          <p className="text-[#475467] text-xs">
            Create a group and launch your survey to receive responses in
            minutes.
          </p>
          <div className="mt-8">
            <button
              className="text-[##333333] border   w-full font-bold p-3 rounded-lg text-sm  border-[#333333]"
              onClick={() => setOpen(true)}
            >
              View Indetails
            </button>
          </div>
        </div>
        <div className=" p-4 rounded-2xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]">
          <div className="flex  items-center gap-3">
            <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
            <p className="text-sm font-bold text-[#333333]">Clinic</p>
          </div>
          <div className="py-4">
            <hr className="border-solid border-1  border-[#F5F5F5]" />
          </div>

          <p className="text-[#475467] text-xs">
            Create a group and launch your survey to receive responses in
            minutes.
          </p>
          <div className="mt-8">
            <button
              className="text-[##333333] border w-full font-bold p-3 rounded-lg text-sm border-[#333333]"
              onClick={() => setOpen(true)}
            >
              View Indetails
            </button>
          </div>
        </div>
      </div>
      {open && <GroupCreateModalComponent open={open} setOpen={setOpen} />}
    </>
  );
}
