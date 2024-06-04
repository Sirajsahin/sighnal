import { SighnalAuthAPIS } from "./interface";

const BASE_URL = "https://api.sighnal.in/business";

export const USER_LOGIN_APIS: SighnalAuthAPIS = {
  LOGIN_API: {
    baseURL: `${BASE_URL}/auth/google/signup/`,
    params: {},
  },
  CREATE_USER_API: {
    baseURL: `${BASE_URL}/auth/direct/signup/`,
    params: {},
  },
};
