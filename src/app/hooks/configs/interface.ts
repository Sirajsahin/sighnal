import { IFirebaseAPIConfig } from "@/api_framework/api_modals/FirebaseLogin";

export interface IFirebaseConfig extends IFirebaseAPIConfig {}

export interface IDefaultsDevConfigInterface {
  pageTitle: string;
}

export type ConfigEnvModesType = "development" | "production" | "staging";

export interface IEnvConfigInterface {
  mode: ConfigEnvModesType;
  version: string;
}

export interface ILocalStorageKeyValueInterface {
  key: string;
}

export type ILocalStorageDevConfigInterface = {
  [key in
    | "USER_DETAILS"
    | "ACCESS_TOKEN"
    | "PWL_FILTERS"
    | "CITY"
    | "CLINIC"
    | "CLINIC_NAME"
    | "APP_VERSION"]: ILocalStorageKeyValueInterface;
};

export interface IDevConfigInterface {
  env: IEnvConfigInterface;
  defaults: IDefaultsDevConfigInterface;
  firebase: IFirebaseConfig;
  localStorage: ILocalStorageDevConfigInterface;
}

export interface IDefaultsProdConfigInterface {
  pageTitle: string;
}
export interface IProdConfigInterface {
  env: IEnvConfigInterface;
  defaults: IDefaultsProdConfigInterface;
  firebase: IFirebaseConfig;
  localStorage: ILocalStorageDevConfigInterface;
}

export interface IDefaultsStageConfigInterface {
  pageTitle: string;
}

export interface IStageConfigInterface {
  env: IEnvConfigInterface;
  defaults: IDefaultsStageConfigInterface;
  firebase: IFirebaseConfig;
  localStorage: ILocalStorageDevConfigInterface;
}
