import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useImageUploadAPI = () => {
  const execute = useCallback(async (file: File) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const formData = new FormData();
      formData.append("file", file);

      const response: InventoryTaxCreateAPIResponse = await axios
        .post(USER_LOGIN_APIS.IMAGE_UPLOAD_API.baseURL ?? "", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data.status) {
            toast.success("Image Uploaded Successfully");
            return { status: true, message: res.data?.data?.link };
          } else {
            toast.error("Image Upload Failed");
            return { status: false, message: null };
          }
        })
        .catch((e: AxiosError) => {
          if (e.response) {
            const message = (e.response.data as any).message || "Upload failed";
            toast.error(message);
          } else {
            toast.error("An unexpected error occurred.");
          }
          return { status: false, message: null };
        });

      return response;
    } catch (e: any) {
      toast.error("Server Error: " + e.message);
      return { status: false, message: null };
    }
  }, []);

  return { execute };
};
