import { useGroupQuestionTypeAPI } from "@/app/hooks/api_hooks/Group/useGroupQuestionTypeAPI";
import { useSurveyQuestionCreateAPI } from "@/app/hooks/api_hooks/Group/useSurveyQuestionCreateAPI";
import { useUtils } from "@/app/hooks/useUtils";
import useFormValidations from "@/components/shared/UI_Interface/useFormValidation";
import Input from "@/components/ui/Input";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import InputWithFileUpload from "@ui/InputWithFileUpload";
import SearchableSelectMenu from "@ui/SearchableSelectMenu";
import TextareaComponent from "@ui/TextareaComponent";
import { useSelectMenuReducer } from "@ui/useSelectMenuReducer";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export interface IServiceDeskImage {
  base_64_string: string;
  file_extension: string;
  file_name: string;
  is_thumbnail?: boolean;
  image_url?: string;
}

export interface ICampaignQuestionProps {
  question: string;
  rating_scale?: string;
  mood_scale?: string;
  question_type_id: string;
  can_skipped: string;
  options: Array<string>;
  openText: string;
  group_id: string;
  survey_id: string;
  attachment?: IServiceDeskImage[];
}
export interface ICampaignQuestionDetailsInfo {
  question: string;
  rating_scale?: string;
  mood_scale?: string;
  question_type_id: string;
  can_skipped: string;
  options: Array<string>;
  group_id: string;
  openText: string;
  survey_id: string;
  attachment_file?: FileList;
  image?: IServiceDeskImage[];
}

export interface ICreateSurveyFormFields {
  question_details: ICampaignQuestionDetailsInfo[];
}

const dataItem = [
  { id: "true", name: "Yes" },
  { id: "false", name: "No" },
];

