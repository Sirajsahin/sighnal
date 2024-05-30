import Input from "@/components/ui/Input";

import { Field, Label } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SearchableSelectMenu from "@/components/ui/SearchableSelectMenu";
import TextareaComponent from "@/components/ui/TextareaComponent";

export interface ICreateSurveyFromFields {
  surveyTitle: string;
  surveyDescription: string;
}

const AddSurveyQuestionComponent = () => {
  const formHook = useForm<ICreateSurveyFromFields>({
    defaultValues: {},
  });

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
            <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
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
                    <SearchableSelectMenu />
                    <SearchableSelectMenu />
                  </div>
                  <button>Add more Question</button>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
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
                </div>
              </form>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  );
};

export default AddSurveyQuestionComponent;
