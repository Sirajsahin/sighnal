// import { ROTA_APIS } from "@/api_framework/api_config";

// import { useAppDispatch } from "@/app_redux/hooks/root_hook";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useCategoryListAPI = () => {
  const [categoryList, setCategoryList] = useState<[]>([]);

  // const dispatch = useAppDispatch();

  const execute = useCallback(async () => {
    // dispatch(
    //   setLoading({
    //     key: "isOrgServicesInProgress",
    //     status: true,
    //   })
    // );
    try {
      //   const accessToken = localStorage.getItem(configuration.localStorage.ACCESS_TOKEN.key);
      const accessToken = "";
      await axios
        .get(
          "https://static.vetic.in/api/website/membership-sales-dashboard/",
          {
            params: {},
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((res: AxiosResponse<any>) => {
          if (res.data.status === true) {
            setCategoryList(res.data.data);
            // dispatch(setCategory({ data:  }));
          } else {
            //
            setCategoryList([]);
          }
        })
        .catch((e: AxiosError) => {
          if (e.code === "ERR_BAD_REQUEST") {
            toast.error("Error while fetching org services");
          }
          if (e.status === 400) {
            toast("Services records not found");
          }
          if (e.response.status === 500) {
            toast.error("Server error 500");
          }
        });
    } catch (e: any) {
      toast.error("Server Error: " + e.message);
    }
  }, []);
  return { execute, categoryList };
};
