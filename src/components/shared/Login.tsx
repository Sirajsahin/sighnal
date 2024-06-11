import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { useUserCreateAPI } from "@/app/hooks/api_hooks/user/useUserCreateAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { useForm } from "react-hook-form";
import { MdDone } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Input from "../ui/Input";
import GoogleSigninButton from "./GoogleSignInButton";

import "primereact/resources/primereact.min.css"; // Core CSS
import "primereact/resources/themes/saga-blue/theme.css"; // Or the theme you are using

export interface ICreateGroupFromFields {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const formHook = useForm<ICreateGroupFromFields>({
    defaultValues: {},
  });

  const { execute: createUserRole } = useUserCreateAPI();
  /* Actions and Handlers */
  const validateConditionalFormFields = (data: ICreateGroupFromFields) => {
    let isValid = false;

    if (data?.name !== "" || data?.password !== "" || data?.email !== "") {
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
        email: data.email,
        password: data.password,
      };

      createUserRole(constructedData);
    }
  };

  const passwordValue = formHook.watch("password");

  const criteria = {
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    isValidLength:
      passwordValue && passwordValue.length >= 10 && passwordValue.length <= 50,
  };

  const footer = (
    <>
      <Divider />
      <p className="">Your password must contain:</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li className="flex items-center  gap-1">
          <MdDone
            className={`w-4 h-4 rounded-full items-center text-white text-xs ${
              criteria.hasUppercase ? "bg-green-600" : "bg-red-600"
            }`}
          />
          an uppercase character
        </li>
        <li className="flex items-center  gap-1">
          <MdDone
            className={`w-4 h-4 rounded-full items-center text-white text-xs ${
              criteria.hasSpecialChar ? "bg-green-600" : "bg-red-600"
            }`}
          />
          a spacial character
        </li>
        <li className="flex items-center  gap-1">
          <MdDone
            className={`w-4 h-4 rounded-full items-center text-white text-xs ${
              criteria.hasLowercase ? "bg-green-600" : "bg-red-600"
            }`}
          />
          a lowercase character
        </li>
        <li className="flex items-center  gap-1">
          <MdDone
            className={`w-4 h-4 rounded-full items-center text-white text-xs ${
              criteria.isValidLength ? "bg-green-600" : "bg-red-600"
            }`}
          />
          between 10 and 50 characters
        </li>
      </ul>
    </>
  );
  return (
    <>
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
                <div className="flex items-center gap-1 ">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </div>
                <h2 className="mt-4 text-xl font-bold leading-9 tracking-tight text-gray-900">
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
                      </div>
                    </div>
                    <div>
                      <div className="mt-2">
                        <Input
                          className="text-xs"
                          placeholder="Enter Email Address"
                          type="email"
                          register={formHook.register("email", {
                            required: true,
                            // ...forAlphaNumericWithoutDot.validations
                          })}
                          fieldError={formHook.formState.errors.email}
                          errorMessages={[
                            {
                              message: "Email is required",
                              type: "required",
                            },
                            // forAlphaNumericWithoutDot.errors
                          ]}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-2">
                        <div className="card flex justify-content-center items-center gap-1 w-full">
                          <Password
                            className="w-full "
                            value={formHook.watch("password")}
                            onChange={(e) => {
                              formHook.setValue("password", e.target.value);
                            }}
                            toggleMask
                            footer={footer}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
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
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-xs py-5 font-normal">
                  By confirming your email, you agree to our{" "}
                  <a className="font-semibold text-black cursor-pointer">
                    Terms of Services
                  </a>{" "}
                  and that you have read and understood our{" "}
                  <a className="font-semibold text-black cursor-pointer ">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-end my-4 pr-6 items-center gap-3 text-sm font-medium text-[#333333]">
              <p>Already have an account?</p>
              <button
                className=" border border-1 border-gray-600  px-6 py-2 rounded-md text-sm hover:bg-slate-500 hover:text-white flex gap-1 items-center"
                // onClick={() => clientSignOut()}
              >
                {/* <LuLogOut /> */}
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
