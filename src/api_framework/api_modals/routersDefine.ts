export interface RouteProperties {
  isAuthRequire: boolean;
  title: string;
  url: string;
  description?: string;
  state: any;
}
export interface IRoutes {
  [key: string]: RouteProperties;
}

export interface IRouteChildren {
  [key: string]: IRouteDefined;
}

export interface IRouteDefined {
  url: string;
  icon?: string;
  title: string;
  id: string;
  description?: string;
  path: string;
  children: IRouteChildren;
}

export interface IRoutesDefined {
  [key: string]: IRouteDefined;
}

// Route Keys to use only specified routes in the application without writing long routes in the application while using it.
export type RouteKeys =
  | "LANDING_PAGE"
  | "ROOT"
  | "LOGIN"
  | "LOGIN_PAGE"
  | "ORGANAIZATION_DETAILS"
  | "ORGANIZATION"
  | "HOME_PAGE"
  | "LIVE_PAGE"
  | "CAMPAIGN"
  | "ONBOARD_PAGE"
  | "CAMPAIGN_PAGE"
  | "CREATE_SURVEY"
  | "THANKYOU"
  | "USER_PROFILE"
  | "SURVEY_PREVIEW";

export type RouterRoutes = {
  [key in RouteKeys]: IRouteDefined;
};
