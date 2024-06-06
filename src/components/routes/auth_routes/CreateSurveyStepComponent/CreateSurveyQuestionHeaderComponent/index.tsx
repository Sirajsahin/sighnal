import { ISurveyCreateProps } from "@/api_framework/api_modals/group";
import { useSurveyCreateAPI } from "@/app/hooks/api_hooks/Group/useSurveyCreateAPI";
import Input from "@/components/ui/Input";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { Field, Label } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ICreateSurveyFromFields {
  surveyTitle: string;
  surveyDescription: string;
}

const CreateSurveyQuestionHeaderComponent = () => {
  const formHook = useForm<ICreateSurveyFromFields>({
    defaultValues: {},
  });

  const navigate = useNavigate();
  const { execute: createSurvey } = useSurveyCreateAPI();

  const [params, _setparams] = useSearchParams();

  const buisnessId = params.get("business_id");
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
        business_id: buisnessId,
        name: data.surveyTitle,
        description: data.surveyDescription,
        group_id: groupId,
      };
      createSurvey(constructedData).then(({ status, message }) => {
        if (status) {
          navigate(
            `/app/campaign/create-survey?step_id=2&business_id=${buisnessId}&group_id=${groupId}&survey_id=${message}`
          );
        }
      });
    }
  };

  return (
    <div className=" flex justify-center items-center  mr-auto my-3">
      <form
        className=" mt-2 w-5/6 border-2 border-green-50 p-5 shadow-lg rounded-xl"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <div className="w-full ">
              <Field>
                <Label className="text-xs font-medium text-black">
                  Survey Title <span className="text-red-400 text-xs">*</span>
                </Label>
                <Input
                  className="text-xs"
                  placeholder="Enter Survey Title"
                  register={formHook.register("surveyTitle", {
                    required: true,
                    // ...forAlphaNumericWithoutDot.validations
                  })}
                  fieldError={formHook.formState.errors.surveyTitle}
                  errorMessages={[
                    { message: "Survey title is required", type: "required" },
                    // forAlphaNumericWithoutDot.errors
                  ]}
                />
              </Field>
            </div>
          </div>
          <div>
            <div className="w-full  mt-2">
              <Field>
                <Label className="text-xs font-medium text-black">
                  Survey Description{" "}
                  <span className="text-red-400 text-xs">*</span>
                </Label>

                <TextareaComponent
                  className="text-xs"
                  placeholder="Write your question under 50 Words..."
                  register={formHook.register("surveyDescription", {
                    required: true,
                    // ...forAlphaNumericWithoutDot.validations
                  })}
                  fieldError={formHook.formState.errors.surveyDescription}
                  errorMessages={[
                    { message: "Description is required", type: "required" },
                    // forAlphaNumericWithoutDot.errors
                  ]}
                />
              </Field>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
          <button
            type="submit"
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
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurveyQuestionHeaderComponent;
