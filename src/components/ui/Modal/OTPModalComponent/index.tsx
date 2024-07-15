import { useSendOtpAPI } from "@/app/hooks/api_hooks/user/useSendOtpAPI";
import { useVerifyOtpAPI } from "@/app/hooks/api_hooks/user/useVerifyOtpAPI";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IGroupDeleteModalComponent } from "./interface";

const OTPModalComponent: React.FC<IGroupDeleteModalComponent> = ({
  open,
  setOpen,
  email,
}) => {
  const [otp, setOtp] = useState<string>("");
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();
  const { execute: resendOTPAPI } = useSendOtpAPI();
  const { execute: verifyOTPAPI } = useVerifyOtpAPI();

  const resendOTP = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken) {
      resendOTPAPI(authToken);
    }
  };

  const verifyOtp = () => {
    verifyOTPAPI(otp).then(({ status }) => {
      if (status) {
        navigate("/app/login/onboard");
      }
    });
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      // Automatically focus the next input
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-3 text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex justify-center flex-col gap-4 items-center">
                  <div className="rounded-lg border border-[#EAECF0] h-14 w-14 flex justify-center items-center">
                    <HiOutlineMail className="w-5 h-5" />
                  </div>
                  <p className="text-xl text-[#333333] font-medium">
                    Check your email
                  </p>
                  <p className="text-[#475467] font-base">
                    We sent a verification code to{" "}
                    <span className="font-medium block">{email}</span>
                  </p>
                </div>
                <div className="my-6">
                  <p className="text-[#475467] font-sm w-full">
                    Enter Verification Code
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        ref={(el) => (inputsRef.current[index] = el!)}
                        className="rounded-lg border-2 border-[#333333] h-14 w-14 flex justify-center items-center text-[#333333] font-medium text-4xl text-center"
                        value={otp[index] || ""}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyUp={(e) => handleKeyUp(e, index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="my-2">
                  <button
                    className="bg-[#333333] text-base text-white font-medium items-center w-full rounded-lg p-2 "
                    onClick={() => verifyOtp()}
                  >
                    Verify email
                  </button>
                </div>
                <div className="my-6 flex items-center justify-center">
                  <p className="text-[#475467] text-sm items-center">
                    Didn’t receive the email?
                    <span
                      className="font-medium text-[#333333] cursor-pointer"
                      onClick={() => resendOTP()}
                    >
                      Click to resend
                    </span>
                  </p>
                </div>
                <p className="text-[#333333] text-sm flex items-center justify-center gap-1 cursor-pointer">
                  <span
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1"
                  >
                    <FaArrowLeft className="h-4 w-4" />
                    Back
                  </span>
                </p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OTPModalComponent;
