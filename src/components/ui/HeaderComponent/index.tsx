import { useFirebaseLogin } from "@/app/hooks/api_hooks/auth/useFirebaseLogin";
import useRouteInfo from "@/app/hooks/useRouteInfo";
import { useRouter } from "@/app/hooks/useRouter";
import { ISurvetSliceState } from "@/app_redux/reducers/slice/auth/survey_slice";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderComponent() {
  const navigate = useNavigate();

  const { getRouteKey } = useRouter();

  const { userName } = useRouteInfo(getRouteKey("HOME_PAGE", "id"))?.routeState
    ?.state as ISurvetSliceState;

  const { clientSignOut } = useFirebaseLogin();

  // const profilePic = localStorage.getItem("displayName")?.slice(0, 1);

  console.log(localStorage.getItem("displayName"), "fff");

  return (
    <div className="">
      <div
        style={{ width: " -webkit-fill-available" }}
        className="fixed top-0 z-10  flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        {/* Separator */}
        {/* <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" /> */}

        <svg
          width="214"
          height="52"
          viewBox="0 0 214 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="214" height="52" fill="white" />
          <g filter="url(#filter0_d_292_488)">
            <rect
              x="14"
              y="17.4814"
              width="34"
              height="34"
              rx="8"
              transform="rotate(-21.9982 14 17.4814)"
              fill="white"
            />
            <rect
              x="14.6509"
              y="17.7578"
              width="33"
              height="33"
              rx="7.5"
              transform="rotate(-21.9982 14.6509 17.7578)"
              stroke="#0A4933"
            />
          </g>
          <path
            d="M28.0431 17.886V17.886C25.4105 20.1129 24.4436 23.744 25.6199 26.9853C25.8431 27.6003 26.0606 28.1997 26.2568 28.7403"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M33.2804 15.5431V15.5431C30.6478 17.7701 29.6809 21.4012 30.8572 24.6424C31.0804 25.2575 31.2979 25.8568 31.4941 26.3975"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M38.5172 13.2003V13.2003C35.8847 15.4272 34.9178 19.0583 36.094 22.2996C36.3172 22.9146 36.5348 23.514 36.731 24.0546"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M42.6455 35.6881V35.6881C44.9729 33.144 45.4695 29.4193 43.8899 26.3542C43.5902 25.7726 43.2981 25.2059 43.0347 24.6946"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M37.7495 38.6789V38.6789C40.0769 36.1348 40.5735 32.4101 38.9939 29.345C38.6942 28.7634 38.4021 28.1967 38.1387 27.6854"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M32.8535 41.6697V41.6697C35.1809 39.1256 35.6775 35.4009 34.0979 32.3359C33.7982 31.7543 33.5061 31.1875 33.2427 30.6763"
            stroke="#0C6243"
            stroke-width="1.2"
          />
          <path
            d="M74.18 33.28C73.1 33.28 72.1467 33.0867 71.32 32.7C70.4933 32.3133 69.8467 31.76 69.38 31.04C68.9133 30.32 68.68 29.4533 68.68 28.44V27.88H71.28V28.44C71.28 29.28 71.54 29.9133 72.06 30.34C72.58 30.7533 73.2867 30.96 74.18 30.96C75.0867 30.96 75.76 30.78 76.2 30.42C76.6533 30.06 76.88 29.6 76.88 29.04C76.88 28.6533 76.7667 28.34 76.54 28.1C76.3267 27.86 76.0067 27.6667 75.58 27.52C75.1667 27.36 74.66 27.2133 74.06 27.08L73.6 26.98C72.64 26.7667 71.8133 26.5 71.12 26.18C70.44 25.8467 69.9133 25.4133 69.54 24.88C69.18 24.3467 69 23.6533 69 22.8C69 21.9467 69.2 21.22 69.6 20.62C70.0133 20.0067 70.5867 19.54 71.32 19.22C72.0667 18.8867 72.94 18.72 73.94 18.72C74.94 18.72 75.8267 18.8933 76.6 19.24C77.3867 19.5733 78 20.08 78.44 20.76C78.8933 21.4267 79.12 22.2667 79.12 23.28V23.88H76.52V23.28C76.52 22.7467 76.4133 22.32 76.2 22C76 21.6667 75.7067 21.4267 75.32 21.28C74.9333 21.12 74.4733 21.04 73.94 21.04C73.14 21.04 72.5467 21.1933 72.16 21.5C71.7867 21.7933 71.6 22.2 71.6 22.72C71.6 23.0667 71.6867 23.36 71.86 23.6C72.0467 23.84 72.32 24.04 72.68 24.2C73.04 24.36 73.5 24.5 74.06 24.62L74.52 24.72C75.52 24.9333 76.3867 25.2067 77.12 25.54C77.8667 25.8733 78.4467 26.3133 78.86 26.86C79.2733 27.4067 79.48 28.1067 79.48 28.96C79.48 29.8133 79.26 30.5667 78.82 31.22C78.3933 31.86 77.78 32.3667 76.98 32.74C76.1933 33.1 75.26 33.28 74.18 33.28ZM81.5289 33V23.08H84.0489V33H81.5289ZM82.7889 21.92C82.3356 21.92 81.9489 21.7733 81.6289 21.48C81.3222 21.1867 81.1689 20.8 81.1689 20.32C81.1689 19.84 81.3222 19.4533 81.6289 19.16C81.9489 18.8667 82.3356 18.72 82.7889 18.72C83.2556 18.72 83.6422 18.8667 83.9489 19.16C84.2556 19.4533 84.4089 19.84 84.4089 20.32C84.4089 20.8 84.2556 21.1867 83.9489 21.48C83.6422 21.7733 83.2556 21.92 82.7889 21.92ZM86.3614 28.08V27.76C86.3614 26.72 86.5681 25.8333 86.9814 25.1C87.3947 24.3533 87.9414 23.7867 88.6214 23.4C89.3147 23 90.0681 22.8 90.8814 22.8C91.7881 22.8 92.4747 22.96 92.9414 23.28C93.4081 23.6 93.7481 23.9333 93.9614 24.28H94.3214V23.08H96.8014V34.76C96.8014 35.44 96.6014 35.98 96.2014 36.38C95.8014 36.7933 95.2681 37 94.6014 37H87.9614V34.8H93.7214C94.0947 34.8 94.2814 34.6 94.2814 34.2V31.62H93.9214C93.7881 31.8333 93.6014 32.0533 93.3614 32.28C93.1214 32.4933 92.8014 32.6733 92.4014 32.82C92.0014 32.9667 91.4947 33.04 90.8814 33.04C90.0681 33.04 89.3147 32.8467 88.6214 32.46C87.9414 32.06 87.3947 31.4933 86.9814 30.76C86.5681 30.0133 86.3614 29.12 86.3614 28.08ZM91.6014 30.84C92.3747 30.84 93.0214 30.5933 93.5414 30.1C94.0614 29.6067 94.3214 28.9133 94.3214 28.02V27.82C94.3214 26.9133 94.0614 26.22 93.5414 25.74C93.0347 25.2467 92.3881 25 91.6014 25C90.8281 25 90.1814 25.2467 89.6614 25.74C89.1414 26.22 88.8814 26.9133 88.8814 27.82V28.02C88.8814 28.9133 89.1414 29.6067 89.6614 30.1C90.1814 30.5933 90.8281 30.84 91.6014 30.84ZM99.5953 33V19H102.115V24.3H102.475C102.582 24.0867 102.749 23.8733 102.975 23.66C103.202 23.4467 103.502 23.2733 103.875 23.14C104.262 22.9933 104.749 22.92 105.335 22.92C106.109 22.92 106.782 23.1 107.355 23.46C107.942 23.8067 108.395 24.2933 108.715 24.92C109.035 25.5333 109.195 26.2533 109.195 27.08V33H106.675V27.28C106.675 26.5333 106.489 25.9733 106.115 25.6C105.755 25.2267 105.235 25.04 104.555 25.04C103.782 25.04 103.182 25.3 102.755 25.82C102.329 26.3267 102.115 27.04 102.115 27.96V33H99.5953ZM111.92 33V23.08H114.4V24.38H114.76C114.92 24.0333 115.22 23.7067 115.66 23.4C116.1 23.08 116.766 22.92 117.66 22.92C118.433 22.92 119.106 23.1 119.68 23.46C120.266 23.8067 120.72 24.2933 121.04 24.92C121.36 25.5333 121.52 26.2533 121.52 27.08V33H119V27.28C119 26.5333 118.813 25.9733 118.44 25.6C118.08 25.2267 117.56 25.04 116.88 25.04C116.106 25.04 115.506 25.3 115.08 25.82C114.653 26.3267 114.44 27.04 114.44 27.96V33H111.92ZM127.324 33.28C126.617 33.28 125.984 33.16 125.424 32.92C124.864 32.6667 124.417 32.3067 124.084 31.84C123.764 31.36 123.604 30.78 123.604 30.1C123.604 29.42 123.764 28.8533 124.084 28.4C124.417 27.9333 124.87 27.5867 125.444 27.36C126.03 27.12 126.697 27 127.444 27H130.164V26.44C130.164 25.9733 130.017 25.5933 129.724 25.3C129.43 24.9933 128.964 24.84 128.324 24.84C127.697 24.84 127.23 24.9867 126.924 25.28C126.617 25.56 126.417 25.9267 126.324 26.38L124.004 25.6C124.164 25.0933 124.417 24.6333 124.764 24.22C125.124 23.7933 125.597 23.4533 126.184 23.2C126.784 22.9333 127.51 22.8 128.364 22.8C129.67 22.8 130.704 23.1267 131.464 23.78C132.224 24.4333 132.604 25.38 132.604 26.62V30.32C132.604 30.72 132.79 30.92 133.164 30.92H133.964V33H132.284C131.79 33 131.384 32.88 131.064 32.64C130.744 32.4 130.584 32.08 130.584 31.68V31.66H130.204C130.15 31.82 130.03 32.0333 129.844 32.3C129.657 32.5533 129.364 32.78 128.964 32.98C128.564 33.18 128.017 33.28 127.324 33.28ZM127.764 31.24C128.47 31.24 129.044 31.0467 129.484 30.66C129.937 30.26 130.164 29.7333 130.164 29.08V28.88H127.624C127.157 28.88 126.79 28.98 126.524 29.18C126.257 29.38 126.124 29.66 126.124 30.02C126.124 30.38 126.264 30.6733 126.544 30.9C126.824 31.1267 127.23 31.24 127.764 31.24ZM135.806 33V19H138.326V33H135.806Z"
            fill="#0B4E36"
          />
          <defs>
            <filter
              id="filter0_d_292_488"
              x="15.9121"
              y="7.1579"
              width="39.936"
              height="40.9362"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.5" dy="1.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0431373 0 0 0 0 0.305882 0 0 0 0 0.211765 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_292_488"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_292_488"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end ">
          <div className="flex items-center justify-end gap-x-4 lg:gap-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                {/* {localStorage.getItem("photoURL") === "null" ? ( */}
                <div className="h-8 w-8 rounded-full bg-gray-50 text-center text-black justify-center flex">
                  <span className="flex justify-center items-center">
                    {localStorage.getItem("displayName")?.split("")[0]}
                  </span>
                </div>

                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900 capitalize"
                    aria-hidden="true"
                  >
                    {userName || localStorage.getItem("displayName")}
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
