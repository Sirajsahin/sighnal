import { SighnalAuthAPIS } from "./interface";

const BASE_URL = "https://api.sighnal.in";

export const USER_LOGIN_APIS: SighnalAuthAPIS = {
  LOGIN_API: {
    baseURL: `${BASE_URL}org/google/signup/`,
    params: {},
  },
  CREATE_USER_API: {
    baseURL: `${BASE_URL}/business/auth/direct/signup/`,
    params: {},
  },
  USER_ORG_LIST_API: {
    baseURL: `${BASE_URL}/business/profile/create/`,
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
  GROUP_CREATE_API: {
    baseURL: `${BASE_URL}/business/group/create/`,
    params: {},
  },
  GROUP_DETAILS_API: {
    baseURL: `${BASE_URL}/business/group/details/`,
    params: {},
  },
  GROUP_LIST_API: {
    baseURL: `${BASE_URL}/business/group/list/`,
    params: {},
  },
  GROUP_STATS_API: {
    baseURL: `${BASE_URL}/business/survey/stats/`,
    params: {},
  },
  SURVEY_CREATE_API: {
    baseURL: `${BASE_URL}/business/survey/create/`,
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
