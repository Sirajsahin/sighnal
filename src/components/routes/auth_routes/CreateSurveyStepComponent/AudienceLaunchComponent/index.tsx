import { RiShareBoxLine } from "react-icons/ri";

import { ISurveyLiveProps } from "@/api_framework/api_modals/group";
import { useSurveyLiveAPI } from "@/app/hooks/api_hooks/Group/useSurveyLiveAPI";
import GroupUsersCategoryModalComponent from "@/components/ui/Modal/GroupUsersCategoryModalComponent";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [link, setLink] = useState<string>(null);

  const [startTime, setStartTime] = useState("09:00"); // Default time in 24-hour format
  const [endTime, setEndTime] = useState("09:00"); // Default time in 24-hour format

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        end_date: formatDate(endDate),
        end_time: endTime,
        start_date: formatDate(startDate),
        start_time: startTime,
        is_comments_on: data.comments,
        tags: selectedCategories,
      };
      createSurveyLive(constructedData, survey_id).then(
        ({ status, message }) => {
          if (status) {
            setLive(true);
            setLink(message);
          }
        }
      );
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

  const formatDate = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full sm:w-4/5 md:w-[70%] lg:w-[64%] bg-white shadow-sm border p-5 rounded-xl">
        <div>
          <p className="text-[#475467] font-medium text-xs">Step 3/3</p>
          <p className="text-base font-bold py-2">Launch It</p>
          <p className="text-[#333333] font-normal text-sm">
            Add your target audience and preferences and launch it.
          </p>
          <div className="text-sm text-[#333333] mt-6">
            <p className="text-[#333333] font-medium text-sm ">
              Add Target Audience
            </p>
            <div className="border border-1 border-purple-100 mt-2 p-3 w-full rounded-lg flex  items-center gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategories?.map((item) => {
                  return (
                    <p className="p-2 w-auto rounded-2xl text-xs items-center flex justify-center font-medium  bg-[#333333] text-white">
                      {item}
                    </p>
                  );
                })}
                <div
                  className="flex items-center gap-1 text-xs text-[#333333] bg-[#E7F0EC] px-4 py-2 rounded-3xl cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="w-4 h-4" /> Click to add target audience
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
            <div className="flex flex-col gap-1">
              <CustomDatePicker
                title={"Start Date"}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>

            <div className="flex flex-col gap-1">
              <CustomTimePicker
                title={"Start Time"}
                time={startTime}
                setTime={setStartTime}
              />
            </div>

            <div className="flex flex-col gap-1">
              <CustomDatePicker
                title={"End Date"}
                startDate={endDate}
                setStartDate={setEndDate}
              />
            </div>

            <div className="flex flex-col gap-1">
              <CustomTimePicker
                title={"End Time"}
                time={endTime}
                setTime={setEndTime}
              />
            </div>
          </div>

          {/* // */}
        </div>
        <div className="flex justify-center sm:justify-end gap-4 mt-6 flex-wrap">
          <button
            type="button"
            className="mt-3 inline-flex w-full sm:w-auto text-[#333333] items-center gap-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0"
            onClick={() => handelBack()}
          >
            <span>
              <MdOutlineKeyboardBackspace className="w-4 h-4" />
            </span>
            Back
          </button>

          <button
            type="button"
            className="mt-3 inline-flex w-full sm:w-auto items-center gap-1 justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:col-start-1 sm:mt-0"
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
            className="inline-flex w-full sm:w-auto justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-medium text-white shadow-sm"
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
        <SurveyLaunchThankyouModalComponent
          setOpen={setLive}
          open={live}
          link={link}
        />
      )}
    </div>
  );
};

export default AudienceLaunchComponent;
