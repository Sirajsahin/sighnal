import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IFeedbackCreateModalProps } from "./interface";

import { IGroupCreateprops } from "@/api_framework/api_modals/group";
import { useGroupCreateAPI } from "@/app/hooks/api_hooks/Group/useGroupCreateAPI";
import Input from "@/components/ui/Input";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { Field, Label } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface ICreateGroupFromFields {
  groupName: string;
  groupDescription: string;
}

const GroupCreateModalComponent: React.FC<IFeedbackCreateModalProps> = ({
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
        business_id: localStorage.getItem("business_id"),
        name: data.groupName,
        description: data.groupDescription,
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-lg sm:p-6">
                <form
                  className=" w-full mt-0"
                  onSubmit={formHook.handleSubmit(onSubmit)}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#333333] py-2 flex justify-between items-center">
                      Create a New Group{" "}
                      <span>
                        <XMarkIcon
                          className="w-5 h-5 text-sm cursor-pointer"
                          onClick={() => setOpen(false)}
                        />
                      </span>
                    </p>

                    <hr className="py-2" />

                    <div>
                      <div className="w-full max-w-md ">
                        <Field>
                          <Label className="text-xs font-medium text-black">
                            Group Name{" "}
                            <span className="text-red-400 text-xs">*</span>
                          </Label>
                          <Input
                            className="text-xs"
                            placeholder="Enter Group Name"
                            register={formHook.register("groupName", {
                              required: true,
                              // ...forAlphaNumericWithoutDot.validations
                            })}
                            fieldError={formHook.formState.errors.groupName}
                            errorMessages={[
                              {
                                message: "Group Name is required",
                                type: "required",
                              },
                              // forAlphaNumericWithoutDot.errors
                            ]}
                          />
                        </Field>
                      </div>
                    </div>
                    <div>
                      <div className="w-full max-w-md mt-2">
                        <Field>
                          <Label className="text-xs font-medium text-black">
                            About Group{" "}
                            <span className="text-red-400 text-xs">*</span>
                          </Label>

                          <TextareaComponent
                            className="text-xs"
                            placeholder="Write few lines about group"
                            register={formHook.register("groupDescription", {
                              required: true,
                              // ...forAlphaNumericWithoutDot.validations
                            })}
                            fieldError={
                              formHook.formState.errors.groupDescription
                            }
                            errorMessages={[
                              {
                                message: "Description is required",
                                type: "required",
                              },
                              // forAlphaNumericWithoutDot.errors
                            ]}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 w-full flex justify-center">
                    <button
                      type="submit"
                      className="  w-auto justify-center rounded-md bg-[#333333] px-10 py-3 text-sm font-semibold text-white shadow-sm"
                    >
                      Create Group
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
export default GroupCreateModalComponent;
