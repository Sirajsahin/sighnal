import { SighnalAuthAPIS } from "./interface";

const BASE_URL = "https://api.sighnal.in";

export const USER_LOGIN_APIS: SighnalAuthAPIS = {
  LOGIN_API: {
    baseURL: `${BASE_URL}/org/google/signup/`,
    params: {},
  },
  SELECT_ORG_API: {
    baseURL: `${BASE_URL}/org/select-organisation/`,
    params: {},
  },
  CREATE_USER_API: {
    baseURL: `${BASE_URL}/org/direct-signup/`,
    params: {},
  },
  USER_ORG_LIST_API: {
    baseURL: `${BASE_URL}/business/profile/create/`,
    params: {},
  },
  USER_ORG_CREATE_API: {
    baseURL: `${BASE_URL}/org/onboard/`,
    params: {},
  },
  COUNTRY_LIST_API: {
    baseURL: `${BASE_URL}/static/country-list/`,
    params: {},
  },
  ORG_LIST_API: {
    baseURL: `${BASE_URL}/static/user-org-list/`,
    params: {},
  },
  GROUP_CREATE_API: {
    baseURL: `${BASE_URL}/group/`,
    params: {},
  },
  GROUP_DETAILS_API: {
    baseURL: `${BASE_URL}/group/`,
    params: {},
  },
  GROUP_LIST_API: {
    baseURL: `${BASE_URL}/group/list/`,
    params: {},
  },
  GROUP_STATS_API: {
    baseURL: `${BASE_URL}/survey/stats/`,
    params: {},
  },
  SURVEY_CREATE_API: {
    baseURL: `${BASE_URL}/survey/`,
    params: {},
  },
  QUESTION_CREATE_API: {
    baseURL: `${BASE_URL}/business/question/create-list/`,
    params: {},
  },
  QUESTION_TYPE_API: {
    baseURL: `${BASE_URL}/business/question/types/`,
    params: {},
  },
};
