// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  ISurveyCreateProps,
  ISurveyCreateResponse,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export const useSurveyUpdateAPI = () => {
  const execute = useCallback(
    async (paramProps: ISurveyCreateProps, servey_id) => {
      try {
        const accessToken = localStorage.getItem("AuthToken");
        const response: InventoryTaxCreateAPIResponse = await axios
          .put(
            `${USER_LOGIN_APIS.SURVEY_CREATE_API.baseURL}${servey_id}`,
            paramProps,
            {
              headers: {
                Authorization: `${accessToken}`,
              },
            }
          )
          .then((res: AxiosResponse<ISurveyCreateResponse>) => {
            if (res.data.status === true) {
              toast.success("Survey updation successful");
              return { status: true, message: res.data?.data?.survey_id };
            } else {
              toast.error("Survey updation Faild");
              return { status: false, message: null };
            }
          })
          .catch((e: AxiosError) => {
            if (e.response && e.response.status === 400) {
              const ee = (e.response.data as any).message;
              toast.error(ee);
              return { status: false, message: null };
            }
            if (e.response.status === 400) {
              toast.error("Survey updation Faild");
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
    },
    []
  );
  return { execute };
};
