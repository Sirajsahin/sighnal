import CheckBoxComponent from "@/components/ui/CheckBoxComponent";
import Pagination from "@/components/ui/Pagination";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
const PageSize = 10;

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

export default function GroupuserTableComponent({ data, setOpen }) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage, PageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
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
        </div>
      </div>
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-[#475467] sm:pl-3"
                  >
                    <div className=" flex items-center gap-2">
                      <CheckBoxComponent />
                      Name
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467]"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467]"
                  >
                    Email Address
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467]"
                  >
                    Tags
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentTableData?.map((person) => (
                  <tr key={person?.email} className="even:bg-gray-50 border-t">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs  text-[#475467] sm:pl-3">
                      <div className=" flex items-center gap-2">
                        <CheckBoxComponent />
                        {person?.Nunavut}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-[#475467]">
                      {person?.Nunavut}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-[#475467]">
                      {person?.Nunavut}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-[#475467]">
                      {person?.Nunavut}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs font-medium sm:pr-3">
                      <div className="flex items-center gap-4 justify-center">
                        <TrashIcon
                          className=" h-4 w-4 text-[#475467] cursor-pointer "
                          // onClick={() => setFileDetails(null)}
                        />{" "}
                        <FiEdit2
                          className=" h-4 w-4 text-[#475467] cursor-pointer "
                          // onClick={() => setFileDetails(null)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data?.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
