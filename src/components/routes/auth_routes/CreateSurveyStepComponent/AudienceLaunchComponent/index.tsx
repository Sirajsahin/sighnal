import { ISelectMenuItemData } from "@/components/ui/interface";
import { RiShareBoxLine } from "react-icons/ri";

import GroupUsersCategoryModalComponent from "@/components/ui/Modal/GroupUsersCategoryModalComponent";
import SearchableSelectMenu from "@/components/ui/SearchableSelectMenu";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CalenderComponent from "../../../../ui/CalenderComponent";
import ToogleComponent from "../../../../ui/ToogleComponent";

export interface ICreateSurveyFromFields {
  comments: boolean;
  anonymous: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
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

  const [open, setOpen] = useState<boolean>(false);

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

  const generateTimeItems = (length: number, interval: number = 5) => {
    return Array(length)
      .fill(0)
      .map((_v, count) => {
        const value = count * interval;
        const formattedValue = value < 10 ? `0${value}` : `${value}`;
        return { id: `${count}`, title: formattedValue } as ISelectMenuItemData;
      });
  };

  useEffect(() => {
    formHook.setValue("startDate", formattedStartDate);
    formHook.setValue("endDate", formattedEndDate);
  }, [formattedStartDate, formattedEndDate]);

  const startTime = generateTimeItems(24, 1);
  const endTime = generateTimeItems(12, 5);

  /* Actions and Handlers */

  const onSubmit = (data: ICreateSurveyFromFields) => {
    if (data) {
      console.log(data, "data");
      // navigate("/app/thankyou");
    }
  };

  const handelClick = () => {
    console.log("");
  };

  const handelOpenPreview = () => {
    navigate("/app/campaign/survey-preview?step_id=1");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        className=" w-2/4 border-2 border-green-50 p-5 shadow-lg rounded-xl"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-[#475467] font-medium text-xs">Step 3/3</p>
          <p className="text-base font-bold py-2">Launch It</p>
          <p className="text-[#333333] font-normal text-sm">
            Add your target audience and preferences and launch it.
          </p>
          <div className="text-sm text-[#333333] mt-6">
            <p className="text-[#333333] font-medium text-sm cursor-pointer">
              Add Target Audience
            </p>
            <div className="border border-1 border-purple-100 mt-2 p-3 w-full rounded-lg flex justify-between items-center gap-2">
              <span
                className="flex items-center gap-1 text-xs text-[#333333] bg-[#E7F0EC] px-4 py-1 rounded-3xl cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="w-4 h-4" /> Click to add target audience
              </span>
            </div>
          </div>
          <div className="w-2/4 flex justify-between gap-3 my-3">
            <div className="w-full ">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Add Comments
              </p>
              <div className="text-sm text-[#333333]">
                <div className="border border-1 border-purple-100  p-3 w-full rounded-lg flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2 text-sm text-black  px-2 py-0 rounded-3xl  justify-between">
                    Comments On
                  </span>
                  <ToogleComponent
                    enabled={formHook.watch("comments")}
                    setEnabled={() => {
                      const toggleState = formHook.getValues("comments");
                      formHook.setValue("comments", !toggleState);
                    }}
                  />
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
                <CalenderComponent
                  selectionDate={selectionDate}
                  setSelectionDate={setSelectionDate}
                  startDate={formattedStartDate}
                  endDate={formattedEndDate}
                  handelClick={handelClick}
                />
              </div>
            </div>
            <div className="w-full mb-2">
              <p className="text-[#333333] font-medium text-sm mb-2">
                Start Time - End Time
              </p>
              <div className="text-sm text-[#333333] grid grid-cols-2 gap-3">
                <SearchableSelectMenu
                  errorMessages={[
                    {
                      message: "Start Time is required",
                      type: "required",
                    },
                  ]}
                  onSelectItem={(item) => {
                    if (item) {
                      formHook.setValue("startTime", item.title);
                    }
                    formHook.clearErrors(
                      `startTime`
                    ); 
                  }}
                  fieldError={formHook?.formState?.errors?.startTime}
                  register={formHook.register("startTime", {
                    required: true,
                  })}
                  selectItems={startTime}
                  placeholder="HH"
                  showTooltips={true}
                  showTypedErrors={true}
                  showDropdownIcon={true}
                  defaultSelected={
                    startTime?.filter(
                      (oc) => oc.title === formHook.watch("startTime")
                    )[0]
                  }
                  listBoxClassName="w-full"
                  className="text-gray-800 "
                  containerClassName="w-full"
                />
                <SearchableSelectMenu
                  errorMessages={[
                    {
                      message: "End Time is required",
                      type: "required",
                    },
                  ]}
                  onSelectItem={(item) => {
                    if (item) {
                      formHook.setValue("endTime", item.title);
                    }
                    formHook.clearErrors(
                      `endTime`
                    ); 
                  }}
                  fieldError={formHook?.formState?.errors?.endTime}
                  register={formHook.register("endTime", {
                    required: true,
                  })}
                  selectItems={endTime}
                  placeholder="MM"
                  showTooltips={true}
                  showTypedErrors={true}
                  showDropdownIcon={true}
                  defaultSelected={
                    endTime?.filter(
                      (oc) => oc.title === formHook.watch("endTime")
                    )[0]
                  }
                  listBoxClassName="w-full"
                  className="text-gray-800 "
                  containerClassName="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-2/3 float-right gap-4 mt-6">
          <button
            type="button"
            className="mt-3 inline-flex w-full text-[#333333] items-center gap-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium  ring-1 ring-inset ring-gray-300  sm:col-start-1 sm:mt-0"
            // onClick={() => setOpen(false)}
            data-autofocus
          >
            <span>
              <MdOutlineKeyboardBackspace className="w-4 h-4" />
            </span>
            Back
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full items-center gap-1 justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:col-start-1 sm:mt-0"
            onClick={handelOpenPreview}
          >
            <span>
              <RiShareBoxLine className="w-4 h-4" />
            </span>
            Open Preview
          </button>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-medium text-white shadow-sm "
          >
            Make it Live!
          </button>
        </div>
      </form>

      {open && (
        <GroupUsersCategoryModalComponent open={open} setOpen={setOpen} />
      )}
    </div>
  );
};

export default AudienceLaunchComponent;
