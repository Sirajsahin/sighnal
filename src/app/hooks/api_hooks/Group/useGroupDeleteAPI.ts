// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { IgroupDetailsResponse } from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useGroupDeleteAPI = () => {
  const execute = useCallback(async (group_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const response: InventoryTaxCreateAPIResponse = await axios
        .delete(`${USER_LOGIN_APIS.GROUP_CREATE_API.baseURL}${group_id}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IgroupDetailsResponse>) => {
          if (res.data.status === true) {
            toast.success("Group Deletion Successful");
            return { status: true, message: res.data?.data?.group_id };
          } else {
            toast.error("Group Deletion Faild");
            return { status: false, message: null };
          }
        })
        .catch((e: AxiosError) => {
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("Group Deletion Faild");
            return { status: false, message: null };
          }
          if (e.response.status === 400) {
            toast.error("Group Deletion Faild");
            return { status: false, message: null };
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
            return { status: false, message: null };
          }
        });
      return response;
    } catch (e: any) {
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
