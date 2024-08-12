import { ISurveyCreateProps } from "@/api_framework/api_modals/group";
import { useSurveyCreateAPI } from "@/app/hooks/api_hooks/Group/useSurveyCreateAPI";
import { useSurveyDetailsAPI } from "@/app/hooks/api_hooks/Group/useSurveyDetailsAPI";
import { useSurveyUpdateAPI } from "@/app/hooks/api_hooks/Group/useSurveyUpdateAPIAPI";
import useFormValidations from "@/components/shared/UI_Interface/useFormValidation";
import Input from "@/components/ui/Input";

import TextareaComponent from "@/components/ui/TextareaComponent";
import { Field, Label } from "@headlessui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ICreateSurveyFromFields {
  surveyTitle: string;
  surveyDescription: string;
}

const CreateSurveyQuestionHeaderComponent = () => {
  const formHook = useForm<ICreateSurveyFromFields>({
    mode: "onChange",
    defaultValues: {},
  });

  const { forAlphaNumeric, forAlphaNumericWithoutDot } = useFormValidations();
  const { execute: fetchServeyDetails, serveyDetails } = useSurveyDetailsAPI();

  const navigate = useNavigate();
  const { execute: createSurvey } = useSurveyCreateAPI();
  const { execute: updateSurvey } = useSurveyUpdateAPI();

  const [params, _setparams] = useSearchParams();

  const groupId = params.get("group_id");

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
      const constructedData: ISurveyCreateProps = {
        survey_name: data.surveyTitle,
        survey_description: data.surveyDescription,
        group_id: groupId,
      };

      if (serveyDetails) {
        updateSurvey(constructedData, params.get("survey_id")).then(
          ({ status }) => {
            if (status) {
              navigate(
                `/app/campaign/create-survey?step_id=2&group_id=${groupId}&survey_id=${params.get("survey_id")}`
              );
            }
          }
        );
      } else {
        createSurvey(constructedData).then(({ status, message }) => {
          if (status) {
            navigate(
              `/app/campaign/create-survey?step_id=2&group_id=${groupId}&survey_id=${message}`
            );
          }
        });
      }
    }
  };

  useEffect(() => {
    if (serveyDetails) {
      formHook.setValue("surveyTitle", serveyDetails?.survey_name);
      formHook.setValue("surveyDescription", serveyDetails?.survey_description);
    }
  }, [serveyDetails]);
  useEffect(() => {
    fetchServeyDetails(params.get("survey_id"));
  }, []);

  const handelBack = () => {
    navigate(`/app/campaign/campaign-list?group_id=${params.get("group_id")}`);
  };

  return (
    <div className=" flex flex-col justify-center items-center mr-auto my-3 mt-0 w-full">
      <div className="w-2/5">
        <p className="text-[#475467] font-medium text-xs">Step 1/3</p>
        <h4 className="text-xl font-bold my-1 text-[#333333]">
          Let’s start with adding a Survey Title & Description
        </h4>
        <p className="text-[#475467] text-sm my-1">
          This fields helps end consumer to understand survey
        </p>
        <form className="my-4" onSubmit={formHook.handleSubmit(onSubmit)}>
          <div>
            <div>
              <div className="w-full ">
                <Field>
                  <Label className="text-xs font-medium text-[#333333]">
                    Survey Name <span className="text-red-400 text-xs">*</span>
                  </Label>
                  <Input
                    className="text-xs"
                    placeholder="Enter Survey Title"
                    register={formHook.register("surveyTitle", {
                      required: true,
                      ...forAlphaNumericWithoutDot.validations,
                    })}
                    fieldError={formHook.formState.errors.surveyTitle}
                    errorMessages={[
                      { message: "Survey title is required", type: "required" },
                      forAlphaNumericWithoutDot.errors,
                    ]}
                  />
                </Field>
              </div>
            </div>
            <div>
              <div className="w-full  mt-2">
                <Field>
                  <Label className="text-xs font-medium text-[#333333]">
                    Survey Description{" "}
                    <span className="text-red-400 text-xs">*</span>
                  </Label>

                  <TextareaComponent
                    className="text-xs"
                    placeholder="Write few lines about survey"
                    register={formHook.register("surveyDescription", {
                      required: true,
                      // ...forAlphaNumeric.validations,
                    })}
                    fieldError={formHook.formState.errors.surveyDescription}
                    errorMessages={[
                      { message: "Description is required", type: "required" },
                      forAlphaNumeric.errors,
                    ]}
                  />
                </Field>
              </div>
            </div>
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
              onClick={() => handelBack()}
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

export default CreateSurveyQuestionHeaderComponent;
