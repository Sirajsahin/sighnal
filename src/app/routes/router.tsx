import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "../../App";

import { useRouter } from "../hooks/useRouter";
import Products from "@/components/Products";
import CreateFeedbackGroupComponent from "@/components/routes/auth_routes/CreateFeedbackGroupComponent";
import FeedbackCampaignSurveyComponent from "@/components/routes/auth_routes/FeedbackCampaignSurveyComponent";
import CreateSurveyStepComponent from "@/components/routes/auth_routes/CreateSurveyStepComponent";
import CampaignSurveyPageIndex from "@/components/rendarChildren/CampaignSurveyPageIndex";

export interface IRouterProps {}

const Router: React.FC<IRouterProps> = () => {
  const { getRouteKey } = useRouter();

  const redirectIfNotAuthenticated = () => {
    // const accessToken = localStorage?.getItem(configuration?.localStorage?.ACCESS_TOKEN?.key)
    const accessToken = true;

    if (accessToken) {
      return true;
    } else {
      return redirect(getRouteKey("LOGIN_PAGE", "url"));
    }
  };

  const redirectIfLoggedIn = () => {
    const accessToken = "";

    if (accessToken) {
      // return redirect(getRouteKey('SEARCH_CUSTOMER', 'url'))
      return false;
    } else {
      return false;
    }
  };

  const router = createBrowserRouter([
    {
      path: getRouteKey("LANDING_PAGE", "url"),
      element: <Products />,
      loader: () => {
        return redirect(getRouteKey("LOGIN_PAGE", "url"));
      },
    },
    {
      path: getRouteKey("ROOT", "url"),
      element: <App />,
      loader: redirectIfNotAuthenticated,
      children: [
        {
          path: getRouteKey("HOME_PAGE", "path"),
          element: <CreateFeedbackGroupComponent />,
        },

        {
          path: getRouteKey("CAMPAIGN", "path"),
          element: <CampaignSurveyPageIndex />,
          children: [
            {
              path: getRouteKey("CAMPAIGN_PAGE", "path"),
              element: <FeedbackCampaignSurveyComponent />,
            },
            {
              path: getRouteKey("CREATE_SURVEY", "path"),
              element: <CreateSurveyStepComponent />,
            },
          ],
        },
      ],
    },
    {
      path: getRouteKey("LOGIN_PAGE", "url"),
      loader: redirectIfLoggedIn,
      element: <Products />,
    },
  ]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
