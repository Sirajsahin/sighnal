import Input from "@/components/ui/Input";
import SearchableSelectMenu from "@/components/ui/SearchableSelectMenu";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { useForm } from "react-hook-form";

export interface ICreateGroupFromFields {
  name: string;
  citizen: string;
  phone: string;
  email: string;
  jobTitle: string;
  org_name: string;
  org_size: string;
  org_website: string;
  org_age: string;
  org_about: string;
}

const UserProfile = () => {
  const formHook = useForm<ICreateGroupFromFields>({
    defaultValues: {},
  });

  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.name !== "" || data?.email !== "" || data?.phone !== "") {
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
      //   const constructedData: ISignalUserCreateProps = {
      //     name: data.name,
      //     email: data.email,
      //     password: data.password,
      //   };
      //   createUserRole(constructedData);
    }
  };
  const dataItemList = [
    { id: "1", title: "siraj" },
    { id: "2", title: "siraj" },
    { id: "3", title: "siraj" },
  ];

  return (
    <div className="grid grid-cols-12">
      <form
        action="#"
        method="POST"
        className="space-y-4 col-span-10"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 items-center my-4">
          <div className="h-20 w-20 rounded-full bg-[#D9D9D9] items-center flex justify-center"></div>
          <div>
            <p className="text-sm text-[#333333] font-bold">
              Upload Company Logo
            </p>
            <p className="text-xs text-[#475467] py-1 font-medium">
              Recommended size: 400x400px
            </p>
          </div>
        </div>
        <div className="my-6">
          <p className="text-base text-[#333333] font-bold">
            Your Personal details
          </p>
          <p className="text-sm text-[#475467] py-1">
            Please provide your personal details, they will be used to complete
            your profile on Sighnal.
          </p>
          <div className="grid grid-cols-2 gap-6 items-center mt-4">
            <Input
              className="text-xs"
              placeholder="Enter Your Name"
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
            <SearchableSelectMenu
              errorMessages={[
                {
                  message: " theme is required",
                  type: "required",
                },
              ]}
              onSelectItem={(item) => {
                if (item) {
                  formHook.setValue(`citizen`, item.title);
                }
              }}
              fieldError={formHook?.formState?.errors?.citizen}
              register={formHook.register(`citizen`, {
                required: true,
              })}
              selectItems={dataItemList}
              placeholder="Select Parent Theme"
              showTooltips={true}
              showTypedErrors={true}
              showDropdownIcon={true}
              defaultSelected={
                dataItemList?.filter(
                  (oc) => oc.title === formHook.watch(`citizen`)
                )[0]
              }
              listBoxClassName="w-full"
              className="text-gray-800 "
              containerClassName="w-full"
            />
            <Input
              className="text-xs"
              type="email"
              placeholder="Enter Your Email"
              register={formHook.register("email", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.email}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
            <Input
              className="text-xs"
              placeholder="Enter Your Phone"
              register={formHook.register("phone", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.phone}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
            <SearchableSelectMenu
              errorMessages={[
                {
                  message: " theme is required",
                  type: "required",
                },
              ]}
              onSelectItem={(item) => {
                if (item) {
                  formHook.setValue(`jobTitle`, item.title);
                }
              }}
              fieldError={formHook?.formState?.errors?.jobTitle}
              register={formHook.register(`jobTitle`, {
                required: true,
              })}
              selectItems={dataItemList}
              placeholder="Select Parent Theme"
              showTooltips={true}
              showTypedErrors={true}
              showDropdownIcon={true}
              defaultSelected={
                dataItemList?.filter(
                  (oc) => oc.title === formHook.watch(`jobTitle`)
                )[0]
              }
              listBoxClassName="w-full"
              className="text-gray-800 "
              containerClassName="w-full"
            />
          </div>
        </div>
        <div className="pt-12">
          <p className="text-base text-[#333333] font-bold">
            Your Organisation details
          </p>
          <p className="text-sm text-[#475467] py-1">
            Please provide your Organisation information accurately, It will be
            used in your communications on the platform.
          </p>
          <div className="grid grid-cols-2 gap-6 items-center mt-4">
            <Input
              className="text-xs"
              placeholder="Enter Your Org Name"
              register={formHook.register("org_name", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.org_name}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
            <SearchableSelectMenu
              errorMessages={[
                {
                  message: " theme is required",
                  type: "required",
                },
              ]}
              onSelectItem={(item) => {
                if (item) {
                  formHook.setValue(`org_size`, item.title);
                }
              }}
              fieldError={formHook?.formState?.errors?.org_size}
              register={formHook.register(`org_size`, {
                required: true,
              })}
              selectItems={dataItemList}
              placeholder="Select Parent Theme"
              showTooltips={true}
              showTypedErrors={true}
              showDropdownIcon={true}
              defaultSelected={
                dataItemList?.filter(
                  (oc) => oc.title === formHook.watch(`org_size`)
                )[0]
              }
              listBoxClassName="w-full"
              className="text-gray-800 "
              containerClassName="w-full"
            />
            <Input
              className="text-xs"
              type="email"
              placeholder="Enter Your Org Website"
              register={formHook.register("org_website", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.org_website}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
            <Input
              className="text-xs"
              placeholder="Enter Your Org Age"
              register={formHook.register("org_age", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.org_age}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
            <TextareaComponent
              className="text-xs"
              placeholder="About Your Org"
              register={formHook.register("org_about", {
                required: true,
                // ...forAlphaNumericWithoutDot.validations
              })}
              fieldError={formHook.formState.errors.org_about}
              errorMessages={[
                {
                  message: "Name is required",
                  type: "required",
                },
                // forAlphaNumericWithoutDot.errors
              ]}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
