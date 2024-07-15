// import { ROTA_APIS } from "@/api_framework/api_config";
import { USER_LOGIN_APIS } from "@/api_framework/api_config";
import {
  IOrganizationDetails,
  IOrganizationDetailsResponse,
} from "@/api_framework/api_modals/user";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useOrganizationDetailsAPI = () => {
  const [organization, setOrganization] = useState<IOrganizationDetails>(null);
  // const navigate = useNavigate();

  const execute = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("AuthToken");
      await axios
        .get(USER_LOGIN_APIS.ORGANIZATION_DETAILS.baseURL ?? "", {
          headers: {
            Authorization: `${accessToken}`,
          },
        })
        .then((res: AxiosResponse<IOrganizationDetailsResponse>) => {
          if (res.data?.status) {
            setOrganization(res.data?.data);
          } else {
            setOrganization(null);
            // navigate("/app/login/onboard");
          }
        })
        .catch((e: AxiosError) => {
          setOrganization(null);
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
      setOrganization(null);
      // navigate("/app/login/onboard");
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, organization };
};
