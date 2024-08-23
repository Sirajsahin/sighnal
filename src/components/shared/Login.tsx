import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { useUserCreateAPI } from "@/app/hooks/api_hooks/user/useUserCreateAPI";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import GoogleSigninButton from "./GoogleSignInButton";
import MyImage from "./Image/login.jpg";

import { useSendOtpAPI } from "@/app/hooks/api_hooks/user/useSendOtpAPI";
import "primereact/resources/primereact.min.css"; // Core CSS
import "primereact/resources/themes/saga-blue/theme.css"; // Or the theme you are using
import { useState } from "react";
import OTPModalComponent from "../ui/Modal/OTPModalComponent";
import useFormValidations from "./UI_Interface/useFormValidation";

export interface ICreateGroupFromFields {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const formHook = useForm<ICreateGroupFromFields>({
    mode: "onChange",
    defaultValues: {
      password: null,
    },
  });

  const { forAlphaNumericWithoutDot, forEmail } = useFormValidations();

  const { execute: createUserRole } = useUserCreateAPI();
  const { execute: sendOTP } = useSendOtpAPI();

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  // const [passwordIsrequired, setPasswordIsrequired] = useState<boolean>(false);

  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.name !== "" || data?.password !== "" || data?.email !== "") {
      isValid = true;
      // setPasswordIsrequired(false);
    } else {
      // setPasswordIsrequired(true);
      isValid = false;
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
        email: data.email,
        password: data.password,
      };

      createUserRole(constructedData).then(({ status, message }) => {
        if (status) {
          sendOTP(message).then(({ status }) => {
            if (status) {
              setOpen(true);
            }
          });
        } else {
          navigate("/app/login/sign-in");
        }
      });
      // navigate("/app/login/sign-in");
      // navigate("/app/login/onboard");
    }
  };

  const passwordValue = formHook.watch("password");

  const criteria = {
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    hasLowercase: passwordValue === null ? false : /[a-z]/.test(passwordValue),
    isValidLength: passwordValue && passwordValue.length >= 8,
    hasNumericChar: /[0-9]/.test(passwordValue),
  };

  const isValidPassword = () => {
    return (
      criteria.hasLowercase &&
      criteria.hasNumericChar &&
      criteria.hasSpecialChar &&
      criteria.hasUppercase &&
      criteria.isValidLength
    );
  };

  const footer = (
    <>
      <Divider className="text-sm my-1" />
      <p className="text-sm text-[#000000] font-medium">
        Your password must contain:
      </p>
      <ul className=" ml-2  line-height-3 flex flex-col gap-1 mt-1">
        <li className="flex items-center  gap-1 text-gray-400 text-xs font-normal">
          <MdDone
            className={`w-3 h-3 rounded-full items-center text-white text-xs ${
              criteria.hasUppercase ? "bg-green-600" : "bg-red-600"
            }`}
          />
          an uppercase character
        </li>
        <li className="flex items-center  gap-1 text-gray-400 text-xs font-normal">
          <MdDone
            className={`w-3 h-3 rounded-full items-center text-white text-xs ${
              criteria.hasSpecialChar ? "bg-green-600" : "bg-red-600"
            }`}
          />
          a spacial character
        </li>
        <li className="flex items-center  gap-1 text-gray-400 text-xs font-normal">
          <MdDone
            className={`w-3 h-3 rounded-full items-center text-white text-xs ${
              criteria.hasLowercase ? "bg-green-600" : "bg-red-600"
            }`}
          />
          a lowercase character
        </li>
        <li className="flex items-center  gap-1 text-gray-400 text-xs font-normal">
          <MdDone
            className={`w-3 h-3 rounded-full items-center text-white text-xs ${
              criteria.hasNumericChar ? "bg-green-600" : "bg-red-600"
            }`}
          />
          a numeric character
        </li>
        <li className="flex items-center  gap-1 text-gray-400 text-xs font-normal">
          <MdDone
            className={`w-3 h-3 rounded-full items-center text-white text-xs ${
              criteria.isValidLength ? "bg-green-600" : "bg-red-600"
            }`}
          />
          minimum 8 characters
        </li>
      </ul>
    </>
  );
  return (
    <>
      <div>
        <div className="grid grid-cols-3 h-screen flex-1 overflow-y-auto">
          <div className="h-screen">
            <img
              className=" inset-0 h-full w-full object-cover"
              src={MyImage}
              alt={MyImage}
            />
          </div>
          <div className="flex flex-1 flex-col px-4  sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96 py-12 flex justify-center flex-col mt-20">
              <div>
                <div className="flex items-center gap-1 text-[#333333]">
                  <FaArrowLeft className="w-4 h-4" />
                  Back
                </div>
                <h2 className="mt-4 text-xl font-bold leading-9 tracking-tight text-[#333333]">
                  Sign up as an organisation
                </h2>
              </div>
              <p className="text-[#333333] text-sm mt-2">
                Sign up with your work Google account or use the form.
              </p>
              <div className="">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  ></div>
                </div>

                <div className="mt-4 grid grid-cols-1">
                  <GoogleSigninButton />
                </div>
              </div>
              <div className="">
                <div className="flex justify-center items-center gap-4 text-[#D0D5DD] text-sm my-6">
                  <div className="w-36 border-t border-[#D0D5DD] bg-[#D0D5DD] " />
                  or
                  <div className="w-36 border-t border-[#D0D5DD]" />
                </div>
                <div>
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={formHook.handleSubmit(onSubmit)}
                  >
                    <div>
                      <div className="mt-2">
                        <Input
                          className="text-xs"
                          placeholder="Enter Name"
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
                    </div>
                    <div>
                      <div className="mt-2">
                        <Input
                          className="text-xs"
                          placeholder="Email Address"
                          type="email"
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
                    </div>
                    <div>
                      <div className="mt-2">
                        <div className="card flex  flex-col gap-1 w-full">
                          <Password
                            className="w-full text-xs leading-5 placeholder:text-xs placeholder:text-gray-50 focus:outline-none right-0"
                            placeholder="Password"
                            value={formHook.watch("password")}
                            onChange={(e) => {
                              formHook.setValue("password", e.target.value);
                            }}
                            toggleMask
                            footer={footer}
                            // required
                            // tooltip="s"
                          />
                          {!isValidPassword() && passwordValue && (
                            <p className="text-red-500 text-[10px]">
                              Invalid Password
                            </p>
                          )}
                          {/* {passwordIsrequired && (
                            <p className="text-red-500 text-[10px]">
                              Password is required
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-3 block text-sm leading-6 text-gray-700"
                        >
                          Remember me
                        </label>
                      </div>
                    </div> */}

                    <div>
                      <button
                        type="submit"
                        disabled={!isValidPassword()}
                        className="flex w-full justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in{" "}
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-xs py-8 font-normal text-[#475467]">
                  By confirming your email, you agree to our{" "}
                  <a className="font-semibold text-[#333333] cursor-pointer">
                    Terms of Services
                  </a>{" "}
                  and that you have read and understood our{" "}
                  <a className="font-semibold text-[#333333] cursor-pointer ">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          {open && (
            <OTPModalComponent
              open={open}
              setOpen={setOpen}
              email={formHook.watch("email")}
            />
          )}
          <div className=""></div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
