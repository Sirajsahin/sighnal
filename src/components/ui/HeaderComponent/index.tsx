import { useFirebaseLogin } from "@/app/hooks/api_hooks/auth/useFirebaseLogin";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderComponent() {
  const navigate = useNavigate();
  const { clientSignOut } = useFirebaseLogin();
  return (
    <div className="">
      <div
        style={{ width: " -webkit-fill-available" }}
        className="fixed top-0 z-10  flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        {/* Separator */}
        {/* <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" /> */}

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end ">
          <div className="flex items-center justify-end gap-x-4 lg:gap-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src={localStorage.getItem("photoURL")}
                  alt=""
                />

                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900 capitalize"
                    aria-hidden="true"
                  >
                    {localStorage.getItem("displayName")}
                  </span>
                  <ChevronDownIcon
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => navigate("/app/user-profile")}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                        )}
                      >
                        User Profile
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => clientSignOut()}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                        )}
                      >
                        Logout
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
