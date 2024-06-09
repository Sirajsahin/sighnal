import { Field, Label } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";

import { useGroupQuestionTypeAPI } from "@/app/hooks/api_hooks/Group/useGroupQuestionTypeAPI";
import { useSurveyQuestionCreateAPI } from "@/app/hooks/api_hooks/Group/useSurveyQuestionCreateAPI";
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
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ICampaignQuestionDetailsInfo {
  question: string;
  question_type_id: string;
  can_skipped: string;
  options: Array<string>;
  group_id: string;
  business_id: string;
  survey_id: string;
}

export interface ICreateSurveyFromFields {
  question_details: ICampaignQuestionDetailsInfo[];
}

const dataItem = [
  { id: "true", name: "Yes" },
  { id: "false", name: "No" },
];
const AddSurveyQuestionComponent = () => {
  const [params, _setparams] = useSearchParams();
  const formHook = useForm<ICreateSurveyFromFields>({
    defaultValues: {},
  });

  const navigate = useNavigate();
  const questionDetailsFormHook = useFieldArray({
    name: "question_details",
    control: formHook.control,
  });

  const business_id = params.get("business_id");
  const group_id = params.get("group_id");
  const survey_id = params.get("survey_id");

  const { execute: createQuestion } = useSurveyQuestionCreateAPI();
  const { execute: fetchQuestionType, groupQuestionType } =
    useGroupQuestionTypeAPI();

  const handleAddProductItem = () => {
    questionDetailsFormHook.append({
      question: null,
      question_type_id: null,
      options: [""],
      can_skipped: null,
      business_id: business_id,
      group_id: group_id,
      survey_id: survey_id,
    });
  };

  //option create

  const handleDeleteProductOptions = (id: number, optionIndex: number) => {
    // formHook.setValue(`question_details.${id}.options`,[])

    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: remove(
        formHook.getValues(`question_details.${id}.options`),
        (_f, index) => {
          return index !== optionIndex;
        }
      ),
    });
  };

  const handleAddProductOptions = (id: number) => {
    // formHook.setValue(`question_details.${id}.options`,[])
    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: [...formHook.getValues(`question_details.${id}.options`), ""],
    });
  };
  useEffect(() => {
    fetchQuestionType();
  }, []);

  const onSubmit = (data: ICreateSurveyFromFields) => {
    if (data) {
      console.log(data, "data");

      createQuestion(formHook.getValues("question_details")).then(
        ({ status }) => {
          if (status) {
            navigate("/app/campaign/create-survey?step_id=3");
          }
        }
      );
    }
  };

  const dataItemList = useSelectMenuReducer(dataItem, "name", "id");
  const questionType = useSelectMenuReducer(
    groupQuestionType,
    "question_type_name",
    "question_type_id"
  );

  // const handelLaunchAudions = () => {
  //   navigate("/app/campaign/create-survey?step_id=3");
  // };
  const hanelOptionChange = (id: number) => {
    // const formHook.getValues(`q`)
    const selectedType = formHook.getValues(
      `question_details.${id}.question_type_id`
    );
    const filterType = groupQuestionType?.filter(
      (id) => id?.question_type_id === selectedType
    );
    const optionValue = filterType && filterType[0]?.options;

    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: optionValue,
    });
    return null;
  };

  return (
    <div className=" flex justify-center items-center  mr-auto my-3 ">
      <div className=" px-4 w-5/6">
        <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
          {questionDetailsFormHook.fields.length > 0 &&
            questionDetailsFormHook?.fields?.map((filed, index) => {
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
                                  `question_details.${index}.question`,
                                  {
                                    required: true,
                                  }
                                )}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]?.question
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
                                      `question_details.${index}.question_type_id`,
                                      item.id
                                    );
                                    hanelOptionChange(index);
                                  }
                                }}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]
                                          ?.question_type_id
                                      : null
                                    : null
                                }
                                register={formHook.register(
                                  `question_details.${index}.question_type_id`,
                                  {
                                    required: true,
                                  }
                                )}
                                selectItems={questionType}
                                placeholder="Select Parent Theme"
                                showTooltips={true}
                                showTypedErrors={true}
                                showDropdownIcon={true}
                                defaultSelected={
                                  questionType?.filter(
                                    (oc) =>
                                      oc.id ===
                                      formHook.watch(
                                        `question_details.${index}.question_type_id`
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
                                    message: " is required",
                                    type: "required",
                                  },
                                ]}
                                onSelectItem={(item) => {
                                  if (item) {
                                    formHook.setValue(
                                      `question_details.${index}.can_skipped`,
                                      item.id
                                    );
                                  }
                                }}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook?.formState?.errors
                                        ?.question_details[index]
                                      ? formHook?.formState?.errors
                                          ?.question_details[index]?.can_skipped
                                      : null
                                    : null
                                }
                                register={formHook.register(
                                  `question_details.${index}.can_skipped`,
                                  {
                                    required: true,
                                  }
                                )}
                                selectItems={dataItemList}
                                placeholder="Select the value"
                                showTooltips={true}
                                showTypedErrors={true}
                                showDropdownIcon={true}
                                defaultSelected={
                                  dataItemList?.filter(
                                    (oc) =>
                                      oc.id ===
                                      formHook.watch(
                                        `question_details.${index}.can_skipped`
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

                            {filed?.options?.map((item, id) => {
                              return (
                                <div
                                  className="flex items-center w-full relative mb-2"
                                  key={`${id} +${item}`}
                                >
                                  <Input
                                    className="text-xs w-full"
                                    placeholder="Enter Options"
                                    register={formHook.register(
                                      `question_details.${index}.options.${id}`,
                                      {
                                        required: true,
                                      }
                                    )}
                                    fieldError={
                                      formHook?.formState?.errors
                                        ?.question_details
                                        ? formHook?.formState?.errors
                                            ?.question_details[index]?.options[
                                            id
                                          ]
                                          ? formHook?.formState?.errors
                                              ?.question_details[index]
                                              ?.options[id]
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
