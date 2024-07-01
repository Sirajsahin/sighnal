import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { IGroupDeleteModalComponent } from "./interface";

const categories = [
  "grooming",
  "grooming consultation",
  "Bath",
  "Clinic",
  "ClinicOps",
  "Central",
  "India",
  "Kolkata",
];

const GroupUsersCategoryModalComponent: React.FC<
  IGroupDeleteModalComponent
> = ({ open, setOpen }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const data = [];

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-base font-semibold leading-6 text-[##475467] flex items-center gap-1">
                      Group Users{" "}
                      <span className="bg-[#6ec6a6] font-medium border text-white rounded-xl text-xs p-1">
                        {data?.length} users
                      </span>
                    </h1>
                    <span>
                      <XMarkIcon
                        className="w-6 h-6 text-base font-bold cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </span>
                  </div>
                  <div className="w-auto flex gap-2 items-center my-4 flex-wrap">
                    {categories?.map((category) => (
                      <p
                        key={category}
                        className={`p-2 w-auto rounded-2xl text-xs items-center flex justify-center font-medium cursor-pointer ${
                          selectedCategories.includes(category)
                            ? "bg-[#333333] text-white"
                            : "bg-[#F5F5F5]"
                        }`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </p>
                    ))}
                  </div>
                  <div className="mt-5 sm:mt-6 w-full flex justify-end gap-4">
                    <button
                      onClick={() => setOpen(false)}
                      disabled={selectedCategories?.length === 0}
                      type="submit"
                      className={`w-auto justify-center rounded-md ${selectedCategories?.length === 0 ? "bg-white text-[#333333] border" : "bg-[#333333] text-white"} px-6 py-2 text-sm font-medium  shadow-sm`}
                    >
                      Next
                    </button>
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

export default GroupUsersCategoryModalComponent;
