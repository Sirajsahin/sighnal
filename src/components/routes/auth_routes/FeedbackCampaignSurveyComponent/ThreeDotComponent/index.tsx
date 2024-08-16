import GroupDeleteModalComponent from "@/components/ui/Modal/GroupDeleteModalComponent";
import GroupUploadUsersModalComponent from "@/components/ui/Modal/GroupUploadUsersModalComponent";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { CgSoftwareUpload } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import GroupCreateModalComponent from "../../CreateFeedbackGroupComponent/GroupCreateModalComponent";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ThreeDotComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [adduser, setAdduser] = useState<boolean>(false);
  const [editGroup, setEditGroup] = useState<boolean>(false);
  const [params, _setParams] = useSearchParams();

  const groupId = params.get("group_id");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="border rounded-xl w-8 h-9 items-center flex  justify-center  text-sm font-semibold  ">
          <BsThreeDots className=" h-5 w-5 " aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus
                    ? "bg-[#F5F5F5] text-[#333333] rounded-sm font-semibold"
                    : "text-[#475467] ",
                  "group flex items-center px-4 py-2 text-sm"
                )}
                onClick={() => setEditGroup(true)}
              >
                <FiEdit2
                  className="mr-3 h-4 w-4 text-[#475467] group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Edit Group
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus
                    ? "bg-[#F5F5F5] text-[#333333] rounded-sm font-semibold"
                    : "text-[#475467]",
                  "group flex items-center px-4 py-2 text-sm"
                )}
                onClick={() => setAdduser(true)}
              >
                <CgSoftwareUpload
                  className="mr-3 h-4 w-4 text-[#475467] group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Add Group Users
              </a>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus
                    ? "bg-[#F5F5F5] text-[#333333] rounded-sm font-semibold"
                    : "text-[#475467]",
                  "group flex items-center px-4 py-2 text-sm"
                )}
              >
                <IoShareSocialOutline
                  className="mr-3 h-5 w-5 text-[#475467] group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Invite Teammates
              </a>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <a
                href="#"
                className={classNames(
                  focus
                    ? "bg-[#F5F5F5] text-[#333333] rounded-sm font-semibold"
                    : "text-[#475467]",
                  "group flex items-center px-4 py-2 text-sm"
                )}
                onClick={() => setOpen(true)}
              >
                <TrashIcon
                  className="mr-3 h-5 w-5 text-[#475467] "
                  aria-hidden="true"
                />
                Delete Group
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
      {open && (
        <GroupDeleteModalComponent
          open={open}
          setOpen={setOpen}
          group_id={groupId}
        />
      )}
      {editGroup && (
        <GroupCreateModalComponent
          open={editGroup}
          setOpen={setEditGroup}
          group_id={groupId}
        />
      )}
      {adduser && (
        <GroupUploadUsersModalComponent open={adduser} setOpen={setAdduser} />
      )}
    </Menu>
  );
}
