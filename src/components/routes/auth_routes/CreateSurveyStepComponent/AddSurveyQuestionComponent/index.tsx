import { Field, Label } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchableSelectMenu from "@ui/SearchableSelectMenu";
import TextareaComponent from "@ui/TextareaComponent";
import { useSelectMenuReducer } from "@ui/useSelectMenuReducer";
import { remove } from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface ICampaignQuestionDetailsInfo {
  questionName: string;
  questionType: string;
  questionSkip: string;
  questionOption: ICampaignQuestionDetailsOptionsInfo[];
}
export interface ICampaignQuestionDetailsOptionsInfo {
  option: string;
}
export interface ICreateSurveyFromFields {
  question_details: ICampaignQuestionDetailsInfo[];
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
  const questionDetailsFormHook = useFieldArray({
    name: "question_details",
    control: formHook.control,
  });

  const handleAddProductItem = () => {
    questionDetailsFormHook.append({
      questionName: null,
      questionType: null,
      questionOption: [{ option: "" }],
      questionSkip: null,
    });
  };

  //option create

  const handleDeleteProductOptions = (id: number, optionIndex: number) => {
    // formHook.setValue(`question_details.${id}.questionOption`,[])

    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      questionOption: remove(
        formHook.getValues(`question_details.${id}.questionOption`),
        (_f, index) => {
          return index !== optionIndex;
        }
      ),
    });
  };

  const handleAddProductOptions = (id: number) => {
    // formHook.setValue(`question_details.${id}.questionOption`,[])
    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      questionOption: [
        ...formHook.getValues(`question_details.${id}.questionOption`),
        { option: "" },
      ],
    });
  };
  useEffect(() => {
    // handleAddProductItem();
    // console.log("bb");
  }, []);

  const onSubmit = (data: ICreateSurveyFromFields) => {
    if (data) {
      console.log(data, "data");
      navigate("/app/campaign/create-survey?step_id=3");
    }
  };

  const dataItemList = useSelectMenuReducer(dataItem, "name", "id");

  // const handelLaunchAudions = () => {
  //   navigate("/app/campaign/create-survey?step_id=3");
  // };

  return (
    <div className=" flex justify-center items-center  mr-auto my-3 ">
      <div className=" px-4 w-5/6">
        <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
          {questionDetailsFormHook.fields.length > 0 &&
            questionDetailsFormHook?.fields?.map((filed, index) => {
              console.log(filed, "filed");
              return (
                <div key={index} className="mb-4">
                  <div className="mx-auto w-full divide-y  rounded-xl bg-white shadow-lg">
                    <Disclosure as="div" className="p-6" defaultOpen={true}>
                      <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="text-xl font-medium text-black group-data-[hover]:text-black/80">
                          Question {index + 1}
                        </span>
                        <ChevronDownIcon className="size-5 fill-black group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 text-sm/5 ">
                        <div>
                          <div className="w-full  mt-4">
                            <Field>
                              <Label className="text-xs font-medium text-[#333333] items-center gap-1 flex">
                                Ask your question{" "}
                                <span className="text-red-400 text-xs">*</span>
                                <span>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      questionDetailsFormHook.remove(index);
                                    }}
                                  >
                                    <TrashIcon className="w-3 h-3 text-red-500" />
                                  </button>
                                </span>
                              </Label>

                              <TextareaComponent
                                className="text-xs"
                                placeholder="Write your question under 240 characters..."
                                register={formHook.register(
                                  `question_details.${index}.questionName`,
                                  {
                                    required: true,
                                  }
                                )}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]
                                          ?.questionName
                                      : null
                                    : null
                                }
                                errorMessages={[
                                  {
                                    message: "Name is required",
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
                                    formHook.setValue(
                                      `question_details.${index}.questionType`,
                                      item.title
                                    );
                                  }
                                }}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]
                                          ?.questionType
                                      : null
                                    : null
                                }
                                register={formHook.register(
                                  `question_details.${index}.questionType`,
                                  {
                                    required: true,
                                  }
                                )}
                                selectItems={dataItemList}
                                placeholder="Select Parent Theme"
                                showTooltips={true}
                                showTypedErrors={true}
                                showDropdownIcon={true}
                                defaultSelected={
                                  dataItemList?.filter(
                                    (oc) =>
                                      oc.title ===
                                      formHook.watch(
                                        `question_details.${index}.questionType`
                                      )
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
                                    message: " theme is required",
                                    type: "required",
                                  },
                                ]}
                                onSelectItem={(item) => {
                                  if (item) {
                                    formHook.setValue(
                                      `question_details.${index}.questionSkip`,
                                      item.title
                                    );
                                  }
                                }}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]
                                          ?.questionSkip
                                      : null
                                    : null
                                }
                                register={formHook.register(
                                  `question_details.${index}.questionSkip`,
                                  {
                                    required: true,
                                  }
                                )}
                                selectItems={dataItemList}
                                placeholder="Select Parent Theme"
                                showTooltips={true}
                                showTypedErrors={true}
                                showDropdownIcon={true}
                                defaultSelected={
                                  dataItemList?.filter(
                                    (oc) =>
                                      oc.title ===
                                      formHook.watch(
                                        `question_details.${index}.questionSkip`
                                      )
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

                            {filed?.questionOption?.map((item, id) => {
                              return (
                                <div
                                  className="flex items-center w-full relative mb-2"
                                  key={`${id} +${item}`}
                                >
                                  <Input
                                    className="text-xs w-full"
                                    placeholder="Enter Options"
                                    register={formHook.register(
                                      `question_details.${index}.questionOption.${id}.option`,
                                      {
                                        required: true,
                                      }
                                    )}
                                    fieldError={
                                      formHook?.formState?.errors
                                        ?.question_details
                                        ? formHook?.formState?.errors
                                            ?.question_details[index]
                                            ?.questionOption[id]?.option
                                          ? formHook?.formState?.errors
                                              ?.question_details[index]
                                              ?.questionOption[id]?.option
                                          : null
                                        : null
                                    }
                                    errorMessages={[
                                      {
                                        message: "Option is required",
                                        type: "required",
                                      },
                                      // forAlphaNumericWithoutDot.errors
                                    ]}
                                  />
                                  <p
                                    className=" pr-3 items-center absolute right-0 pt-2"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteProductOptions(index, id);
                                    }}
                                  >
                                    <XMarkIcon className="w-4 h-4" />
                                  </p>
                                </div>
                              );
                            })}

                            <button
                              className="mt-6 inline-flex items-center w-auto justify-center bg-gray-200  py-3 text-xs   text-[#333333]  rounded-xl px-4 gap-1"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddProductOptions(index);
                              }}
                            >
                              <PlusIcon className="w-4 h-4" /> Add another
                              option
                            </button>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </div>
                </div>
              );
            })}
          <div
            className="bg-[#0C6243] mt-6 p-3 w-full rounded-lg flex justify-between items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddProductItem();
            }}
          >
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
              type="submit"
              // onClick={() => handelLaunchAudions()}
              className="inline-flex w-full justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              // onClick={() => setOpen(false)}
              data-autofocus
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSurveyQuestionComponent;
