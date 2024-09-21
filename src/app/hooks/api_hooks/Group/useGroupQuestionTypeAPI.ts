// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IGroupQuestionTypeResponse,
  IGroupQuestionTypeResponseData,
} from "@/api_framework/api_modals/group";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useGroupQuestionTypeAPI = () => {
  const [groupQuestionType, setGroupQuestionType] = useState<
    IGroupQuestionTypeResponseData[]
  >([]);
  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(`${USER_LOGIN_APIS.QUESTION_TYPE_API.baseURL}`, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IGroupQuestionTypeResponse>) => {
          if (res.data.status === true) {
            setGroupQuestionType(res.data?.data);
          } else {
            setGroupQuestionType([]);
          }
        })
        .catch((e: AxiosError) => {
          setGroupQuestionType([]);
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
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, groupQuestionType };
};
