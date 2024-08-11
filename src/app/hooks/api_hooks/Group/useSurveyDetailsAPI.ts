// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
type InventoryTaxCreateAPIResponse = { status: boolean; message: string };

export interface ISurveyDetails {
  survey_id?: string;
  survey_name?: string;
  survey_description?: string;
}
export const useSurveyDetailsAPI = () => {
  const [serveyDetails, setServeyDetails] = useState<ISurveyDetails>(null);

  const execute = useCallback(async (survey_id: string) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      const response: InventoryTaxCreateAPIResponse = await axios
        .get(`${USER_LOGIN_APIS.SURVEY_CREATE_API.baseURL}${survey_id}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<any>) => {
          if (res.data.status === true) {
            setServeyDetails(res.data?.data);
            return { status: true, message: res.data?.data?.survey_id };
          } else {
            setServeyDetails(null);
            return { status: false, message: null };
          }
        })
        .catch((e: AxiosError) => {
          setServeyDetails(null);
          if (e.response && e.response.status === 400) {
            const ee = (e.response.data as any).message;
            toast.error(ee);
            return { status: false, message: null };
          }
          if (e.response.status === 400) {
            toast.error("Survey Created Faild");
            return { status: false, message: null };
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
            return { status: false, message: null };
          }
        });
      return response;
    } catch (e: any) {
      setServeyDetails(null);
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, serveyDetails };
};
