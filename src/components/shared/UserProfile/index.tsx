import {
  IOrganizationDetails,
  IUserDetails,
} from "@/api_framework/api_modals/user";
import { useImageUploadAPI } from "@/app/hooks/api_hooks/Group/useImageUploadAPI";
import { useIndratryListAPI } from "@/app/hooks/api_hooks/user/useIndratryListAPI";
import { useJobTypetListAPI } from "@/app/hooks/api_hooks/user/useJobTypeListAPI";
import { useOrganizationDetailsAPI } from "@/app/hooks/api_hooks/user/useOrganizationDetailsAPI";
import { useUpdatedOrganizationDetailsAPI } from "@/app/hooks/api_hooks/user/useUpdatedOrganizationDetailsAPI";
import { useUpdateUserDetailsAPI } from "@/app/hooks/api_hooks/user/useUpdateUserDetailsAPI";
import { useUserCountyListAPI } from "@/app/hooks/api_hooks/user/useUserCountyListAPI";
import { useUserDetailsAPI } from "@/app/hooks/api_hooks/user/useUserDetailsAPI";
import Input from "@/components/ui/Input";
import SearchableSelectMenu from "@/components/ui/SearchableSelectMenu";
import TextareaComponent from "@/components/ui/TextareaComponent";
import { useSelectMenuReducer } from "@/components/ui/useSelectMenuReducer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormValidations from "../UI_Interface/useFormValidation";

export interface IUserProfileLogo {
  base_64_string: string;
  file_extension: string;
  file_name: string;
  is_thumbnail?: boolean;
  image_url?: string;
}

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
  Industry: string;
  icon?: string;
}

