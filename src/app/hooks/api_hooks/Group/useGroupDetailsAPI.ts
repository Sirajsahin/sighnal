// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { IgroupDetailsResponse } from "@/api_framework/api_modals/group";
import { setGroupDetails } from "@/app_redux/reducers/slice/auth/survey_slice";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useGroupDetailsAPI = () => {
  const dispatch = useDispatch();
  const execute = useCallback(async (group_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(`${USER_LOGIN_APIS.GROUP_DETAILS_API.baseURL}${group_id} `, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IgroupDetailsResponse>) => {
          if (res.data.status === true) {
            dispatch(setGroupDetails({ data: res.data?.data }));
          } else {
            dispatch(setGroupDetails({ data: null }));
          }
        })
        .catch((e: AxiosError) => {
          dispatch(setGroupDetails({ data: null }));
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
      dispatch(setGroupDetails({ data: null }));
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
