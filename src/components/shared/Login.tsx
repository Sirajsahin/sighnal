import { ISignalUserCreateProps } from "@/api_framework/api_modals/FirebaseLogin";
import { useUserCreateAPI } from "@/app/hooks/api_hooks/user/useUserCreateAPI";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import GoogleSigninButton from "./GoogleSignInButton";
import Organaization from "./Organaization";
import { useEffect } from "react";

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
  useEffect(()=>{
    const accessToken = localStorage?.getItem("AuthToken") ? true : false;
    console.log(accessToken)
  },[])
  const accessToken = localStorage?.getItem("AuthToken") ? true : false;

  return (
    <>
      <div className="flex h-screen flex-1 overflow-y-auto">
        {accessToken ? (
          <Organaization />
        ) : (
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign up as an organisation
                </h2>
              </div>

              <div className="mt-10">
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
                        <Input
                          className="text-xs"
                          type="password"
                          placeholder="Enter Your Password "
                          register={formHook.register("password", {
                            required: true,
                            // ...forAlphaNumericWithoutDot.validations
                          })}
                          fieldError={formHook.formState.errors.password}
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
                        className="flex w-full justify-center rounded-md bg-[#333] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-10">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-white px-6 text-gray-900">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1">
                    <GoogleSigninButton />
                  </div>
                </div>
                <p className="text-xs py-5">
                  By confirming your email, you agree to our{" "}
                  <a className="font-semibold text-black cursor-pointer text-sm">
                    Terms of Services
                  </a>{" "}
                  and that you have read and understood our{" "}
                  <a className="font-semibold text-black cursor-pointer text-sm">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
