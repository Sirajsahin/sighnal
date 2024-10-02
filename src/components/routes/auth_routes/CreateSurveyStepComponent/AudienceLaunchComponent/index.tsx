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
  const [time, setTime] = useState("09:00");

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
            <CustomDatePicker />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-800"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-300"
                aria-describedby="startDateHelp"
                required
              />
              <small id="startDateHelp" className="text-xs text-gray-500">
                Select a start date.
              </small>
            </div>

            <div className="flex  gap-2 flex-col ">
              <p className="text-[#333333] font-medium text-sm">Start Time</p>
              <div className="text-sm text-[#333333] ">
                <form className="mx-auto">
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value={time} // Controlled by state
                      onChange={(e) => setTime(e.target.value)} // Update state on input change
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="flex  gap-2 flex-col ">
              <p className="text-[#333333] font-medium text-sm">End Date</p>
              <div className="text-sm text-[#333333] ">
                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
            </div>
            <div className="flex  gap-2 flex-col ">
              <p className="text-[#333333] font-medium text-sm">End Time</p>
              <div className="text-sm text-[#333333] ">
                <form className="mx-auto">
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="09:00"
                      max="18:00"
                      value={time} // Controlled by state
                      onChange={(e) => setTime(e.target.value)} // Update state on input change
                      required
                    />
                  </div>
                </form>
              </div>
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
