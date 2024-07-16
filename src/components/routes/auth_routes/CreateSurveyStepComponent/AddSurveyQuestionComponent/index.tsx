import { Field, Label } from "@headlessui/react";
import { useFieldArray, useForm } from "react-hook-form";

import { useGroupQuestionTypeAPI } from "@/app/hooks/api_hooks/Group/useGroupQuestionTypeAPI";
import { useSurveyQuestionCreateAPI } from "@/app/hooks/api_hooks/Group/useSurveyQuestionCreateAPI";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
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
import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import MoodScaleComponent from "../MoodScalComponent";
import RatingScaleComponent from "../RatingScaleCoponent";

export interface ICampaignQuestionDetailsInfo {
  question: string;
  question_type_id: string;
  can_skipped: string;
  options: Array<string>;
  group_id: string;
  business_id: string;
  survey_id: string;
}
const ratingRange = [
  { id: "1", title: "5" },
  { id: "2", title: "10" },
];
const moodRange = [
  { id: "1", title: "2" },
  { id: "2", title: "3" },
  { id: "3", title: "4" },
  { id: "4", title: "5" },
];
const data = [
  {
    item: "1",
  },
  {
    item: "2",
  },
  {
    item: "3",
  },
  {
    item: "4",
  },
  {
    item: "5",
  },
];
const data2 = [
  {
    item: "1",
  },
  {
    item: "2",
  },
  {
    item: "3",
  },
  {
    item: "4",
  },
  {
    item: "5",
  },
  {
    item: "6",
  },
  {
    item: "7",
  },
  {
    item: "8",
  },
  {
    item: "9",
  },
  {
    item: "10",
  },
];

export interface ICreateSurveyFromFields {
  rating_scale?: string;
  mood_scale?: string;
  question_details: ICampaignQuestionDetailsInfo[];
}

const dataItem = [
  { id: "true", name: "Yes" },
  { id: "false", name: "No" },
];

const moodScaleDate = [
  { emoji: "😍", label: "Very Satisfied" },
  { emoji: "😃", label: "Satisfied" },
  { emoji: "😐", label: "It's Okay" },
  { emoji: "😕", label: "Unsatisfied" },
  { emoji: "😡", label: "Very unsatisfied" },
];
const moodScaleDate4 = [
  { emoji: "😍", label: "Very Satisfied" },
  { emoji: "😃", label: "Satisfied" },
  { emoji: "😐", label: "It's Okay" },
  { emoji: "😕", label: "Unsatisfied" },
];
const moodScaleDate2 = [
  { emoji: "😍", label: "Very Satisfied" },
  { emoji: "😃", label: "Satisfied" },
];
const moodScaleDate3 = [
  { emoji: "😍", label: "Very Satisfied" },
  { emoji: "😃", label: "Satisfied" },
  { emoji: "😐", label: "It's Okay" },
];

