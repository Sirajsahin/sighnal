import GroupUploadUsersModalComponent from "@/components/ui/Modal/GroupUploadUsersModalComponent";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const AddGroupUserComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button
        className="flex items-center gap-1 py-2 bg-[#E7F0EC] text-xs text-black px-4 rounded-2xl mt-2"
        onClick={() => setOpen(true)}
      >
        <span>
          {" "}
          <PlusIcon className="w-4 h-4" />
        </span>{" "}
        Add your group users
      </button>

      {open && <GroupUploadUsersModalComponent open={open} setOpen={setOpen} />}
    </div>
  );
};

export default AddGroupUserComponent;
