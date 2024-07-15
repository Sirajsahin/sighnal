// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IOrganizationDetails,
  IOrganizationDetailsResponse,
} from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";

export const useUpdatedOrganizationDetailsAPI = () => {
  // const navigate = useNavigate();

  const execute = useCallback(async (params: IOrganizationDetails) => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .put(USER_LOGIN_APIS.ORGANIZATION_DETAILS.baseURL ?? "", params, {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IOrganizationDetailsResponse>) => {
          if (res.data?.status) {
            toast.success("Organisation details updation done");
          } else {
            toast.error("Organisation details updation faild");
            // navigate("/app/login/onboard");
          }
        })
        .catch((e: AxiosError) => {
          toast.error("Organisation details updation faild");
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
      toast.error("Organisation details updation faild");
      // navigate("/app/login/onboard");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute };
};
