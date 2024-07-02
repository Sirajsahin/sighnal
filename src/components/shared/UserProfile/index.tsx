import { IoMdArrowDropright } from "react-icons/io";

import Input from "@/components/ui/Input";
import GroupUploadUsersModalComponent from "@/components/ui/Modal/GroupUploadUsersModalComponent";
import SearchableSelectMenu from "@/components/ui/SearchableSelectMenu";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useFormValidations from "../UI_Interface/useFormValidation";

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
  const [open, setOpen] = useState<boolean>(false);

  const {
    forAlphaNumericWithoutDot,
    forEmail,
    forMobile,
    forAlphaNumeric,
    forOnlyNumber,
  } = useFormValidations();

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

  const [logo, setLogo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 400 && img.height === 400) {
          setLogo(file);
          toast.success("Logo Upload Successfully");
        } else {
          toast.error("Please upload an image with dimensions 400x400 pixels.");
        }
      };
    }
  };

  return (
    <div className="grid grid-cols-12">
      <form
        action="#"
        method="POST"
        className="space-y-4 col-span-10"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 items-center my-4">
          <div className="h-20 w-20 rounded-full bg-[#D9D9D9] flex items-center justify-center relative overflow-hidden cursor-pointer">
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt="Company Logo"
                className="h-full w-full object-cover rounded-full cursor-pointer"
              />
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer text-xs text-gray-500">
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  className="opacity-0 cursor-pointer w-full h-full hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          {logo ? (
            <div className="mt-2 w-32 flex items-center">
              <label className="text-xs text-gray-500 flex justify-center cursor-pointer border border-[#333333] px-3 py-1 rounded-xl">
                Change Logo
                <input
                  type="file"
                  accept="image/*"
                  className="opacity-0 cursor-pointer w-full h-full hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-[#333333] font-bold">
                Upload Company Logo
              </p>
              <p className="text-xs text-[#475467] py-1 font-medium">
                Recommended size: 400x400px
              </p>
            </div>
          )}
        </div>
        <div className="pt-3">
          <p className="text-base text-[#333333] font-bold">
            Your Personal details
          </p>
          <p className="text-sm text-[#475467] ">
            Please provide your personal details, they will be used to complete
            your profile on Sighnal.
          </p>
          <div className="grid grid-cols-2 gap-6 items-center mt-4">
            <Input
              className="text-xs"
              placeholder="Enter Your Name"
              // labelName="Name"
              isMandatory={true}
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
            <SearchableSelectMenu
              // label="I’m a citizen of"
              errorMessages={[
                {
                  message: "Country is required",
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
              placeholder="Select Country"
              showTooltips={true}
              showTypedErrors={true}
              showDropdownIcon={true}
              defaultSelected={
                dataItemList?.filter(
                  (oc) => oc.title === formHook.watch(`citizen`)
                )[0]
              }
              listBoxClassName="w-full"
              className="text-gray-400 "
              containerClassName="w-full"
            />
            <Input
              className="text-xs"
              type="email"
              placeholder="Enter Your Email"
              // labelName="Email"
              isMandatory={true}
              register={formHook.register("email", {
                required: true,
                ...forEmail.validations,
              })}
              fieldError={formHook.formState.errors.email}
              errorMessages={[
                {
                  message: "Email is required",
                  type: "required",
                },
                forEmail.errors,
              ]}
            />
            <Input
              className="text-xs"
              placeholder="Enter Your Phone"
              isMandatory={true}
              // labelName="Phone"
              register={formHook.register("phone", {
                required: true,
                ...forMobile.validations,
              })}
              fieldError={formHook.formState.errors.phone}
              errorMessages={[
                {
                  message: "Phone is required",
                  type: "required",
                },
                forMobile.errors,
              ]}
            />
            <SearchableSelectMenu
              // label="Job Title"
              errorMessages={[
                {
                  message: " Job title is required",
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
              placeholder="Select Job Title"
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
        <div className="pt-4">
          <p className="text-base text-[#333333] font-bold">
            Your Organisation details
          </p>
          <p className="text-sm text-[#475467] ">
            Please provide your Organisation information accurately, It will be
            used in your communications on the platform.
          </p>
          <div className="grid grid-cols-2 gap-6 items-center mt-4">
            <Input
              className="text-xs"
              placeholder="Enter Your Org Name"
              // labelName="Company Name"
              isMandatory={true}
              register={formHook.register("org_name", {
                required: true,
                ...forAlphaNumericWithoutDot.validations,
              })}
              fieldError={formHook.formState.errors.org_name}
              errorMessages={[
                {
                  message: "Org Name is required",
                  type: "required",
                },
                forAlphaNumericWithoutDot.errors,
              ]}
            />
            <SearchableSelectMenu
              errorMessages={[
                {
                  message: "Org Size is required",
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
              placeholder="Organisation Size"
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
              type="wbesite"
              isMandatory={true}
              // labelName="Website"
              placeholder="Enter Your Org Website"
              register={formHook.register("org_website", {
                required: true,
                ...forAlphaNumeric.validations,
              })}
              fieldError={formHook.formState.errors.org_website}
              errorMessages={[
                {
                  message: "Website is required",
                  type: "required",
                },
                forAlphaNumeric.errors,
              ]}
            />
            <Input
              // labelName="Company Age"
              isMandatory
              className="text-xs"
              placeholder="Enter Your Org Age"
              register={formHook.register("org_age", {
                required: true,
                ...forOnlyNumber.validations,
              })}
              fieldError={formHook.formState.errors.org_age}
              errorMessages={[
                {
                  message: "Org Age is required",
                  type: "required",
                },
                forOnlyNumber.errors,
              ]}
            />
            <div className="col-span-2">
              <TextareaComponent
                className="text-xs"
                placeholder="About Company "
                register={formHook.register("org_about", {
                  required: true,
                  ...forAlphaNumericWithoutDot.validations,
                })}
                fieldError={formHook.formState.errors.org_about}
                errorMessages={[
                  {
                    message: "This is required",
                    type: "required",
                  },
                  forAlphaNumericWithoutDot.errors,
                ]}
              />
            </div>
          </div>
          <div
            className="w-full border border-[#D0D5DD] px-4 py-3 rounded-lg my-4 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <p className="text-gray-400 text-xs flex items-center justify-between ">
              Add End Consumers <IoMdArrowDropright className="w-4 h-4" />
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex my-4 w-auto justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-medium text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Save Changes
          </button>
        </div>
      </form>

      {open && <GroupUploadUsersModalComponent setOpen={setOpen} open={open} />}
    </div>
  );
};

export default UserProfile;
