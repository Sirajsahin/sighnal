import { RouteProperties } from "@/api_framework/api_modals/routersDefine";
import { useAppSelector } from "@/app_redux/hooks/root_hook";

interface IUseRouteInfoReturn {
  routeState: RouteProperties;
}
const useRouteInfo = (routeId: string): IUseRouteInfoReturn => {
  const routeState: RouteProperties = useAppSelector((state) => {
    if (Object.keys(state.routes.auth).includes(routeId)) {
      return state.routes.auth[routeId];
    } else {
      // return state.routes.public[routeId];
      // return state.routes.public[routeId];
      // return state.routes.public[routeId];
    }
  });

  return { routeState };
};

export default useRouteInfo;
