import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IUserListResponse,
  IUserListResponseData,
} from "@/api_framework/api_modals/group";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
export interface ISurveyListProps {
  group_id?: string;
  status?: string;
}
export const useGroupUserListAPI = () => {
  const [userData, setUserData] = useState<IUserListResponseData[]>([]);

  const execute = useCallback(
    async (group_id: string, selectedCategories?: Array<string>) => {
      console.log(selectedCategories, "selectedCategories");
      try {
        let API_FLAG = null;

        if (group_id && selectedCategories?.length > 0) {
          API_FLAG = `${USER_LOGIN_APIS.USER_LIST_API.baseURL}?group_id=${group_id}&tags=${selectedCategories}`;
        } else if (group_id) {
          API_FLAG = `${USER_LOGIN_APIS.USER_LIST_API.baseURL}?group_id=${group_id}`;
        } else {
          API_FLAG = `${USER_LOGIN_APIS.USER_LIST_API.baseURL}`;
        }

        const accessToken = localStorage.getItem("AuthToken");

        await axios
          .get(API_FLAG ?? "", {
            headers: {
              Authorization: `${accessToken}`,
            },
          })
          .then((res: AxiosResponse<IUserListResponse>) => {
            if (res.data.status === true) {
              setUserData(res.data.data);
              //
            } else {
              setUserData([]);
              //
            }
          })
          .catch((e: AxiosError) => {
            setUserData([]);
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
        setUserData([]);
        toast.error("Server Error: " + e.message);
      }
    },
    []
  );

  return { execute, userData };
};
