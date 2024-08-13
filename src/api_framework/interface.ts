import { AxiosRequestConfig } from "axios";

export interface ISighnalAPI extends AxiosRequestConfig {}

export type SighnalAuthAPIS = {
  [key in
    | "LOGIN_API"
    | "CREATE_USER_API"
    | "USER_ORG_LIST_API"
    | "USER_ORG_CREATE_API"
    | "COUNTRY_LIST_API"
    | "ORG_LIST_API"
    | "GROUP_CREATE_API"
    | "GROUP_DETAILS_API"
    | "GROUP_LIST_API"
    | "SELECT_ORG_API"
    | "SURVEY_LIST"
    | "GROUP_STATS_API"
    | "SURVEY_CREATE_API"
    | "QUESTION_CREATE_API"
    | "SEND_OTP"
    | "VERIFY_OTP"
    | "DEPARTMENT_LIST"
    | "USER_DETAILS"
    | "ORGANIZATION_DETAILS"
    | "INDUSTRY_LIST"
    | "JOB_TYPE"
    | "UPLOAD_USER_SHEET"
    | "USER_LIST_API"
    | "SURVEY_LIVE_API"
    | "SURVEY_PREVIEW_API"
    | "IMAGE_UPLOAD_API"
    | "QUESTION_TYPE_API"]: ISighnalAPI;
};
