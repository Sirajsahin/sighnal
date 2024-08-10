import { IUserOrgList } from "@/api_framework/api_modals/user";
import { useFirebaseLogin } from "@/app/hooks/api_hooks/auth/useFirebaseLogin";
import { useOrgListAPI } from "@/app/hooks/api_hooks/user/useOrgListAPI";
import { useOrgSelectAPI } from "@/app/hooks/api_hooks/user/useOrgSelectAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function OrganaizationListComponent() {
  const { clientSignOut } = useFirebaseLogin();
  // const { execute: createUserOrg } = useUserOrgCreateAPI();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const email = localStorage.getItem("email")?.split("@")[1]?.split(".")[0];
  //   formHook.setValue("name", email);
  // }, [localStorage.getItem("email")]);

  const { execute: fetchOrgListAPI, orgList } = useOrgListAPI();
  const { execute: selectAPI } = useOrgSelectAPI();

  const handelBack = () => {
    navigate("/app/login/sign-in");
  };

  useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    if (AuthToken) {
      fetchOrgListAPI(AuthToken);
    }
  }, [localStorage.getItem("AuthToken")]);

  const handelSelect = (item: IUserOrgList) => {
    selectAPI(item?.org_id);
  };

  return (
    <div>
      <div className="grid grid-cols-3 h-screen flex-1 overflow-y-auto">
        <div className="">
          <img
            className=" inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col px-4  sm:px-6 lg:flex-none lg:px-20 xl:px-20">
          <div className=" w-full  py-12 flex justify-center flex-col mt-20">
            <div>
              <div
                className="flex items-center gap-1 font-semibold cursor-pointer"
                onClick={() => handelBack()}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome back!{" "}
                <span className="capitalize">
                  {localStorage.getItem("displayName")?.split(" ")[0]}
                </span>
              </h2>
            </div>
            <p className="text-[#333333] text-sm mt-2">
              Choose a workspace below to resume your consumer research process
            </p>

            <div className="mt-10">
              <div>
                {orgList?.map((item, id) => {
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-4 w-full mb-4"
                    >
                      <div className="h-14 w-14 rounded-xl bg-[#EDFFF6] text-2xl capitalize flex items-center justify-center font-medium">
                        {item?.org_name?.substring(0, 1)}
                      </div>
                      <div
                        className=" border w-full  flex items-center justify-between p-2 rounded-xl cursor-pointer"
                        onClick={() => handelSelect(item)}
                      >
                        <div>
                          <p className="text-[#333333] text-sm font-medium capitalize">
                            {item?.org_name}
                          </p>
                          <p className="text-[#475467] text-[10px]">1 Member</p>
                        </div>
                        <p>
                          <FaArrowRight className="h-5 w-5" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm "
                onClick={() => navigate("/app/login/onboard")}
              >
                Create Another Space
              </button>
            </div>
            <div className="mt-10">
              <p className="text-[#27272544] text-sm text-center">
                Not seeing your workspace?
              </p>
              <p className="text-[#3284FF] text-[10px] text-center">
                Try a different email
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex justify-end my-4 pr-6">
            <button
              className=" border border-1  px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white flex gap-1 items-center"
              onClick={() => clientSignOut()}
            >
              <LuLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
