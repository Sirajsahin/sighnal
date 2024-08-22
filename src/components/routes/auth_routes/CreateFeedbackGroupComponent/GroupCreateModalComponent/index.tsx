import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IFeedbackCreateModalProps } from "./interface";

import { IGroupCreateprops } from "@/api_framework/api_modals/group";
import { useGroupCreateAPI } from "@/app/hooks/api_hooks/Group/useGroupCreateAPI";
import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useGroupUpdateAPI } from "@/app/hooks/api_hooks/Group/useGroupUpdateAPI";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import useFormValidations from "@/components/shared/UI_Interface/useFormValidation";
import Input from "@/components/ui/Input";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { Field, Label } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ICreateGroupFromFields {
  groupName: string;
  groupDescription: string;
}

const GroupCreateModalComponent: React.FC<IFeedbackCreateModalProps> = ({
  open,
  setOpen,
}) => {
  const { getRouteKey } = useRouter();

  const { groupDetails } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))
    ?.routeState?.state as ISurvetSliceState;

  const { forAlphaNumeric, forAlphaNumericWithoutDot } = useFormValidations();
  const { execute: createGroup } = useGroupCreateAPI();
  const formHook = useForm<ICreateGroupFromFields>({
    mode: "onChange",
    defaultValues: {},
  });

  const navigate = useNavigate();
  const [params, _setparams] = useSearchParams();

  const { execute: fetchGroupDetails } = useGroupDetailsAPI();
  const { execute: updateGroup } = useGroupUpdateAPI();

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchGroupDetails(groupId);
    }
  }, [params.get("group_id")]);

  const group_id = params.get("group_id");

  useEffect(() => {
    if (groupDetails) {
      formHook.setValue("groupName", groupDetails?.group_name);
      formHook.setValue("groupDescription", groupDetails?.group_description);
    }
  }, [groupDetails]);

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
      if (group_id) {
        updateGroup(constructedData, group_id).then(({ status }) => {
          if (status) {
            fetchGroupDetails(group_id);
            formHook.setValue("groupName", null);
            formHook.setValue("groupDescription", null);
            navigate(`/app/campaign/campaign-list?group_id=${group_id}`);
            setOpen(false);
          }
        });
      } else {
        createGroup(constructedData).then(({ status, message }) => {
          if (status) {
            formHook.setValue("groupName", null);
            formHook.setValue("groupDescription", null);
            navigate(`/app/campaign/campaign-list?group_id=${message}`);
          }
        });
      }
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
                      {group_id ? "Update The Group" : "Create a New Group"}
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
                              ...forAlphaNumericWithoutDot.validations,
                            })}
                            fieldError={formHook.formState.errors.groupName}
                            errorMessages={[
                              {
                                message: "Group Name is required",
                                type: "required",
                              },
                              forAlphaNumericWithoutDot.errors,
                            ]}
                          />
                        </Field>
                      </div>
                    </div>
                    <div>
                      <div className="w-full max-w-md mt-4">
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
                             
                            })}
                            fieldError={
                              formHook.formState.errors.groupDescription
                            }
                            errorMessages={[
                              {
                                message: "Description is required",
                                type: "required",
                              },
                              forAlphaNumeric.errors,
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
                      {group_id ? "Update Group" : "Create Group"}
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
