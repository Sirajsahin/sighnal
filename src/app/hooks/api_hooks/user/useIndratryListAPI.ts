// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IIndustryListData,
  IIndustryListResponse,
} from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useIndratryListAPI = () => {
  const [industry, setIndustry] = useState<IIndustryListData[]>([]);
  // const navigate = useNavigate();

  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(USER_LOGIN_APIS.DEPARTMENT_LIST.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IIndustryListResponse>) => {
          if (res.data?.data?.length > 0) {
            setIndustry(res.data?.data);
          } else {
            setIndustry([]);
            // navigate("/app/login/onboard");
          }
        })
        .catch((e: AxiosError) => {
          setIndustry([]);
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
      setIndustry([]);
      // navigate("/app/login/onboard");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, industry };
};