const AddSurveyQuestionComponent = () => {
  const [params] = useSearchParams();
  const { fileListToBase64 } = useUtils();
  const { forAlphaNumericWithoutDot } = useFormValidations();

  const formHook = useForm<ICreateSurveyFormFields>({
    defaultValues: {
      question_details: [],
    },
  });
  // const navigate = useNavigate();
  const questionDetailsFormHook = useFieldArray<ICreateSurveyFormFields>({
    name: "question_details",
    control: formHook.control,
  });

  const group_id = params.get("group_id");
  const survey_id = params.get("survey_id");

  const { execute: createQuestion } = useSurveyQuestionCreateAPI();
  const { execute: fetchQuestionType, groupQuestionType } =
    useGroupQuestionTypeAPI();

  useEffect(() => {
    // handleAddProductItem();
    fetchQuestionType();
  }, []);

  const handleAddProductItem = () => {
    questionDetailsFormHook.append({
      question: "",
      openText: "",
      question_type_id: "",
      options: [""],
      can_skipped: "false",
      group_id: group_id || "",
      survey_id: survey_id || "",
      attachment_file: null,
    });
  };

  const handleDeleteProductOptions = (id: number, optionIndex: number) => {
    const updatedOptions = formHook
      .getValues(`question_details.${id}.options`)
      .filter((_, index) => index !== optionIndex);
    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: updatedOptions,
    });
  };

  const handleAddProductOptions = (id: number) => {
    questionDetailsFormHook.update(id, {
      ...formHook.getValues(`question_details.${id}`),
      options: [...formHook.getValues(`question_details.${id}.options`), ""],
    });
  };

  const onSubmit = async (data: ICreateSurveyFormFields) => {
    try {
      const updatedQuestionDetails = await Promise.all(
        data.question_details.map(async (item) => {
          if (item) {
            // Ensure item is not null
            // Convert files to Base64 if there are any
            if (
              item.attachment_file &&
              Object.keys(item.attachment_file).length > 0
            ) {
              const filesArray = Object.values(item.attachment_file) as any;
              const base64Files = await fileListToBase64(filesArray);
              // Return item with `attachment_file` removed and `image` added
              return {
                ...item,
                image: base64Files, // Add Base64-encoded files to `image`
                attachment_file: null, // Remove `attachment_file`
              };
            } else {
              // Return item with `attachment_file` removed
              const { attachment_file, ...rest } = item;
              return rest;
            }
          } else {
            // Return null to indicate this item should be removed
            return null;
          }
        })
      );

      // Filter out null items
      const filteredQuestionDetails = updatedQuestionDetails.filter(
        (item) => item !== null
      );

      const { status } = await createQuestion(filteredQuestionDetails);
      if (status) {
        // navigate(
        //   `/app/campaign/create-survey?step_id=3&group_id=${group_id}&survey_id=${survey_id}`
        // );
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  const dataItemList = useSelectMenuReducer(dataItem, "name", "id");
  const questionType = useSelectMenuReducer(
    groupQuestionType,
    "question_type_name",
    "question_type_id"
  );
  const ratingRange = []; // Define or fetch ratingRange options
  const moodRange = []; // Define or fetch moodRange options

  const handleSetImageURL = async () => {
    const questions = formHook.getValues("question_details");
    if (questions.length > 0) {
      for (const [index, question] of questions.entries()) {
        if (
          question?.attachment_file &&
          Object.keys(question.attachment_file).length > 0
        ) {
          const filesArray = Object.values(question.attachment_file) as any;
          const base64Files = await fileListToBase64(filesArray);
          const imageURLS = base64Files.map((image) => ({
            base_64_string: image.base_64_string,
            file_extension: image.file_extension,
            file_name: image.file_name,
            image_url: "", // Set image_url if needed
            is_thumbnail: false,
          }));
          formHook.setValue(`question_details.${index}.image`, imageURLS);
        }
      }
    }
  };

  useEffect(() => {
    handleSetImageURL();
  }, [questionDetailsFormHook]);

  return (
    <div className="flex justify-center items-center mr-auto">
      <div className="px-4 w-2/3">
        <div className="flex flex-col gap-1 px-10 my-3">
          <p className="text-[#475467] font-medium text-sm">Step 2/3</p>
          <p className="text-[#333333] text-xl font-bold">Add your Questions</p>
          <p className="text-[#475467] text-sm">
            Create as number of questions required for your survey.
          </p>
        </div>
        <form className="" onSubmit={formHook.handleSubmit(onSubmit)}>
          {questionDetailsFormHook.fields.length > 0 &&
            questionDetailsFormHook?.fields?.map((_field, index) => (
              <div key={index} className="mb-4">
                <div className="mx-auto w-full divide-y rounded-xl bg-white shadow-sm border">
                  <Disclosure as="div" className="p-6" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                      <span className="text-base font-bold text-[#333333]">
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

                        <ChevronDownIcon className="size-8 fill-[#333333] group-data-[open]:rotate-180" />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5">
                      <div>
                        <div className="w-full mt-4">
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
                                      ?.question_details[index]?.question
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
                                  formHook.clearErrors(
                                    `question_details.${index}.question_type_id`
                                  ); // Clear error on change
                                }
                              }}
                              fieldError={
                                formHook?.formState?.errors?.question_details
                                  ? formHook?.formState?.errors
                                      ?.question_details[index]
                                      ?.question_type_id
                                  : null
                              }
                              register={formHook.register(
                                `question_details.${index}.question_type_id`,
                                {
                                  required: false,
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
                              className="text-gray-800"
                              containerClassName="w-full"
                            />
                          </div>

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
                                    `question_details.${index}.rating_scale`,
                                    item.title
                                  );
                                }
                              }}
                              fieldError={
                                formHook?.formState?.errors?.question_details
                                  ? formHook?.formState?.errors
                                      ?.question_details[index]?.rating_scale
                                  : null
                              }
                              register={formHook.register(
                                `question_details.${index}.rating_scale`,
                                {
                                  required: false,
                                }
                              )}
                              selectItems={ratingRange}
                              placeholder="Select Range"
                              showTooltips={false}
                              showTypedErrors={true}
                              showDropdownIcon={true}
                              defaultSelected={
                                ratingRange?.filter(
                                  (oc) =>
                                    oc.title ===
                                    formHook.watch(
                                      `question_details.${index}.rating_scale`
                                    )
                                )[0]
                              }
                              listBoxClassName="w-full"
                              className="text-gray-800"
                              containerClassName="w-full"
                            />
                          </div>

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
                                    `question_details.${index}.mood_scale`,
                                    item.title
                                  );
                                }
                              }}
                              fieldError={
                                formHook?.formState?.errors?.question_details
                                  ? formHook?.formState?.errors
                                      ?.question_details[index]?.mood_scale
                                  : null
                              }
                              register={formHook.register(
                                `question_details.${index}.mood_scale`,
                                {
                                  required: false,
                                }
                              )}
                              selectItems={moodRange}
                              placeholder="Select Range"
                              showTooltips={false}
                              showTypedErrors={true}
                              showDropdownIcon={true}
                              defaultSelected={
                                moodRange?.filter(
                                  (oc) =>
                                    oc.title ===
                                    formHook.watch(
                                      `question_details.${index}.mood_scale`
                                    )
                                )[0]
                              }
                              listBoxClassName="w-full"
                              className="text-gray-800"
                              containerClassName="w-full"
                            />
                          </div>

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
                                      ?.question_details[index]?.can_skipped
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
                        {formHook.watch(
                          `question_details.${index}.question_type_id`
                        ) === "image_single_choice" && (
                          <div className="mt-8">
                            <InputWithFileUpload
                              variant="DRAG_AND_DROP"
                              fieldError={
                                formHook?.formState?.errors?.question_details
                                  ? formHook?.formState?.errors
                                      ?.question_details[index]?.attachment_file
                                  : null
                              }
                              {...formHook.register(
                                `question_details.${index}.attachment_file`
                              )}
                              register={formHook.register(
                                `question_details.${index}.attachment_file`,
                                {
                                  validate: {
                                    maxSize: (files: FileList) => {
                                      return (
                                        Array.from(files).every(
                                          (file) => file.size < 5 * 1024 * 1024
                                        ) ||
                                        "Each file must be smaller than 5MB"
                                      );
                                    },
                                    fileType: (files: FileList) => {
                                      const validTypes = [
                                        "image/png",
                                        "image/jpeg",
                                        "application/pdf",
                                      ];
                                      return (
                                        Array.from(files).every((file) =>
                                          validTypes.includes(file.type)
                                        ) || "Invalid file type"
                                      );
                                    },
                                  },
                                }
                              )}
                              isMultiple
                              onClear={() => {
                                formHook.resetField(
                                  `question_details.${index}.attachment_file`
                                );
                              }}
                              type="file"
                              className="w-full"
                              id={`question_details.${index}.attachment_file`}
                              errorMessages={[
                                {
                                  type: "",
                                  message: "Please upload Issues",
                                },
                              ]}
                              dragAndDropDescription={{
                                allowedFormats: ["PDF", "JPEG", "PNG"],
                                maxFileSize: "5MB",
                              }}
                            />
                            {formHook
                              .watch(`question_details.${index}.image`)
                              ?.map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="flex items-center gap-8 px-4 py-2"
                                >
                                  <div className="flex items-center gap-1 w-60">
                                    <p>{image.file_name}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                        {formHook.watch(
                          `question_details.${index}.question_type_id`
                        ) === "image_multiple_choice" && (
                          <div className="mt-8">
                            <InputWithFileUpload
                              variant="DRAG_AND_DROP"
                              fieldError={
                                formHook?.formState?.errors?.question_details
                                  ? formHook?.formState?.errors
                                      ?.question_details[index]?.attachment_file
                                  : null
                              }
                              {...formHook.register(
                                `question_details.${index}.attachment_file`
                              )}
                              register={formHook.register(
                                `question_details.${index}.attachment_file`,
                                {
                                  validate: {
                                    maxSize: (files: FileList) => {
                                      return (
                                        Array.from(files).every(
                                          (file) => file.size < 5 * 1024 * 1024
                                        ) ||
                                        "Each file must be smaller than 5MB"
                                      );
                                    },
                                    fileType: (files: FileList) => {
                                      const validTypes = [
                                        "image/png",
                                        "image/jpeg",
                                        "application/pdf",
                                      ];
                                      return (
                                        Array.from(files).every((file) =>
                                          validTypes.includes(file.type)
                                        ) || "Invalid file type"
                                      );
                                    },
                                  },
                                }
                              )}
                              isMultiple
                              onClear={() => {
                                formHook.resetField(
                                  `question_details.${index}.attachment_file`
                                );
                              }}
                              type="file"
                              className="w-full"
                              id={`question_details.${index}.attachment_file`}
                              errorMessages={[
                                {
                                  type: "",
                                  message: "Please upload Issues",
                                },
                              ]}
                              dragAndDropDescription={{
                                allowedFormats: ["PDF", "JPEG", "PNG"],
                                maxFileSize: "5MB",
                              }}
                            />
                            {formHook
                              .watch(`question_details.${index}.image`)
                              ?.map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="flex items-center gap-8 px-4 py-2"
                                >
                                  <div className="flex items-center gap-1 w-60">
                                    <p>{image.file_name}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}

                        {formHook.watch(
                          `question_details.${index}.question_type_id`
                        ) === "single_choice" && (
                          <div>
                            {formHook
                              .watch(`question_details.${index}.options`)
                              ?.map((item, id) => (
                                <div
                                  className={`flex items-center w-full relative mb-2 mt-1`}
                                  key={`${id}-${item}`} // Updated key to avoid potential issues with duplicate values
                                >
                                  <Input
                                    className="text-sm w-full mt-2"
                                    placeholder={`Add Option ${id + 1}`}
                                    {...formHook.register(
                                      `question_details.${index}.options.${id}`,
                                      {
                                        required: "Option is required",
                                      }
                                    )}
                                    register={formHook.register(
                                      `question_details.${index}.options.${id}`,
                                      {
                                        required: true,
                                        ...forAlphaNumericWithoutDot.validations,
                                      }
                                    )}
                                    fieldError={
                                      formHook?.formState?.errors
                                        ?.question_details
                                        ? formHook.formState.errors
                                            .question_details[index]?.options?.[
                                            id
                                          ]
                                        : null
                                    }
                                    errorMessages={[
                                      {
                                        message: "Option is required",
                                        type: "required",
                                      },
                                    ]}
                                  />

                                  <p
                                    className="pr-3 items-center absolute cursor-pointer right-0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteProductOptions(index, id);
                                    }}
                                  >
                                    <XMarkIcon className="w-4 h-4" />
                                  </p>
                                </div>
                              ))}

                            <button
                              className="mt-6 inline-flex items-center w-auto justify-center bg-gray-200 py-3 text-sm text-[#333333] rounded-xl px-4 gap-1"
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
                        )}
                        {formHook.watch(
                          `question_details.${index}.question_type_id`
                        ) === "multiple_choice" && (
                          <div>
                            {formHook
                              .watch(`question_details.${index}.options`)
                              ?.map((item, id) => (
                                <>
                                  <div
                                    className={`flex items-center w-full relative mb-2 mt-1`}
                                    key={`${id}-${item}`} // Updated key to avoid potential issues with duplicate values
                                  >
                                    <Input
                                      className="text-sm w-full mt-2"
                                      placeholder={`Add Option ${id + 1}`}
                                      {...formHook.register(
                                        `question_details.${index}.options.${id}`,
                                        {
                                          required: "Option is required",
                                        }
                                      )}
                                      register={formHook.register(
                                        `question_details.${index}.options.${id}`,
                                        {
                                          required: true,
                                          ...forAlphaNumericWithoutDot.validations,
                                        }
                                      )}
                                      fieldError={
                                        formHook?.formState?.errors
                                          ?.question_details
                                          ? formHook.formState.errors
                                              .question_details[index]
                                              ?.options?.[id]
                                          : null
                                      }
                                      errorMessages={[
                                        {
                                          message: "Option is required",
                                          type: "required",
                                        },
                                      ]}
                                    />

                                    <p
                                      className="pr-3 items-center absolute cursor-pointer right-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteProductOptions(index, id);
                                      }}
                                    >
                                      <XMarkIcon className="w-4 h-4" />
                                    </p>
                                  </div>
                                  {/* <div
                                    className={`flex items-center w-full relative mb-2 mt-1`}
                                    key={`${id}-${item}`} // Updated key to avoid potential issues with duplicate values
                                  >
                                    <Input
                                      className="text-sm w-full mt-2"
                                      placeholder={`Add Option ${id + 1}`}
                                      {...formHook.register(
                                        `question_details.${index}.options.${id}`,
                                        {
                                          required: "Option is required",
                                        }
                                      )}
                                      register={formHook.register(
                                        `question_details.${index}.options.${id}`,
                                        {
                                          required: true,
                                          ...forAlphaNumericWithoutDot.validations,
                                        }
                                      )}
                                      fieldError={
                                        formHook?.formState?.errors
                                          ?.question_details
                                          ? formHook.formState.errors
                                              .question_details[index]
                                              ?.options?.[id]
                                          : null
                                      }
                                      errorMessages={[
                                        {
                                          message: "Option is required",
                                          type: "required",
                                        },
                                      ]}
                                    />

                                    <p
                                      className="pr-3 items-center absolute cursor-pointer right-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteProductOptions(index, id);
                                      }}
                                    >
                                      <XMarkIcon className="w-4 h-4" />
                                    </p>
                                  </div> */}
                                </>
                              ))}

                            <button
                              className="mt-6 inline-flex items-center w-auto justify-center bg-gray-200 py-3 text-sm text-[#333333] rounded-xl px-4 gap-1"
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
                        )}
                        {formHook.watch(
                          `question_details.${index}.question_type_id`
                        ) === "open_text_response" && (
                          <div>
                            <div
                              className={`flex items-center w-full relative mb-2 mt-1`}
                            >
                              <TextareaComponent
                                className="text-sm w-full"
                                placeholder="Your end consumer can write their response here without any limitations."
                                register={formHook.register(
                                  `question_details.${index}.openText`,
                                  {
                                    required: true,
                                  }
                                )}
                                fieldError={
                                  formHook?.formState?.errors?.question_details
                                    ? formHook.formState.errors
                                        .question_details[index]?.openText
                                    : null
                                }
                                errorMessages={[
                                  {
                                    message: "Option is required",
                                    type: "required",
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
            ))}
          <div
            className="border-dotted bg-[#F4F5F6] border-2 mt-6 p-3 w-full rounded-xl flex justify-between items-center gap-2 cursor-pointer"
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
              <ChevronDownIcon className="size-5 fill-white group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </span>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
            >
              Next
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full text-[#333333] items-center gap-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
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
