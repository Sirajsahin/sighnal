import { Field, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchableSelectMenu from "@ui/SearchableSelectMenu";
import TextareaComponent from "@ui/TextareaComponent";
import { useSelectMenuReducer } from "@ui/useSelectMenuReducer";
import { useNavigate } from "react-router-dom";

export interface ICreateSurveyFromFields {
  surveyTitle: string;
  surveyDescription: string;
}

const dataItem = [
  { id: "1", name: "siraj" },
  { id: "2", name: "siraj" },
  { id: "3", name: "siraj" },
];
const AddSurveyQuestionComponent = () => {
  const formHook = useForm<ICreateSurveyFromFields>({
    defaultValues: {},
  });

  const navigate = useNavigate();
  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateSurveyFromFields) => {
    let isValid = false;

    if (data?.surveyTitle !== "" || data?.surveyDescription !== "") {
      isValid = true;
    }
    return isValid;
  };
  const onSubmit = (data: ICreateSurveyFromFields) => {
    const isFormSubmissionValid = validateConditionalFormFields(data);
    if (!isFormSubmissionValid) {
      return;
    }
    if (data && isFormSubmissionValid) {
      console.log(data, "data");
    }
  };

  const dataItemList = useSelectMenuReducer(dataItem, "name", "id");

  const handelLaunchAudions = () => {
    navigate("/app/campaign/create-survey?step_id=step_3");
  };

  return (
    <div className=" flex justify-center items-center  mr-auto my-3 ">
      <div className="  pt-32 px-4 w-5/6">
        <div className="mx-auto w-full divide-y  rounded-xl bg-white shadow-lg">
          <Disclosure as="div" className="p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-xl font-medium text-black group-data-[hover]:text-black/80">
                Question 1
              </span>
              <ChevronDownIcon className="size-5 fill-black group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 ">
              <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
                <div>
                  <div className="w-full  mt-2">
                    <Field>
                      <Label className="text-xs font-medium text-[#333333]">
                        Ask your question{" "}
                        <span className="text-red-400 text-xs">*</span>
                      </Label>

                      <TextareaComponent
                        className="text-xs"
                        placeholder="Write your question under 240 characters..."
                        register={formHook.register("surveyDescription", {
                          required: true,
                        })}
                        fieldError={formHook.formState.errors.surveyDescription}
                        errorMessages={[
                          {
                            message: "Description is required",
                            type: "required",
                          },
                        ]}
                      />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between gap-3 w-full my-2">
                    <div className="w-full">
                      <p className="text-sm font-medium text-[#333333] pb-2">
                        Question Type
                      </p>
                      <SearchableSelectMenu
                        errorMessages={[
                          {
                            message: "Parent theme is required",
                            type: "required",
                          },
                        ]}
                        onSelectItem={(item) => {
                          if (item) {
                            formHook.setValue("surveyTitle", item.title);
                          }
                        }}
                        fieldError={formHook.formState.errors.surveyTitle}
                        register={formHook.register("surveyTitle", {
                          required: true,
                        })}
                        selectItems={dataItemList}
                        placeholder="Select Parent Theme"
                        showTooltips={true}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          dataItemList?.filter(
                            (oc) => oc.title === formHook.watch("surveyTitle")
                          )[0]
                        }
                        listBoxClassName="w-full"
                        className="text-gray-800 "
                        containerClassName="w-full"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-medium text-[#333333] pb-2">
                        Can this question can be skipped?
                      </p>
                      <SearchableSelectMenu
                        errorMessages={[
                          {
                            message: "Parent theme is required",
                            type: "required",
                          },
                        ]}
                        onSelectItem={(item) => {
                          if (item) {
                            formHook.setValue("surveyTitle", item.title);
                          }
                        }}
                        fieldError={formHook.formState.errors.surveyTitle}
                        register={formHook.register("surveyTitle", {
                          required: true,
                        })}
                        selectItems={dataItemList}
                        placeholder="Select Parent Theme"
                        showTooltips={true}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          dataItemList?.filter(
                            (oc) => oc.title === formHook.watch("surveyTitle")
                          )[0]
                        }
                        listBoxClassName="w-full"
                        className="text-gray-800 "
                        containerClassName="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333333] py-3">
                      Options
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-xl font-medium text-black group-data-[hover]:text-black/80">
                Question 2
              </span>
              <ChevronDownIcon className="size-5 fill-black group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 ">
              <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
                <div>
                  <div className="w-full  mt-2">
                    <Field>
                      <Label className="text-xs font-medium text-[#333333]">
                        Ask your question{" "}
                        <span className="text-red-400 text-xs">*</span>
                      </Label>

                      <TextareaComponent
                        className="text-xs"
                        placeholder="Write your question under 240 characters..."
                        register={formHook.register("surveyDescription", {
                          required: true,
                        })}
                        fieldError={formHook.formState.errors.surveyDescription}
                        errorMessages={[
                          {
                            message: "Description is required",
                            type: "required",
                          },
                        ]}
                      />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between gap-3 w-full my-2">
                    <div className="w-full">
                      <p className="text-sm font-medium text-[#333333] pb-2">
                        Question Type
                      </p>
                      <SearchableSelectMenu
                        errorMessages={[
                          {
                            message: "Parent theme is required",
                            type: "required",
                          },
                        ]}
                        onSelectItem={(item) => {
                          if (item) {
                            formHook.setValue("surveyTitle", item.title);
                          }
                        }}
                        fieldError={formHook.formState.errors.surveyTitle}
                        register={formHook.register("surveyTitle", {
                          required: true,
                        })}
                        selectItems={dataItemList}
                        placeholder="Select Parent Theme"
                        showTooltips={true}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          dataItemList?.filter(
                            (oc) => oc.title === formHook.watch("surveyTitle")
                          )[0]
                        }
                        listBoxClassName="w-full"
                        className="text-gray-800 "
                        containerClassName="w-full"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-medium text-[#333333] pb-2">
                        Can this question can be skipped?
                      </p>
                      <SearchableSelectMenu
                        errorMessages={[
                          {
                            message: "Parent theme is required",
                            type: "required",
                          },
                        ]}
                        onSelectItem={(item) => {
                          if (item) {
                            formHook.setValue("surveyTitle", item.title);
                          }
                        }}
                        fieldError={formHook.formState.errors.surveyTitle}
                        register={formHook.register("surveyTitle", {
                          required: true,
                        })}
                        selectItems={dataItemList}
                        placeholder="Select Parent Theme"
                        showTooltips={true}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          dataItemList?.filter(
                            (oc) => oc.title === formHook.watch("surveyTitle")
                          )[0]
                        }
                        listBoxClassName="w-full"
                        className="text-gray-800 "
                        containerClassName="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#333333] py-3">
                      Options
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                      <div className="w-full shadow-sm border border-1 border-[#817f7f] h-10 rounded-lg flex justify-between items-center p-2">
                        <p className="text-[#333] text-sm font-medium">Bad</p>
                        <p>
                          <XMarkIcon className="h-4 w-4" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div className="bg-[#0C6243] mt-3 p-3 w-full rounded-lg flex justify-between items-center gap-2">
          <span className="flex items-center gap-2 text-base font-bold text-white">
            <PlusIcon className="w-4 h-4" /> Add One more Question
          </span>
          <span>
            {" "}
            <ChevronDownIcon className="size-5 fill-white group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
          </span>
        </div>

        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
          <button
            onClick={() => handelLaunchAudions()}
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            // onClick={() => setOpen(false)}
            data-autofocus
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSurveyQuestionComponent;

{
  /* <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    // onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div> */
}
