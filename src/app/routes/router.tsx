import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import App from "../../App";

import CampaignSurveyPageIndex from "@/components/rendarChildren/CampaignSurveyPageIndex";
import LoginLayoutPage from "@/components/rendarChildren/LoginLayoutPage";
import CreateFeedbackGroupComponent from "@/components/routes/auth_routes/CreateFeedbackGroupComponent";
import CreateSurveyStepComponent from "@/components/routes/auth_routes/CreateSurveyStepComponent";
import FeedbackCampaignSurveyComponent from "@/components/routes/auth_routes/FeedbackCampaignSurveyComponent";
import QuestionPreviewComponent from "@/components/routes/auth_routes/QuestionPreviewComponent";
import ThankyouPage from "@/components/routes/auth_routes/ThankyouPage";
import Login from "@/components/shared/Login";
import Organaization from "@/components/shared/Organaization";
import OrganaizationListComponent from "@/components/shared/OrganaizationListComponent";
import UserProfile from "@/components/shared/UserProfile";
import { useRouter } from "../hooks/useRouter";
import LiveCampaignPageComponent from "@/components/routes/auth_routes/LiveCampaignPageComponent";

export interface IRouterProps {}

const Router: React.FC<IRouterProps> = () => {
  const { getRouteKey } = useRouter();

  const redirectIfNotAuthenticated = () => {
    const accessToken = localStorage?.getItem("AuthToken");

    if (accessToken) {
      return true;
    } else {
      return redirect(getRouteKey("LOGIN_PAGE", "url"));
    }
  };

  const redirectIfLoggedIn = () => {
    const accessToken = localStorage?.getItem("AuthToken");

    if (accessToken) {
      return true;
    } else {
      return false;
    }
  };

  const router = createBrowserRouter([
    {
      path: getRouteKey("LANDING_PAGE", "url"),
      element: <Login />,
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
          path: getRouteKey("USER_PROFILE", "path"),
          element: <UserProfile />,
        },
        {
          path: getRouteKey("THANKYOU", "path"),
          element: <ThankyouPage />,
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
            {
              path: getRouteKey("SURVEY_PREVIEW", "path"),
              element: <QuestionPreviewComponent />,
            },
            {
              path: getRouteKey("LIVE_PAGE", "path"),
              element: <LiveCampaignPageComponent />,
            },
          ],
        },
      ],
    },
    {
      path: getRouteKey("LOGIN", "url"),
      loader: redirectIfLoggedIn,
      element: <LoginLayoutPage />,
      children: [
        {
          path: getRouteKey("LOGIN_PAGE", "url"),
          loader: redirectIfLoggedIn,
          element: <Login />,
        },
        {
          path: getRouteKey("ONBOARD_PAGE", "path"),
          element: <Organaization />,
        },
        {
          path: getRouteKey("ORGANIZATION", "path"),
          element: <OrganaizationListComponent />,
        },
      ],
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
