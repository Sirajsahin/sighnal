import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CalenderComponent from "../../../../ui/CalenderComponent";
import ToogleComponent from "../../../../ui/ToogleComponent";

export interface ICreateSurveyFromFields {
  surveyTitle: string;
  surveyDescription: string;
  startDate: string;
  endDate: string;
}

export interface ISelectedDate {
  startDate: any;
  endDate: any;
  key: string;
}

const AudienceLaunchComponent = () => {
  // State For StartDate And End Date

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [selectionDate, setSelectionDate] = useState<ISelectedDate>({
    startDate: yesterday,
    endDate: today,
    key: "selectionDate",
  });

  // Calculate Start Date And End Date and Change Date Format Also
  const startDate = new Date(selectionDate.startDate);
  const endDate = new Date(selectionDate.endDate);

  //   const dispatch = useAppDispatch();

  const startYear = startDate.getFullYear();
  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const startDay = startDate.getDate().toString().padStart(2, "0");

  const endYear = endDate.getFullYear();
  const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
  const endDay = endDate.getDate().toString().padStart(2, "0");

  const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
  const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;

  // Default Value
  const formHook = useForm<ICreateSurveyFromFields>({
    mode: "onChange",
    defaultValues: {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    },
  });

  const navigate = useNavigate();
  console.log(navigate);
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
      // navigate("/app/campaign/create-survey?step_id=step_2");
    }
  };

  const handelClick = () => {
    console.log("");
  };

  return (
    <div className=" flex justify-center items-center  mr-auto my-3">
      <form
        className=" mt-2 w-5/6 border-2 border-green-50 p-5 shadow-lg rounded-xl"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-base font-bold py-3">Audience & Launch</p>
          <p className="text-[#333333] font-medium text-sm">
            Add Target Audience
          </p>
          <div className="text-sm text-[#333333]">
            <div className="border border-1 border-purple-100 mt-3 p-3 w-full rounded-lg flex justify-between items-center gap-2">
              <span className="flex items-center gap-2 text-sm text-black bg-[#E7F0EC] px-4 py-2 rounded-3xl ">
                <PlusIcon className="w-4 h-4" /> Click to add target audience
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between gap-3 my-2">
            <div className="w-full ">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Add Comments
              </p>
              <div className="text-sm text-[#333333]">
                <div className="border border-1 border-purple-100  p-3 w-full rounded-lg flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 text-sm text-black  px-4 py-2 rounded-3xl  justify-between">
                    Comments On
                  </span>
                  <ToogleComponent />
                </div>
              </div>
            </div>
            <div className="w-full mb-2">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Anonymous Submission
              </p>
              <div className="text-sm text-[#333333] ">
                <div className="border border-1 border-purple-100  p-3 w-full rounded-lg flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 text-sm text-black  px-4 py-2 rounded-3xl justify-between ">
                    With ID’s
                  </span>
                  <ToogleComponent />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between gap-3 my-2">
            <div className="w-full mb-2">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Start Date - End Date
              </p>
              <div className="text-sm text-[#333333] ">
                <div className="border border-1 border-purple-100 p-3 w-full rounded-lg flex justify-between items-center gap-2">
                  <CalenderComponent
                    selectionDate={selectionDate}
                    setSelectionDate={setSelectionDate}
                    startDate={formattedStartDate}
                    endDate={formattedEndDate}
                    handelClick={handelClick}
                  />
                </div>
              </div>
            </div>
            <div className="w-full mb-2">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Start Time - End Time
              </p>
              <div className="text-sm text-[#333333] ">
                <div className="border border-1 border-purple-100 p-3 w-full rounded-lg flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 text-sm text-black  px-4 py-2 rounded-3xl justify-between ">
                    With ID’s
                  </span>
                  <ToogleComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 float-right sm:gap-3">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Make it Live!
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            // onClick={() => setOpen(false)}
            data-autofocus
          >
            Open Preview
          </button>
        </div>
      </form>
    </div>
  );
};

export default AudienceLaunchComponent;
