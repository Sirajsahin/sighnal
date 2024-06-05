import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { useUserCreateAPI } from "@/app/hooks/api_hooks/user/useUserCreateAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { LuLogOut } from "react-icons/lu";
import Input from "../ui/Input";
import SearchableSelectMenu from "../ui/SearchableSelectMenu";

export interface ICreateGroupFromFields {
  name: string;
  country: string;
  org_size: string;
  org_detp: string;
}

export default function Organaization() {
  const formHook = useForm<ICreateGroupFromFields>({
    defaultValues: {},
  });

  const { execute: createUserRole } = useUserCreateAPI();
  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.name !== "" || data?.org_detp !== "" || data?.org_size !== "") {
      isValid = true;
    }
    return isValid;
  };
  const onSubmit = (data: ICreateGroupFromFields) => {
    const isFormSubmissionValid = validateConditionalFormFields(data);
    if (!isFormSubmissionValid) {
      return;
    }
    if (data && isFormSubmissionValid) {
      const constructedData: ISignalUserCreateProps = {
        name: data.name,
        email: data.country,
        password: data.org_size,
      };

      createUserRole(constructedData);
    }
  };

  const dataItemList = [];
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
              <div className="flex items-center gap-1 font-semibold">
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
                        // ...forAlphaNumericWithoutDot.validations
                      })}
                      fieldError={formHook.formState.errors.name}
                      errorMessages={[
                        {
                          message: "Name is required",
                          type: "required",
                        },
                        // forAlphaNumericWithoutDot.errors
                      ]}
                    />
                  </div>
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
                          formHook.setValue(`country`, item.title);
                        }
                      }}
                      fieldError={formHook?.formState?.errors?.country}
                      register={formHook.register(`country`, {
                        required: true,
                      })}
                      selectItems={dataItemList}
                      placeholder="Select Parent Theme"
                      showTooltips={true}
                      showTypedErrors={true}
                      showDropdownIcon={true}
                      defaultSelected={
                        dataItemList?.filter(
                          (oc) => oc.title === formHook.watch(`country`)
                        )[0]
                      }
                      listBoxClassName="w-full"
                      className="text-gray-800 "
                      containerClassName="w-full"
                    />
                    <div>
                      <div className="my-6">
                        <Input
                          className="text-xs"
                          type="text"
                          placeholder="Organisation Size"
                          register={formHook.register("org_size", {
                            required: true,
                            // ...forAlphaNumericWithoutDot.validations
                          })}
                          fieldError={formHook.formState.errors.org_size}
                          errorMessages={[
                            {
                              message: "Group Name is required",
                              type: "required",
                            },
                            // forAlphaNumericWithoutDot.errors
                          ]}
                        />
                      </div>
                    </div>
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
                        }}
                        fieldError={formHook?.formState?.errors?.org_detp}
                        register={formHook.register(`org_detp`, {
                          required: true,
                        })}
                        selectItems={dataItemList}
                        placeholder="Your Department"
                        showTooltips={true}
                        showTypedErrors={true}
                        showDropdownIcon={true}
                        defaultSelected={
                          dataItemList?.filter(
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
                      className="flex w-full justify-center rounded-md bg-[#333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
            <button className=" border border-1  px-4 py-2 rounded-md text-sm hover:bg-slate-500 hover:text-white flex gap-1 items-center">
              <LuLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
