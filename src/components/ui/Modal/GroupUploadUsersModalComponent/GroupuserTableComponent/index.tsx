import { useGroupDetailsAPI } from "@/app/hooks/api_hooks/Group/useGroupDetailsAPI";
import { useGroupUserListAPI } from "@/app/hooks/api_hooks/Group/useGroupUserListAPI";
import CheckBoxComponent from "@/components/ui/CheckBoxComponent";
import Pagination from "@/components/ui/Pagination";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

// Mock API call functions
const updateCustomerAPI = async (customerId, data) => {
  // Implement your API call here
  console.log(`Updating customer with ID: ${customerId}`, data);
  // Return updated data or status
};

const deleteCustomerAPI = async (customerId) => {
  // Implement your API call here
  console.log(`Deleting customer with ID: ${customerId}`);
  // Return status
};

const PageSize = 5;

export default function GroupuserTableComponent({ setOpen, open }) {
  const [params, _setparams] = useSearchParams();
  const { execute: fetchUserListData, userData } = useGroupUserListAPI();
  const { execute: fetchGroupDetails } = useGroupDetailsAPI();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [initial, setInitial] = useState(false);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    tag: "",
  });

  const handleEditClick = (user) => {
    setEditUserId(user.customer_id);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      tag: user.tags.join(", ") || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    if (editUserId) {
      updateCustomerAPI(editUserId, editFormData).then(() => {
        fetchUserListData(params.get("group_id"));
        setEditUserId(null); // Exit edit mode
      });
    }
  };

  const handleCancelClick = () => {
    setEditUserId(null); // Exit edit mode without saving
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userData?.slice(firstPageIndex, lastPageIndex);
  }, [userData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userData]);

  useEffect(() => {
    const groupId = params.get("group_id");
    if (groupId) {
      fetchUserListData(groupId);
      fetchGroupDetails(groupId);
    }
  }, [params.get("group_id")]);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    if (userData?.length > 0 && !initial) {
      const uniqueTags = [
        ...new Set(userData?.flatMap((customer) => customer?.tags)),
      ];
      setCategories(uniqueTags);
      setInitial(true);
    }
  }, [userData, initial]);

  useEffect(() => {
    const groupId = params.get("group_id");
    if (selectedCategories?.length > 0 && groupId) {
      fetchUserListData(groupId, selectedCategories);
    }
  }, [selectedCategories, params.get("group_id")]);

  // const handleEdit = (customerId) => {
  //   const customer = userData.find((user) => user.customer_id === customerId);
  //   if (customer) {
  //     const updatedData = { ...customer, name: "Updated Name" }; // Modify as needed
  //     updateCustomerAPI(customerId, updatedData).then(() => {
  //       fetchUserListData(params.get("group_id"));
  //     });
  //   }
  // };

  const handleDelete = (customerId) => {
    deleteCustomerAPI(customerId).then(() => {
      fetchUserListData(params.get("group_id"));
    });
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
              <DialogPanel
                className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-${open ? "6xl" : "2xl"} sm:p-6`}
              >
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <div className="flex justify-between items-center">
                        <h1 className="text-base font-semibold leading-6 text-[#475467] flex items-center gap-1">
                          Group Users{" "}
                          <span className="bg-[#6ec6a6] font-medium border text-white rounded-xl text-xs p-1">
                            {userData?.length} users
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
                                <div className="flex items-center gap-2">
                                  <CheckBoxComponent />
                                  Name
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467] whitespace-nowrap"
                              >
                                Phone Number
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467] whitespace-nowrap"
                              >
                                Email Address
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-xs font-semibold text-[#475467] whitespace-nowrap"
                              >
                                Tags
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {currentTableData?.map((user) => (
                              <tr
                                key={user.customer_id}
                                className="even:bg-gray-50 border-t"
                              >
                                {editUserId === user.customer_id ? (
                                  <>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-3">
                                      <input
                                        type="text"
                                        name="name"
                                        value={editFormData.name}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 text-xs"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4">
                                      <input
                                        type="text"
                                        name="mobile"
                                        value={editFormData.mobile}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 text-xs"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4">
                                      <input
                                        type="text"
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 text-xs"
                                      />
                                    </td>
                                    <td className="px-3 py-4 text-xs">
                                      <input
                                        type="text"
                                        name="tag"
                                        value={editFormData.tag}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 text-xs"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right sm:pr-3">
                                      <button
                                        onClick={handleSaveClick}
                                        className="text-green-600 font-medium mr-2"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={handleCancelClick}
                                        className="text-red-600 font-medium"
                                      >
                                        Cancel
                                      </button>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-3">
                                      {user.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4">
                                      {user.mobile}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4">
                                      {user.email}
                                    </td>
                                    <td className="px-3 py-4 text-xs">
                                      {user.tags?.length
                                        ? user.tags.join(", ")
                                        : "NA"}
                                    </td>
                                    <td className="whitespace-nowrap py-4  text-right  flex items-center ">
                                      <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-gray-600 font-medium mr-2"
                                      >
                                        <FiEdit2 className="h-4 w-4" />
                                      </button>
                                      <TrashIcon
                                        className="h-4 w-4 text-red-600 cursor-pointer"
                                        onClick={() =>
                                          handleDelete(user.customer_id)
                                        }
                                      />
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="my-4">
                          <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={userData?.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
