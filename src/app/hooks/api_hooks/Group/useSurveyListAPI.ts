import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { ISurveyListResponse } from "@/api_framework/api_modals/group";
import { useAppDispatch } from "@/app_redux/hooks/root_hook";
import { setSurveyList } from "@/app_redux/reducers/slice/auth/survey_slice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
export interface ISurveyListProps {
  group_id?: string;
  status?: string;
}
export const useSurveyListAPI = () => {
  const dispatch = useAppDispatch();

  const execute = useCallback(async (params: ISurveyListProps | null) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");

      let API_FLAG = null;

      const group_id = params?.group_id;
      const status = params?.status;
      if (status && group_id) {
        API_FLAG = `${USER_LOGIN_APIS.SURVEY_LIST.baseURL}?group_id=${group_id}&status=${status}`;
      } else if (status) {
        API_FLAG = `${USER_LOGIN_APIS.SURVEY_LIST.baseURL}?status=${status}`;
      } else {
        API_FLAG = `${USER_LOGIN_APIS.SURVEY_LIST.baseURL}`;
      }

      await axios
        .get(API_FLAG ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<ISurveyListResponse>) => {
          if (res.data.status === true) {
            dispatch(setSurveyList({ data: res.data.data }));
          } else {
            dispatch(setSurveyList({ data: [] }));
          }
        })
        .catch((e: AxiosError) => {
          dispatch(setSurveyList({ data: [] }));
          if (e.code === "ERR_BAD_REQUEST") {
            //
          }
          if (e.status === 400) {
            toast.error("User Onboard Faild");
          }
          if (e.response && e.response.status === 500) {
            toast.error("Server error 500");
          }
        });
    } catch (e: any) {
      dispatch(setSurveyList({ data: [] }));
      toast.error("Server Error: " + e.message);
    }
  }, []);

  return { execute };
};
