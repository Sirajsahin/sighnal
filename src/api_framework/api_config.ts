import { SighnalAuthAPIS } from "./interface";

const BASE_URL = "https://api.sighnal.in";

export const USER_LOGIN_APIS: SighnalAuthAPIS = {
  LOGIN_API: {
    baseURL: `${BASE_URL}/business/auth/google/signup/`,
    params: {},
  },
  CREATE_USER_API: {
    baseURL: `${BASE_URL}/business/auth/direct/signup/`,
    params: {},
  },
  USER_ORG_CREATE_API: {
    baseURL: `${BASE_URL}/business/profile/create/`,
    params: {},
  },
  COUNTRY_LIST_API: {
    baseURL: `${BASE_URL}/static/country/list/`,
    params: {},
  },
};
