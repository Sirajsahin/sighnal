import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IGroupDeleteModalComponent } from "./interface";

import { IGroupCreateprops } from "@/api_framework/api_modals/group";
import { useGroupCreateAPI } from "@/app/hooks/api_hooks/Group/useGroupCreateAPI";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface ICreateGroupFromFields {
  groupName: string;
  groupDescription: string;
}

const GroupDeleteModalComponent: React.FC<IGroupDeleteModalComponent> = ({
  open,
  setOpen,
}) => {
  // const { forOnlyAlphabet, forAlphaNumericWithoutDot } = useFormValidations();
  const { execute: createGroup } = useGroupCreateAPI();
  const formHook = useForm<ICreateGroupFromFields>({
    defaultValues: {},
  });

  const navigate = useNavigate();
  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.groupName !== "" || data?.groupDescription !== "") {
      isValid = true;
    }
    return isValid;
  };
  const onSubmit = (data: ICreateGroupFromFields) => {
    const isFormSubmissionValid = validateConditionalFormFields(data);
    if (!isFormSubmissionValid) {
      return;
    }
    if (data && isFormSubmissionValid) {
      const constructedData: IGroupCreateprops = {
        group_name: data.groupName,
        group_description: data.groupDescription,
      };

      createGroup(constructedData).then(({ status, message }) => {
        if (status) {
          navigate(
            `/app/campaign/campaign-list?business_id=${localStorage.getItem("business_id")}&group_id=${message}`
          );
        }
      });
    }
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-2xl sm:p-6">
                <form
                  className=" w-full mt-0"
                  onSubmit={formHook.handleSubmit(onSubmit)}
                >
                  <div>
                    <p className="text-base font-bold text-[#333333] py-2 flex justify-between items-center">
                      Delete Group?
                      <span>
                        <XMarkIcon
                          className="w-6 h-6 text-base font-bold cursor-pointer"
                          onClick={() => setOpen(false)}
                        />
                      </span>
                    </p>

                    <div className="my-4">
                      <p className="text-[#475467]">
                        Are you sure you want to delete group? All saved surveys
                        and insights will be deleted permanently.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 w-full flex justify-end gap-4">
                    <button
                      type="submit"
                      className="  w-auto justify-center rounded-md bg-gray-300 px-6 py-2 text-sm font-medium text-[#333333] shadow-sm"
                      onClick={() => setOpen(false)}
                    >
                      No, Thanks
                    </button>
                    <button
                      type="submit"
                      className="  w-auto justify-center rounded-md bg-[#333333] px-6 py-2 text-sm font-medium text-white shadow-sm"
                      onClick={() => setOpen(false)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default GroupDeleteModalComponent;
