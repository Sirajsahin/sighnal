import { SighnalAuthAPIS } from "./interface";

const BASE_URL = "https://api.sighnal.com";

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
    baseURL: `${BASE_URL}/question/create-multiple/`,
    params: {},
  },
  QUESTION_TYPE_API: {
    baseURL: `${BASE_URL}/question/types/`,
    params: {},
  },
  SURVEY_LIST: {
    baseURL: `${BASE_URL}/survey/list/`,
    params: {},
  },
  SEND_OTP: {
    baseURL: `${BASE_URL}/org/send-otp/`,
    params: {},
  },
  VERIFY_OTP: {
    baseURL: `${BASE_URL}/org/verify-otp/`,
    params: {},
  },
  DEPARTMENT_LIST: {
    baseURL: `${BASE_URL}/static/department-list/`,
    params: {},
  },
  USER_DETAILS: {
    baseURL: `${BASE_URL}/org/user-details/`,
    params: {},
  },
  ORGANIZATION_DETAILS: {
    baseURL: `${BASE_URL}/org/organisation-details/`,
    params: {},
  },
  JOB_TYPE: {
    baseURL: `${BASE_URL}/org/organisation-details/`,
    params: {},
  },
  INDUSTRY_LIST: {
    baseURL: `${BASE_URL}/org/organisation-details/`,
    params: {},
  },
  UPLOAD_USER_SHEET: {
    baseURL: `${BASE_URL}/group/upload-user-sheet/`,
    params: {},
  },
  USER_LIST_API: {
    baseURL: `${BASE_URL}/customer/list/`,
    params: {},
  },
  SURVEY_LIVE_API: {
    baseURL: `${BASE_URL}/survey/launch/`,
    params: {},
  },
  SURVEY_PREVIEW_API: {
    baseURL: `${BASE_URL}/question/list/`,
    params: {},
  },
  IMAGE_UPLOAD_API: {
    baseURL: `${BASE_URL}/static/upload-file/`,
    params: {},
  },
};
