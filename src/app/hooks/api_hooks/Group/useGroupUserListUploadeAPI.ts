// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import { IgroupDetailsResponse } from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useGroupUserListUploadeAPI = () => {
  const [params, _setparams] = useSearchParams();
  const groupId = params.get("group_id");

  const execute = useCallback(async (file: File) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const formData = new FormData();
      formData.append("file", file);
      const response: InventoryTaxCreateAPIResponse = await axios
        .post(
          `${USER_LOGIN_APIS.UPLOAD_USER_SHEET.baseURL}${groupId}`,
          formData,
          {
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
            // onUploadProgress: (event) => {
            //   console.log(event.total, "total");
            //   if (event.total === 100) {
            //     //
            //   }
            // },
          }
        )
        .then((res: AxiosResponse<IgroupDetailsResponse>) => {
          if (res.data.status === true) {
            toast.success("User list Uploading  Successful");
            return { status: true, message: res.data?.data?.group_id };
          } else {
            toast.error("User list Uploading  Failed");
            return { status: false, message: null };
          }
        })
        .catch((e: AxiosError) => {
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("User list Uploading  Failed");
            return { status: false, message: null };
          }
          if (e.response.status === 400) {
            toast.error("User list Uploading  Failed");
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
