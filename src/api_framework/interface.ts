import { AxiosRequestConfig } from "axios";

export interface IVeticAPI extends AxiosRequestConfig {}

export type SighnalAuthAPIS = {
  [key in
    | "LOGIN_API"
    | "CREATE_USER_API"
    | "USER_ORG_CREATE_API"
    | "COUNTRY_LIST_API"]: IVeticAPI;
};
