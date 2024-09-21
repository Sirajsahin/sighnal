// Router to define strict types and interfaces for the routes

import { IRoutesDefined } from "../../api_framework/api_modals/routersDefine";

export const ROUTES_MAPPINGS = {
  "/": "LANDING_PAGE",
  "/app": "ROOT",
  "/app/login": "LOGIN",
  "/app/login/sign-in": "LOGIN_PAGE",
  "/app/login/onboard": "ONBOARD_PAGE",
  "/app/login/organization": "ORGANIZATION",
  "/app/org-details": "ORGANAIZATION_DETAILS",
  "/app/home": "HOME_PAGE",
  "/app/campaign/live": "LIVE_PAGE",
  "/app/user-profile": "USER_PROFILE",
  "/app/thankyou": "THANKYOU",
  "/app/campaign": "CAMPAIGN",
  "/app/campaign/campaign-list": "CAMPAIGN_PAGE",
  "/app/campaign/create-survey": "CREATE_SURVEY",
  "/app/campaign/survey-preview": "SURVEY_PREVIEW",
};

export const LOGINSUBNAVIGATION: IRoutesDefined = {
  ONBOARD_PAGE: {
    id: "ONBOARD_PAGE",
    icon: "HiOutlineHome",
    title: "Vetic VMS Product",
    description: "Vetic VMS Product",
    url: "/app/login/onboard",
    path: "onboard",
    children: {},
  },
  ORGANIZATION: {
    id: "ORGANIZATION",
    icon: "HiOutlineHome",
    title: "Vetic VMS Product",
    description: "Vetic VMS Product",
    url: "/app/login/organization",
    path: "organization",
    children: {},
  },
  LOGIN_PAGE: {
    id: "LOGIN_PAGE",
    title: "Vetic VMS Login",
    icon: "HiOutlineHome",
    description: "Vetic VMS Login Page",
    url: "/app/login/sign-in",
    path: "sign-in",
    children: {},
  },
};
export const CAMPAIGNPAGESUBROUTE: IRoutesDefined = {
  CAMPAIGN_PAGE: {
    id: "CAMPAIGN_PAGE",
    title: "campaign",
    icon: "MdOutlineDashboard",
    url: "/app/campaign/campaign-list",
    path: "campaign-list",
    children: {},
  },
  CREATE_SURVEY: {
    id: "CREATE_SURVEY",
    title: "Create Survey",
    icon: "HiOutlineHome",
    url: "/app/campaign/create-survey",
    path: "create-survey",
    children: {},
  },
  SURVEY_PREVIEW: {
    id: "SURVEY_PREVIEW",
    title: "Preview Survey",
    icon: "HiOutlineHome",
    url: "/app/campaign/survey-preview",
    path: "survey-preview",
    children: {},
  },
  LIVE_PAGE: {
    id: "LIVE_PAGE",
    title: "Campaign",
    icon: "MdOutlineDashboard",
    url: "/app/campaign/live",
    path: "live",
    children: {},
  },
};
export const NAVIGATION_ROUTES: IRoutesDefined = {
  INVALID_ACCESS: {
    id: "INVALID_ACCESS",
    title: "Invalid Access",
    icon: "HiOutlineHome",
    url: "/app/invalid-access",
    path: "invalid-access",
    children: {},
  },
  INVALID_LOGIN: {
    id: "INVALID_LOGIN",
    title: "Invalid Login",
    icon: "HiOutlineHome",
    url: "/app/invalid-login",
    path: "invalid-login",
    children: {},
  },
  ORGANAIZATION_DETAILS: {
    id: "ORGANAIZATION_DETAILS",
    title: "Invalid Login",
    icon: "HiOutlineHome",
    url: "/app/org-details",
    path: "org-details",
    children: {},
  },
  HOME_PAGE: {
    id: "HOME_PAGE",
    title: "homepage",
    icon: "MdOutlineDashboard",
    url: "/app/home",
    path: "home",
    children: {},
  },

  USER_PROFILE: {
    id: "USER_PROFILE",
    title: "homepage",
    icon: "MdOutlineDashboard",
    url: "/app/user-profile",
    path: "user-profile",
    children: {},
  },
  THANKYOU: {
    id: "THANKYOU",
    title: "thankyou",
    icon: "MdOutlineDashboard",
    url: "/app/thankyou",
    path: "thankyou",
    children: {},
  },
  CAMPAIGN: {
    id: "CAMPAIGN",
    title: "Inventory",
    icon: "HiOutlineUserCircle",
    url: "/app/campaign",
    path: "campaign",
    children: {
      ...CAMPAIGNPAGESUBROUTE,
    },
  },
};

export const ROUTES: IRoutesDefined = {
  LANDING_PAGE: {
    id: "LANDING_PAGE",
    icon: "HiOutlineHome",
    title: "Vetic VMS Product",
    description: "Vetic VMS Product",
    url: "/",
    path: "/",
    children: {},
  },

  ROOT: {
    id: "ROOT",
    icon: "HiOutlineHome",
    title: "Vetic VMS",
    description: "Vetic VMS Description about the application",
    url: "/app",
    path: "/app", // path is basically path to the children in the nested routes
    children: {
      ...NAVIGATION_ROUTES, // rendering navigation routes inside main /app route
    },
  },
  LOGIN: {
    id: "LOGIN",
    title: "Vetic VMS Login",
    icon: "HiOutlineHome",
    description: "Vetic VMS Login Page",
    url: "/app/login",
    path: "login",
    children: {
      ...LOGINSUBNAVIGATION,
    },
  },
};
