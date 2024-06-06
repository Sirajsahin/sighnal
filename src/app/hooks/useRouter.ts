import {
  IRouteChildren,
  IRouteDefined,
  IRoutesDefined,
  RouteKeys,
} from "../../api_framework/api_modals/routersDefine";
import {
  CAMPAIGNPAGESUBROUTE,
  LOGINSUBNAVIGATION,
  NAVIGATION_ROUTES,
  ROUTES,
} from "../routes/routes";

export const useRouter = () => {
  const expandedSearch = (
    router: IRoutesDefined,
    route: RouteKeys
  ): IRouteDefined | null => {
    const routeDetails: string | undefined = Object.keys(router).find(
      (r) => r === route
    );
    if (routeDetails) {
      return router[route];
    } else {
      return null;
    }
  };

  // private method
  const fetchRouteDetails = (route: RouteKeys): IRouteDefined => {
    const result =
      expandedSearch(ROUTES, route) ??
      expandedSearch(NAVIGATION_ROUTES, route) ??
      expandedSearch(CAMPAIGNPAGESUBROUTE, route) ??
      expandedSearch(LOGINSUBNAVIGATION, route) ??
      null;

    if (!result) {
      throw new Error(`Route ${route} not found`);
    }

    return result;
  };

  const getRouteDetails = (route: RouteKeys): IRouteDefined => {
    return fetchRouteDetails(route);
  };

  const getRouteKey = (route: RouteKeys, key: keyof IRouteDefined): string => {
    if (key === "children") {
      throw new Error(
        "Please use getRouteChildrens(route) method to get children"
      );
    }
    const details = fetchRouteDetails(route);
    return details[key] as string; // Ensure key is not 'children' and cast to string
  };

  const getRouteChildrens = (route: RouteKeys): IRouteChildren => {
    const details = fetchRouteDetails(route);
    return details.children;
  };

  return { getRouteDetails, getRouteKey, getRouteChildrens };
};
