import { IUserOrgCreateProps } from "@/api_framework/api_modals/user";
import { useFirebaseLogin } from "@/app/hooks/api_hooks/auth/useFirebaseLogin";
import { useDepartmentListAPI } from "@/app/hooks/api_hooks/user/useDepartmentListAPI";
import { useUserCountyListAPI } from "@/app/hooks/api_hooks/user/useUserCountyListAPI";
import { useUserOrgCreateAPI } from "@/app/hooks/api_hooks/user/useUserOrgCreateAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import SearchableSelectMenu from "../ui/SearchableSelectMenu";
import { useSelectMenuReducer } from "../ui/useSelectMenuReducer";
import useFormValidations from "./UI_Interface/useFormValidation";

export interface ICreateGroupFromFields {
  name: string;
  country: string;
  org_size: string;
  org_detp: string;
}

export default function Organaization() {
  const formHook = useForm<ICreateGroupFromFields>({
    mode: "onChange",
    defaultValues: {},
  });

  const { clientSignOut } = useFirebaseLogin();
  const { forOnlyNumber, forAlphaNumericWithoutDot } = useFormValidations();

  const { execute: createUserOrg } = useUserOrgCreateAPI();
  const { execute: fetcCountry, countyList } = useUserCountyListAPI();
  const { execute: fetchDepartment, department } = useDepartmentListAPI();

  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.name !== "" || data?.org_detp !== "" || data?.org_size !== "") {
      isValid = true;
    }
    return isValid;
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetcCountry();
    fetchDepartment();
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email")?.split("@")[1]?.split(".")[0];
    if (email?.toLowerCase() !== "gmail") {
      formHook.setValue("name", email);
    }
  }, [localStorage.getItem("email")]);

  const countyListItem = useSelectMenuReducer(countyList, "name", "id");
  const departmentList = useSelectMenuReducer(department, "name", "id");
  const onSubmit = (data: ICreateGroupFromFields) => {
    const isFormSubmissionValid = validateConditionalFormFields(data);
    if (!isFormSubmissionValid) {
      return;
    }
    if (data && isFormSubmissionValid) {
      const constructedData: IUserOrgCreateProps = {
        org_name: data?.name,
        country: data.country,
        industry: data.org_detp,
        team_size: data.org_size,
      };
      createUserOrg(constructedData).then(({ status }) => {
        if (status) {
          navigate("/app/home");
        }
      });
    }
  };

  const handelBack = () => {
    navigate("/app/login/sign-in");
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
        <div className="flex flex-1 flex-col px-4  sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 py-12 flex justify-center flex-col mt-20">
            <div>
              <div
                className="flex items-center gap-1 font-semibold cursor-pointer"
                onClick={() => handelBack()}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Your organisation details
              </h2>
            </div>
            <p className="text-[#333333] text-sm mt-4">
              Please provide your Organisation information accurately, It will
              be used in your communications on the platform.
            </p>

            <div className="mt-10">
              <div>
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={formHook.handleSubmit(onSubmit)}
                >
                  <div className="my-6">
                    <Input
                      className="text-xs"
                      placeholder="Organisation Name"
                      register={formHook.register("name", {
                        required: true,
                        ...forAlphaNumericWithoutDot.validations,
                      })}
                      fieldError={formHook.formState.errors.name}
                      errorMessages={[
                        {
                          message: "Name is required",
                          type: "required",
                        },
                        forAlphaNumericWithoutDot.errors,
                      ]}
                    />
                  </div>
                  <div className="my-6">
                    <Input
                      className="text-xs"
                      placeholder="Organisation Size"
                      register={formHook.register("org_size", {
                        required: true,
                        ...forOnlyNumber.validations,
                      })}
                      fieldError={formHook.formState.errors.org_size}
                      errorMessages={[
                        {
                          message: "Size is required",
                          type: "required",
                        },
                        forOnlyNumber.errors,
                      ]}
                    />
                  </div>
                  <div className="my-6">
                    <SearchableSelectMenu
                      errorMessages={[
                        {
                          message: " Country is required",
                          type: "required",
                        },
                      ]}
                      onSelectItem={(item) => {
                        if (item) {
                          formHook.setValue(`country`, item.title);
                        }
                        formHook.clearErrors("country");
                      }}
                      fieldError={formHook?.formState?.errors?.country}
                      register={formHook.register(`country`, {
                        required: true,
                      })}
                      selectItems={countyListItem}
                      placeholder="Select Country"
                      showTooltips={false}
                      showTypedErrors={true}
                      showDropdownIcon={true}
                      defaultSelected={
                        countyListItem?.filter(
                          (oc) => oc.title === formHook.watch(`country`)
                        )[0]
                      }
                      listBoxClassName="w-full"
                      className="text-gray-800 "
                      containerClassName="w-full"
                    />

                    <div className="my-6">
                      <SearchableSelectMenu
                        errorMessages={[
                          {
                            message: " theme is required",
                            type: "required",
                          },
                        ]}
                        onSelectItem={(item) => {
                          if (item) {
                            formHook.setValue(`org_detp`, item.title);
                          }
                          formHook.clearErrors("org_detp");
                        }}
                        fieldError={formHook?.formState?.errors?.org_detp}
                        register={formHook.register(`org_detp`, {
                          required: true,
                        })}
                        selectItems={departmentList}
                        placeholder="Your Department"
                        showTooltips={false}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          departmentList?.filter(
                            (oc) => oc.title === formHook.watch(`org_detp`)
                          )[0]
                        }
                        listBoxClassName="w-full"
                        className="text-gray-800 "
                        containerClassName="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm "
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
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
