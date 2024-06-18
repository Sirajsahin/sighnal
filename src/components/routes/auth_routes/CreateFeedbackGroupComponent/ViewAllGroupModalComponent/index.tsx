import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IFeedbackCreateModalProps } from "./interface";

export interface ICreateGroupFromFields {
  groupName: string;
  groupDescription: string;
}
const data = [
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
  { item: "" },
];

const ViewAllGroupModalComponent: React.FC<IFeedbackCreateModalProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Transition show={open}>
      <Dialog className="relative z-30" onClose={() => setOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-start mt-10 sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-6xl sm:p-6">
                <div>
                  <div className="text-base font-semibold text-[#333333] py-2 flex justify-between items-center">
                    <p className="flex items-center gap-1">
                      Total Groups{" "}
                      <span className="bg-[#cde6dd] text-[#0C6243] border border-[#333333] w-auto h-auto p-1 rounded-lg text-xs">
                        {" "}
                        {data.length}
                      </span>
                    </p>
                    <p>
                      <XMarkIcon
                        className="w-5 h-5 text-sm cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 overflow-auto h-[700px] ">
                    {data.map(() => {
                      return (
                        <div className=" p-4 rounded-2xl shadow-md h-auto border-solid border-2 border-[#F5F5F5]">
                          <div className="flex  items-center gap-3">
                            <div className="bg-[#F5F5F5] h-6 w-6 rounded-lg"></div>
                            <p className="text-sm font-bold text-[#333333]">
                              App Feedback
                            </p>
                          </div>
                          <div className="py-4">
                            <hr className="border-solid border-1  border-[#F5F5F5]" />
                          </div>

                          <p className="text-[#475467] text-xs">
                            Create a group and launch your survey to receive
                            responses in minutes.
                          </p>
                          <div className="mt-8">
                            <button
                              className="text-[##333333] border   w-full font-bold p-3 rounded-lg text-sm  border-[#333333]"
                              onClick={() => setOpen(true)}
                            >
                              View Indetails
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ViewAllGroupModalComponent;
