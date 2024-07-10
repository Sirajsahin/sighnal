import { useGroupListAPI } from "@/app/hooks/api_hooks/Group/useGroupListAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupCreateModalComponent from "../GroupCreateModalComponent";

export default function GroupListComponent() {
  const [open, setOpen] = useState(false);

  const { execute: fetchGroupList, groupList } = useGroupListAPI();
  const navigate = useNavigate();
  useEffect(() => {
    fetchGroupList();
  }, []);

  const handelClick = (id: string) => {
    navigate(`/app/campaign/campaign-list?group_id=${id}`);
  };

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
        {groupList?.slice(0, 2)?.map((item, id) => {
          return (
            <div
              className=" p-4 rounded-2xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]"
              key={id}
            >
              <div className="flex  items-center gap-3">
                <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
                <p className="text-sm font-bold text-[#333333]">
                  {item?.group_name}
                </p>
              </div>

              <div className="py-4">
                <hr className="border-solid border-1  border-[#F5F5F5]" />
              </div>

              <p className="text-[#475467] text-xs">
                {item?.group_description}
              </p>
              <div className="mt-8">
                <button
                  className="text-[##333333] border   w-full font-bold p-3 rounded-lg text-sm  border-[#333333]"
                  onClick={() => handelClick(item?.group_id)}
                >
                  View Indetails
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {open && <GroupCreateModalComponent open={open} setOpen={setOpen} />}
    </>
  );
}
