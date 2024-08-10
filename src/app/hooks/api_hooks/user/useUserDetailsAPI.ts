// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IUserDetails,
  IUserDetailsResponse,
} from "@/api_framework/api_modals/user";
import { setUserName } from "@/app_redux/reducers/slice/auth/survey_slice";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useUserDetailsAPI = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails>(null);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(USER_LOGIN_APIS.USER_DETAILS.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IUserDetailsResponse>) => {
          if (res.data?.status) {
            setUserDetails(res.data?.data);
            dispatch(setUserName({ data: res.data.data.name }));
            localStorage.setItem("displayName", res.data.data.name);
          } else {
            setUserDetails(null);
            dispatch(setUserName({ data: null }));
            // navigate("/app/login/onboard");
          }
        })
        .catch((e: AxiosError) => {
          setUserDetails(null);
          dispatch(setUserName({ data: null }));
          // navigate("/app/login/onboard");
          if (e.code === "ERR_BAD_REQUEST") {
            //
          }
          if (e.status === 400) {
            toast.error("User Onboard Faild");
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
          }
        });
    } catch (e: any) {
      dispatch(setUserName({ data: null }));
      setUserDetails(null);
      // navigate("/app/login/onboard");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, userDetails };
};
