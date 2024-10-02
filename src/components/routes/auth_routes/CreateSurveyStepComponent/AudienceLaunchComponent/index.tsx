import { RiShareBoxLine } from "react-icons/ri";

import { ISurveyLiveProps } from "@/api_framework/api_modals/group";
import { useSurveyLiveAPI } from "@/app/hooks/api_hooks/Group/useSurveyLiveAPI";
import GroupUsersCategoryModalComponent from "@/components/ui/Modal/GroupUsersCategoryModalComponent";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import ToogleComponent from "../../../../ui/ToogleComponent";
import SurveyLaunchThankyouModalComponent from "../SurveyLaunchThankyouModalComponent";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";

export interface ICreateSurveyFromFields {
  comments: boolean;
  anonymous: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  startTimeMinute: string;
  endTime: string;
  endTimeMinute: string;
}

export interface ISelectedDate {
  startDate: any;
  endDate: any;
  key: string;
}

const AudienceLaunchComponent = () => {
  // State For StartDate And End Date

  const [params, _setparams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [live, setLive] = useState<boolean>(false);

  const { execute: createSurveyLive } = useSurveyLiveAPI();

  const formHook = useForm<ICreateSurveyFromFields>({
    mode: "onChange",
    defaultValues: {
      // startDate: formattedStartDate,
      // endDate: formattedEndDate,
      comments: false,
    },
  });

  const navigate = useNavigate();

  // const generateTimeItems = (length: number, interval: number = 5) => {
  //   return Array(length)
  //     .fill(0)
  //     .map((_v, count) => {
  //       const value = count * interval;
  //       const formattedValue = value < 10 ? `0${value}` : `${value}`;
  //       return { id: `${count}`, title: formattedValue } as ISelectMenuItemData;
  //     });
  // };

  /* Actions and Handlers */
  const survey_id = params.get("survey_id");
  const group_id = params.get("group_id");

  const handelSubmit = () => {
    const data = formHook.getValues();
    if (data) {
      const constructedData: ISurveyLiveProps = {
        end_date: data.endDate,
        end_time: data.endTime + ":" + data.endTimeMinute,
        start_date: data.startDate,
        start_time: data.startTime + ":" + data.startTimeMinute,
        is_comments_on: data.comments,
        tags: selectedCategories,
      };
      createSurveyLive(constructedData, survey_id).then(({ status }) => {
        if (status) {
          setLive(true);
        }
      });
    }
  };

  const handelOpenPreview = () => {
    navigate(
      `/app/campaign/survey-preview?group_id=${group_id}&survey_id=${survey_id}`
    );
  };

  const handelBack = () => {
    navigate(
      `/app/campaign/create-survey?step_id=2&group_id=${params.get("group_id")}&survey_id=${params.get("survey_id")}`
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-2/4  bg-white shadow-sm border  p-5  rounded-xl">
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
            <div className="border border-1 border-purple-100 mt-2 p-3 w-full rounded-lg flex  items-center gap-2">
              {selectedCategories?.length > 0 && (
                <div className="flex items-center gap-2">
                  {selectedCategories?.map((item) => {
                    return (
                      <p className="p-2 w-auto rounded-2xl text-xs items-center flex justify-center font-medium cursor-pointer bg-[#333333] text-white">
                        {item}
                      </p>
                    );
                  })}
                </div>
              )}
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

          <div className="grid grid-cols-4 py-3 gap-4">
            <div className="flex flex-col gap-1">
              <CustomDatePicker title={"Start Date"} />
            </div>
            <CustomTimePicker title={"Start Time"} />

            <div className="flex  gap-2 flex-col ">
              <CustomDatePicker title={"End Date"} />
            </div>
            <div className="flex  gap-2 flex-col ">
              <CustomTimePicker title={"End Time"} />
            </div>
          </div>
          {/* // */}
        </div>
        <div className="flex justify-end w-2/3 float-right gap-4 mt-6">
          <button
            type="button"
            className="mt-3 inline-flex w-full text-[#333333] items-center gap-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium  ring-1 ring-inset ring-gray-300  sm:col-start-1 sm:mt-0"
            onClick={() => handelBack()}
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
            onClick={handelSubmit}
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-medium text-white shadow-sm "
          >
            Make it Live!
          </button>
        </div>
      </div>

      {open && (
        <GroupUsersCategoryModalComponent
          open={open}
          setOpen={setOpen}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
      )}
      {live && (
        <SurveyLaunchThankyouModalComponent setOpen={setLive} open={live} />
      )}
    </div>
  );
};

export default AudienceLaunchComponent;
