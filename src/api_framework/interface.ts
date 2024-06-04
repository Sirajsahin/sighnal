import { AxiosRequestConfig } from "axios";

export interface IVeticAPI extends AxiosRequestConfig {}

export type SighnalAuthAPIS = {
  [key in "LOGIN_API" | "CREATE_USER_API"]: IVeticAPI;
};