const AddSurveyQuestionComponent = () => {
  const [params, _setparams] = useSearchParams();
  const [openText, setOpenText] = useState<boolean>(false);
  const [rating, setRating] = useState<boolean>(false);
  const [moodScale, setMoodScale] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState<boolean>(false);
  // const [imageMultipleUpload, setImageMultipleUpload] =
  //   useState<boolean>(false);
  const [ratingData, setRatingData] = useState([]);
  const [moodData, setMoodData] = useState([]);

  const [selected, setSelected] = useState<number>(null);

  const [isFileRequired, setIsFileRequired] = useState(false);

  // const [openText, setOpenText] = useState<boolean>(false);

  const formHook = useForm<ICreateSurveyFromFields>({
    defaultValues: {
      rating_scale: "5",
      mood_scale: "5",
    },
  });

  // const { forAlphaNumeric, forAlphaNumericWithoutDot } = useFormValidations();

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
    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: [...formHook.getValues(`question_details.${id}.options`), ""],
    });
  };

  useEffect(() => {
    handleAddProductItem();
    fetchQuestionType();
  }, []);

  const onSubmit = (data: ICreateSurveyFromFields) => {
    setIsFileRequired(true);
    if (data) {
      console.log(data, "data");
      console.log(selected, "data");

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
    const optionValue = filterType && filterType[0]?.question_type_id;
    console.log(optionValue, "id");
    if (optionValue === "open_text_response") {
      setOpenText(true);
      setRating(false);
    } else {
      setOpenText(false);
      setRating(false);
    }
    if (optionValue === "rating_scale") {
      // setRatingData(data);
      setRating(true);
    } else {
      setRating(false);
    }
    if (optionValue === "mood_scale") {
      // setMoodData(moodScaleDate);
      setMoodScale(true);
    } else {
      setMoodScale(false);
    }
    if (optionValue === "image_single_choice") {
      setImageUpload(true);
    } else {
      setImageUpload(false);
    }
    if (optionValue === "image_multiple_choice") {
      setImageUpload(true);
      // setImageMultipleUpload(true);
    } else {
      // setImageUpload(false);
      // setImageMultipleUpload(false);
    }

    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: optionValue === "open_text_response" ? [""] : ["", ""],
    });
    return null;
  };

  useEffect(() => {
    const rating = formHook.getValues("rating_scale");
    if (rating === "5") {
      setRatingData(data);
    } else {
      setRatingData(data2);
    }
  }, [formHook.watch("rating_scale")]);

  useEffect(() => {
    const rating = formHook.getValues("mood_scale");
    if (rating === "2") {
      setMoodData(moodScaleDate2);
    } else if (rating === "3") {
      setMoodData(moodScaleDate3);
    } else if (rating === "4") {
      setMoodData(moodScaleDate4);
    } else {
      setMoodData(moodScaleDate);
    }
  }, [formHook.watch("mood_scale")]);

  const handelUpload = () => {
    ///
  };

  return (
    <div className=" flex justify-center items-center  mr-auto  ">
      <div className=" px-4 w-2/3">
        <div className="flex flex-col gap-1 px-10 my-3">
          <p className="text-[#475467] font-medium text-sm">Step 2/3</p>
          <p className="text-[#333333] text-xl font-bold">Add your Questions</p>
          <p className="text-[#475467] text-sm ">
            Create as number of questions required for your survey.
          </p>
        </div>
        <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
          {questionDetailsFormHook.fields.length > 0 &&
            questionDetailsFormHook?.fields?.map((filed, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className="mx-auto w-full divide-y  rounded-xl bg-white shadow-sm border">
                    <Disclosure as="div" className="p-6" defaultOpen={true}>
                      <DisclosureButton className="group flex w-full items-center justify-between">
                        <span className="text-base font-bold text-[#333333] ">
                          Question {index + 1}
                        </span>
                        <div className="flex items-center gap-2 justify-center">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              questionDetailsFormHook.remove(index);
                            }}
                          >
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </button>

                          <ChevronDownIcon className="size-8 fill-[#333333]  group-data-[open]:rotate-180" />
                        </div>
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 text-sm/5 ">
                        <div>
                          <div className="w-full  mt-4">
                            <Field>
                              <Label className="text-sm font-medium text-[#333333] items-center gap-1 flex">
                                Ask your question{" "}
                                <span className="text-red-400 text-sm">*</span>
                              </Label>

                              <TextareaComponent
                                className="text-sm w-full"
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
                              <p className="text-sm font-medium text-[#333333]">
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
                                    formHook.clearErrors(
                                      `question_details.${index}.question_type_id`
                                    ); // Clear error on change
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
                                placeholder="Select Questions type"
                                showTooltips={false}
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
                            {rating && (
                              <div className="w-full">
                                <p className="text-sm font-medium text-[#333333]">
                                  Limit
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
                                        "rating_scale",
                                        item.title
                                      );
                                      hanelOptionChange(index);
                                    }
                                  }}
                                  fieldError={
                                    formHook?.formState?.errors?.rating_scale
                                  }
                                  register={formHook.register("rating_scale", {
                                    required: true,
                                  })}
                                  selectItems={ratingRange}
                                  placeholder="Select Range"
                                  showTooltips={false}
                                  showTypedErrors={true}
                                  showDropdownIcon={true}
                                  defaultSelected={
                                    ratingRange?.filter(
                                      (oc) =>
                                        oc.title ===
                                        formHook.watch("rating_scale")
                                    )[0]
                                  }
                                  listBoxClassName="w-full"
                                  className="text-gray-800"
                                  containerClassName="w-full"
                                />
                              </div>
                            )}
                            {moodScale && (
                              <div className="w-full">
                                <p className="text-sm font-medium text-[#333333]">
                                  Limit
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
                                        "mood_scale",
                                        item.title
                                      );
                                      hanelOptionChange(index);
                                    }
                                  }}
                                  fieldError={
                                    formHook?.formState?.errors?.mood_scale
                                  }
                                  register={formHook.register("mood_scale", {
                                    required: true,
                                  })}
                                  selectItems={moodRange}
                                  placeholder="Select Range"
                                  showTooltips={false}
                                  showTypedErrors={true}
                                  showDropdownIcon={true}
                                  defaultSelected={
                                    moodRange?.filter(
                                      (oc) =>
                                        oc.title ===
                                        formHook.watch("mood_scale")
                                    )[0]
                                  }
                                  listBoxClassName="w-full"
                                  className="text-gray-800"
                                  containerClassName="w-full"
                                />
                              </div>
                            )}

                            <div className="w-full">
                              <p className="text-sm font-medium text-[#333333] ">
                                Can this question be skipped? *
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
                                    formHook.clearErrors(
                                      `question_details.${index}.can_skipped`
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
                                showTooltips={false}
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
                          <div className="mt-8">
                            <p className="text-sm font-medium text-[#333333] ">
                              {rating ? "Preview" : "Options Preview"}
                            </p>
                            {rating ? (
                              <RatingScaleComponent
                                data={ratingData}
                                setSelected={setSelected}
                                selected={selected}
                              />
                            ) : moodScale ? (
                              <MoodScaleComponent data={moodData} />
                            ) : imageUpload ? (
                              <ImageUploadComponent
                                type="image"
                                fileType={"multiple"}
                                onFileUploaded={handelUpload}
                                setIsFileRequired={setIsFileRequired}
                                isFileRequired={isFileRequired}
                              />
                            ) : (
                              filed?.options?.map((item, id) => {
                                return (
                                  <div
                                    className={`flex items-center w-full relative mb-2 mt-1`}
                                    key={`${id} +${item}`}
                                  >
                                    {openText ? (
                                      <TextareaComponent
                                        className="text-sm w-full "
                                        placeholder="Your end consumer can write their response here without any limitations.                                      "
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
                                                ?.question_details[index]
                                                ?.options[id]
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
                                        ]}
                                      />
                                    ) : (
                                      <Input
                                        className="text-sm w-full mt-2"
                                        placeholder={`Add Options ${id + 1}`}
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
                                                ?.question_details[index]
                                                ?.options[id]
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
                                    )}
                                    <p
                                      className={` pr-3 items-center absolute cursor-pointer right-0 `}
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
                              })
                            )}

                            {rating || imageUpload ? null : (
                              <button
                                className="mt-6 inline-flex items-center w-auto justify-center bg-gray-200  py-3 text-sm   text-[#333333]  rounded-xl px-4 gap-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleAddProductOptions(index);
                                }}
                              >
                                <PlusIcon className="w-4 h-4" /> Add another
                                option
                              </button>
                            )}
                          </div>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </div>
                </div>
              );
            })}
          <div
            className=" border-dotted bg-[#F4F5F6] border-2 mt-6 p-3 w-full rounded-xl flex justify-between items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddProductItem();
            }}
          >
            <div className="flex flex-col ">
              <span className="flex items-center gap-2 text-xl font-bold text-[#333333]">
                <PlusIcon className="w-4 h-4" /> Add one more question
              </span>
              <p className="#333333 font-medium text-sm text-[#333333]">
                Select from Rating scale, Multiple choice, Open field and Mood
                scale
              </p>
            </div>
            <span>
              {" "}
              <ChevronDownIcon className="size-5 fill-white group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </span>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-medium text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            >
              Next
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full text-[#333333] items-center gap-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              // onClick={() => setOpen(false)}
              data-autofocus
            >
              <span>
                <MdOutlineKeyboardBackspace className="w-4 h-4" />
              </span>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSurveyQuestionComponent;
