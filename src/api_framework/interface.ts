import { AxiosRequestConfig } from "axios";

export interface ISighnalAPI extends AxiosRequestConfig {}

export type SighnalAuthAPIS = {
  [key in
    | "LOGIN_API"
    | "CREATE_USER_API"
    | "USER_ORG_CREATE_API"
    | "COUNTRY_LIST_API"
    | "GROUP_CREATE_API"
    | "GROUP_DETAILS_API"
    | "GROUP_LIST_API"
    | "GROUP_STATS_API"
    | "SURVEY_CREATE_API"
    | "QUESTION_CREATE_API"]: ISighnalAPI;
};