const UserProfile = () => {
  const { forAlphaNumericWithoutDot, forEmail, forMobile, forOnlyNumber } =
    useFormValidations();
  // const { fileListToBase64 } = useUtils();

  const { execute: fetchOrganizationDetailsAPI, organization } =
    useOrganizationDetailsAPI();
  const { execute: fetchUserDetails, userDetails } = useUserDetailsAPI();
  const { execute: fetcCountry, countyList } = useUserCountyListAPI();
  const { execute: fetchIndustry, industry } = useIndratryListAPI();
  const { execute: fetchJobType, jobType } = useJobTypetListAPI();
  const { execute: updateOrganization } = useUpdatedOrganizationDetailsAPI();
  const { execute: updateUserDetails } = useUpdateUserDetailsAPI();
  const { execute: convertImageToS3LinkAPI } = useImageUploadAPI();

  const formHook = useForm<ICreateGroupFromFields>({
    mode: "onChange",
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
      const constructedData: IOrganizationDetails = {
        country: data.citizen,
        updated_at: "",
        updated_by: localStorage.getItem("email"),
        industry: data.Industry,
        org_id: organization?.org_id,
        org_name: data.org_name,
        team_size: data.org_size,
        about: data.org_about,
        age: data.org_age,
        website: data.org_website,
        icon: data.icon ? data.icon : null,
      };
      const constructedDataUser: IUserDetails = {
        name: data.name,
        updated_at: "",
        updated_by: localStorage.getItem("email"),
        email: data.email,
        is_email_verified: true,
        user_id: userDetails?.user_id,
        phone: data.phone,
        department: data.jobTitle,
      };
      updateOrganization(constructedData).then(() => {
        fetchOrganizationDetailsAPI();
      });
      updateUserDetails(constructedDataUser).then(() => {
        fetchUserDetails();
      });
    }
  };

  useEffect(() => {
    fetchOrganizationDetailsAPI();
    fetchUserDetails();
    fetcCountry();
    fetchIndustry();
    fetchJobType();
  }, []);

  useEffect(() => {
    if (userDetails && organization) {
      //user details
      localStorage.setItem("displayName", userDetails.name);
      formHook.setValue("email", userDetails.email);
      formHook.setValue("name", userDetails.name);
      formHook.setValue("phone", userDetails.phone);
      formHook.setValue("jobTitle", userDetails.department);

      //organization
      formHook.setValue("org_name", organization.org_name);
      formHook.setValue("org_size", organization.team_size);
      formHook.setValue("org_website", organization.website);
      formHook.setValue("org_age", organization.age);
      formHook.setValue("Industry", organization.industry);
      formHook.setValue("citizen", organization.country);
      formHook.setValue("org_about", organization.about);
      formHook.setValue("icon", organization?.icon);
    }
  }, [userDetails, organization]);

  const countyListItem = useSelectMenuReducer(countyList, "name", "id");
  const industryListItem = useSelectMenuReducer(industry, "name", "id");
  const jobTypeListItem = useSelectMenuReducer(jobType, "name", "id");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as any;
      convertImageToS3LinkAPI(file).then(({ status, message }) => {
        if (status) {
          formHook.setValue("icon", message);
          const data = { ...organization, icon: message };
          updateOrganization(data).then(() => {
            fetchOrganizationDetailsAPI();
          });
        }
      });
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
            {organization?.icon ? (
              <img
                src={organization?.icon}
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
          {organization?.icon ? (
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
                {/* Recommended size: 400x400px */}
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
          <div className="grid grid-cols-2 gap-6 items-center mt-6">
            <div>
              <p className="flex items-center gap-1 text-sm">
                Name <span className="text-red-400">*</span>
              </p>
              <Input
                autoComplete="false"
                className="text-xs"
                placeholder="Enter Your Name"
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
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Email <span className="text-red-400">*</span>
              </p>
              <Input
                className="text-xs"
                type="email"
                placeholder="Enter Your Email"
                // labelName="Email"
                disabled
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
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Contact <span className="text-red-400">*</span>
              </p>
              <Input
                className="text-xs"
                placeholder="Enter Your Phone"
                isMandatory={true}
                // labelName="Phone"
                maxLength={10}
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
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Job Title <span className="text-red-400">*</span>
              </p>
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
                  formHook.clearErrors("jobTitle");
                }}
                fieldError={formHook?.formState?.errors?.jobTitle}
                register={formHook.register(`jobTitle`, {
                  required: true,
                })}
                selectItems={jobTypeListItem}
                placeholder="Select Job Title"
                showTooltips={false}
                showTypedErrors={true}
                showDropdownIcon={true}
                defaultSelected={
                  jobTypeListItem?.filter(
                    (oc) => oc.title === formHook.watch(`jobTitle`)
                  )[0]
                }
                listBoxClassName="w-full"
                className="text-gray-800 "
                containerClassName="w-full"
              />
            </div>
          </div>
        </div>
        <div className="pt-10">
          <p className="text-base text-[#333333] font-bold">
            Your Organisation details
          </p>
          <p className="text-sm text-[#475467] ">
            Please provide your Organisation information accurately, It will be
            used in your communications on the platform.
          </p>
          <div className="grid grid-cols-2 gap-6 items-center mt-6">
            <div>
              <p className="flex items-center gap-1 text-sm">
                Organisation Name <span className="text-red-400">*</span>
              </p>
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
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Organisation Size <span className="text-red-400">*</span>
              </p>
              <Input
                className="text-xs"
                placeholder="Organisation Size"
                // labelName="Company Name"
                isMandatory={true}
                register={formHook.register("org_size", {
                  required: true,
                  ...forOnlyNumber.validations,
                })}
                fieldError={formHook.formState.errors.org_size}
                errorMessages={[
                  {
                    message: "Org Size is required",
                    type: "required",
                  },
                  forOnlyNumber.errors,
                ]}
              />
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Organisation Website <span className="text-red-400">*</span>
              </p>
              <Input
                className="text-xs"
                type="wbesite"
                isMandatory={true}
                // labelName="Website"
                placeholder="Enter Your Org Website"
                register={formHook.register("org_website", {
                  required: true,
                  // ...forAlphaNumeric.validations,
                })}
                fieldError={formHook.formState.errors.org_website}
                errorMessages={[
                  {
                    message: "Website is required",
                    type: "required",
                  },
                  // forAlphaNumeric.errors,
                ]}
              />
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Organisation Age <span className="text-red-400">*</span>
              </p>
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
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Country <span className="text-red-400">*</span>
              </p>
              <SearchableSelectMenu
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
                  formHook.clearErrors(`citizen`);
                }}
                fieldError={formHook?.formState?.errors?.citizen}
                register={formHook.register(`citizen`, {
                  required: true,
                })}
                selectItems={countyListItem}
                placeholder="Select Country"
                showTooltips={false}
                showTypedErrors={true}
                showDropdownIcon={true}
                defaultSelected={
                  countyListItem?.filter(
                    (oc) => oc.title === formHook.watch(`citizen`)
                  )[0]
                }
                listBoxClassName="w-full"
                containerClassName="w-full"
              />
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm">
                Organisation Type<span className="text-red-400">*</span>
              </p>
              <SearchableSelectMenu
                // label="I’m a citizen of"
                errorMessages={[
                  {
                    message: "Industry  is required",
                    type: "required",
                  },
                ]}
                onSelectItem={(item) => {
                  if (item) {
                    formHook.setValue(`Industry`, item.title);
                  }
                  formHook.clearErrors(`Industry`);
                }}
                fieldError={formHook?.formState?.errors?.Industry}
                register={formHook.register(`Industry`, {
                  required: true,
                })}
                selectItems={industryListItem}
                placeholder="Select Industry"
                showTooltips={false}
                showTypedErrors={true}
                showDropdownIcon={true}
                defaultSelected={
                  industryListItem?.filter(
                    (oc) => oc.title === formHook.watch(`Industry`)
                  )[0]
                }
                listBoxClassName="w-full"
                containerClassName="w-full"
              />
            </div>
            <div className="col-span-2">
              <p className="flex items-center gap-1 text-sm">
                About Organisation<span className="text-red-400">*</span>
              </p>
              <div>
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
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm">
              End Consumers
              <span className="text-red-400">*</span>
            </p>
            <div className="w-full border border-[#D0D5DD] px-4 py-3 rounded-lg  cursor-pointer">
              <p className="text-sm">Your End Consumers Displayed Here </p>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex my-4 w-auto justify-center rounded-md bg-[#333333] px-4 py-2 text-sm font-medium text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
