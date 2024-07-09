import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ICalenderComponentProps } from "./interface";

const CalenderComponent: React.FC<ICalenderComponentProps> = ({
  selectionDate,
  setSelectionDate,
  startDate,
  endDate,
  handelClick,
}) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelect = (ranges: any) => {
    setSelectionDate(ranges.selectionDate as any);
  };

  return (
    <>
      <button
        className="border border-solid border-gray-300 rounded-md bg-primary-color cursor-pointer text-black text-xs py-2 px-3 flex items-center gap-2"
        onClick={handleOpen}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8333 3.33332H15V1.66666H13.3333V3.33332H6.66667V1.66666H5V3.33332H4.16667C3.24167 3.33332 2.50833 4.08332 2.50833 4.99999L2.5 16.6667C2.5 17.5833 3.24167 18.3333 4.16667 18.3333H15.8333C16.75 18.3333 17.5 17.5833 17.5 16.6667V4.99999C17.5 4.08332 16.75 3.33332 15.8333 3.33332ZM15.8333 16.6667H4.16667V8.33332H15.8333V16.6667ZM15.8333 6.66666H4.16667V4.99999H15.8333V6.66666ZM7.5 11.6667H5.83333V9.99999H7.5V11.6667ZM10.8333 11.6667H9.16667V9.99999H10.8333V11.6667ZM14.1667 11.6667H12.5V9.99999H14.1667V11.6667ZM7.5 15H5.83333V13.3333H7.5V15ZM10.8333 15H9.16667V13.3333H10.8333V15ZM14.1667 15H12.5V13.3333H14.1667V15Z"
              fill="#808DA0"
            />
          </svg>
        </span>
        <span className="py-[6px]">
          {startDate} to {endDate}
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.25836 9.75837L9.41669 11.9167C9.74169 12.2417 10.2667 12.2417 10.5917 11.9167L12.75 9.75837C13.275 9.23337 12.9 8.33337 12.1584 8.33337H7.84169C7.10002 8.33337 6.73336 9.23337 7.25836 9.75837Z"
              fill="#24272C"
            />
          </svg>
        </span>
      </button>
      <Transition.Root show={open}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen(false)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Render a single element as the child */}
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-white p-4 rounded-md max-w-[1200px] z-40">
                <h3 className="date-filter-by-date">By Date</h3>
                <div>
                  <DateRangePicker
                    ranges={[selectionDate]}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                  />
                </div>
                <div className="flex justify-end mt-3 mr-5">
                  <button
                    onClick={() => {
                      setOpen(false);
                      handelClick();
                    }}
                    className="bg-black text-white border-none rounded-md cursor-pointer px-3 py-2 text-xs"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CalenderComponent;
